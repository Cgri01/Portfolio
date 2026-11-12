import { handleChat } from "./_shared/chat-core.js";

/**
 * Netlify, deploy sırasında .env dosyasındaki değişkenleri otomatik olarak
 * process.env içine enjekte eder. Yerel testte (netlify dev / node) process.env
 * boş kalabildiği için .env dosyasını manuel yüklüyoruz.
 */
const loadLocalEnv = () => {
  if (process.env.GROQ_API_KEY) return;

  try {
    if (typeof process.loadEnvFile === "function") {
      process.loadEnvFile();
    }
  } catch (error) {
    console.warn(".env yüklenemedi:", error?.message || error);
  }
};

/**
 * Netlify Functions — /api/chat
 * Üretim ortamında (netlify deploy) bu endpoint çalışır.
 */
export const handler = async (event) => {
  loadLocalEnv();

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { messages, language } = JSON.parse(event.body);

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Mesaj geçmişi boş olamaz" }),
      };
    }

    const { reply, language: usedLanguage, model } = await handleChat({
      messages,
      language,
      apiKey: process.env.GROQ_API_KEY,
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply, language: usedLanguage, model }),
    };
  } catch (error) {
    console.error("Chat hatası:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Bir şeyler ters gitti, tekrar dene.",
        detail: error?.message || String(error),
      }),
    };
  }
};
