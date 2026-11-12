# Portfolio — Çağrı Alagöz

React + Vite + TailwindCSS ile hazırlanmış, Türkçe / İngilizce dil desteği olan kişisel portfolyo sitesi.
Chatbot, Groq API üzerinden `llama` tabanlı modellerle çalışır ve Netlify Functions üzerinden sunulur.

## Kurulum

```bash
npm install
```

## `.env` dosyası

Proje kök dizininde `.env` dosyası oluşturulmalıdır (bu dosya `.gitignore` içindedir, repoya yüklenmez):

```env
GROQ_API_KEY = gsk_xxxxxxxxxxxxxxxxxxxxxxxx
```

`.env` yoksa chatbot "Bağlantı hatası" mesajı verir.

## Komutlar

| Komut | Açıklama |
|---|---|
| `npm run dev` | Yerel geliştirme sunucusu → http://localhost:5173 |
| `npm run build` | Production build → `dist/` |
| `npm run lint` | ESLint kontrolü |
| `npm run preview` | Production build önizleme |

## Chatbot / API

`/api/chat` endpoint'i iki ortamda çalışır:

- **Yerel (`npm run dev`)**: `vite.config.js` içindeki `netlify-functions-dev-proxy` plugin'i dev sunucusunda aynı handler'ı çalıştırır ve `.env` dosyasındaki anahtarı okur. Ekstra kurulum gerekmez.
- **Üretim (Netlify)**: `netlify/functions/chat.js` tarafından karşılanır. `netlify.toml` içindeki redirect `/api/*` → `/.netlify/functions/:splat` eşleşmesini yapar.

> **Netlify deploy için:** `.env` dosyası repoya yüklenmediği için `GROQ_API_KEY` değişkenini Netlify panelinden
> **Site settings → Environment variables → Add variable** bölümünden tanımlamanız gerekir.

### Model yapılandırması

`netlify/functions/_shared/chat-core.js` içinde tanımlıdır:

```js
export const MODELS = [
  'qwen/qwen3.8-27b',        // birincil
  'openai/gpt-oss-20b',      // yedek
  'openai/gpt-oss-120b',     // yedek
];
```

Birincil model hata verirse sıradakine otomatik geçilir.

> Not: `llama-3.3-70b-versatile` modeli Groq tarafından kaldırıldığı için artık kullanılamaz durumdadır.

### Dil davranışı

- Frontend, seçili dili (`language: 'tr' | 'en'`) istek gövdesiyle gönderir.
- Backend, dil belirtilmemişse son kullanıcı mesajındaki Türkçe karakter / İngilizce anahtar kelime analiziyle dili algılar.
- Her dil için ayrı sistem prompt'u tanımlıdır: `SYSTEM_CONTEXT_TR` ve `SYSTEM_CONTEXT_EN`.

## Dil değiştirme (TR / EN)

Sağ üst köşedeki TR / EN butonu tüm site metinlerini anında değiştirir.
Tercih `localStorage` içinde saklanır ve sayfa yenilendiğinde korunur.

```
src/i18n/
├── translations.js      # TR + EN tüm metinler
├── language-context.js  # React context
├── LanguageProvider.jsx # Provider bileşeni
└── useLanguage.js       # Hook
```

## Netlify deploy

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

`netlify.toml` build komutunu, publish dizinini ve functions dizinini zaten tanımlar.
