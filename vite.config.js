import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { handleChat } from './netlify/functions/_shared/chat-core.js'

/**
 * Yerel geliştirmede /api/chat endpoint'ini Vite sunucusunda çalıştırır.
 * Böylece "npm run dev" ile chatbot Netlify deploy etmeden de test edilebilir.
 * Üretimde aynı endpoint Netlify Functions tarafından karşılanır.
 */
const netlifyFunctionsDevProxy = (apiKey) => ({
  name: 'netlify-functions-dev-proxy',
  configureServer(server) {
    server.middlewares.use('/api/chat', async (req, res) => {
      if (req.method !== 'POST') {
        res.statusCode = 405
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ error: 'Method Not Allowed' }))
        return
      }

      let body = ''
      req.on('data', (chunk) => {
        body += chunk
      })

      req.on('end', async () => {
        try {
          const { messages, language } = JSON.parse(body || '{}')

          if (!messages || !Array.isArray(messages) || messages.length === 0) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Mesaj geçmişi boş olamaz' }))
            return
          }

          const result = await handleChat({
            messages,
            language,
            apiKey,
          })

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(result))
        } catch (error) {
          console.error('[dev:api/chat] Hata:', error?.message || error)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              error: 'Bir şeyler ters gitti, tekrar dene.',
              detail: error?.message || String(error),
            })
          )
        }
      })
    })
  },
})

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // .env dosyasındaki GROQ_API_KEY'ı yerel dev sunucusu için okuyoruz
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), netlifyFunctionsDevProxy(env.GROQ_API_KEY)],
  }
})
