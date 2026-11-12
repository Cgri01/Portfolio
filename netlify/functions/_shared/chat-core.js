import { OpenAI } from 'openai';

/**
 * Chatbot ortak çekirdeği
 * Hem Netlify Functions (üretim) hem de Vite dev sunucusu (yerel) bu modülü kullanır.
 */

/* ------------------------------------------------------------------
 * TÜRKÇE SİSTEM PROMPT'U
 * ------------------------------------------------------------------ */
export const SYSTEM_CONTEXT_TR = `
Sen Çağrı Alagöz'ün portfolyo sitesindeki bir AI asistansın.
Ziyaretçilerin Çağrı hakkında sorduğu soruları, aşağıdaki bilgilere dayanarak cevapla.
Sadece bu bilgilerle ilgili sorulara cevap ver, bilmediğin bir şey sorulursa
"Bu konuda kesin bilgim yok, Çağrı ile direkt iletişime geçebilirsiniz" de ve iletişim bilgilerini ver
veya portfolyo sitesinin en alt kısmı olan İletişim kısmından Çağrı'ya mail atabilecekleri bilgisini ver.

Sadece Türkçe konuş. Çok uzun olmayan, samimi ve yardımsever cevaplar ver.

Hakkında bilgiler:
- İsim: Çağrı Alagöz
- Ünvan: Yazılım Mühendisi
- Okul: Yakın Doğu Üniversitesi, 2021'de başlayıp 2026'da mezun oldu.
- Bölüm: Yazılım Mühendisliği
- Şehir: Adana / Lefkoşa
- Teknolojiler: React, JavaScript, TailwindCSS, Angular, Python, C#
- Bildiği diller: Türkçe ana dil, İngilizce akıcı konuşma ve anlama.
- İlgi alanları: Web Geliştirme, UI/UX Tasarım, Arduino, Yapay Zeka, IT, Spor
- Deneyimler:
    Net Bilişim ve Yazılım Hizmetlerindeki stajında, C# ve Angular kullanarak full-stack web uygulamaları geliştirdi.
    Adana Organize Sanayi Bölgesi'nde, IT stajı yaparak, sistem yönetimi ve ağ güvenliği konularında deneyim kazandı.
- İletişim: cgriag@gmail.com
- İkinci e-posta: cgriag01@gmail.com
- Telefon numarası: +90 541 732 5925
- Askerlik durumu: Tecilli 2030'un aralık ayına kadar tecili var.
`;

/* ------------------------------------------------------------------
 * İNGİLİZCE SİSTEM PROMPT'U
 * Aynı bilgilerin profesyonel İngilizce karşılığı
 * ------------------------------------------------------------------ */
export const SYSTEM_CONTEXT_EN = `
You are the AI assistant on Çağrı Alagöz's portfolio website.
Answer visitors' questions about Çağrı based only on the information below.
If you are asked something you do not know, say
"I don't have definitive information about that. You can contact Çağrı directly" and provide the contact details,
or point them to the Contact section at the bottom of the portfolio website where they can email Çağrı.

Reply only in English. Keep your answers concise, friendly and helpful.

Information about him:
- Name: Çağrı Alagöz
- Title: Software Engineer
- University: Near East University, started in 2021 and graduated in 2026.
- Department: Software Engineering
- City: Adana / Nicosia (Lefkoşa)
- Technologies: React, JavaScript, TailwindCSS, Angular, Python, C#
- Languages: Native Turkish, fluent spoken and written English.
- Areas of interest: Web Development, UI/UX Design, Arduino, Artificial Intelligence, IT, Sports
- Experiences:
    During his internship at Net Bilişim ve Yazılım Hizmetleri, he developed full-stack web applications using C# and Angular.
    During his IT internship in the Adana Organized Industrial Zone, he gained experience in system administration and network security.
- Contact: cgriag@gmail.com
- Second e-mail: cgriag01@gmail.com
- Phone number: +90 541 732 5925
- Military service status: Exempt until December 2030.
`;

/* ------------------------------------------------------------------
 * MODEL YAPILANDIRMASI
 * Groq'da llama-3.3-70b-versatile kaldırıldığı için güncel modeller kullanılıyor.
 * Birincil model çalışmazsa yedek modele düşülür.
 * ------------------------------------------------------------------ */
export const MODELS = [
  "qwen/qwen3.8-27b",
  "openai/gpt-oss-20b",
  "openai/gpt-oss-120b",
];

export const GROQ_BASE_URL = "https://api.groq.com/openai/v1";

/**
 * Kullanıcının mesaj dilini tahmin eder.
 * Öncelik: frontend'in gönderdiği dil tercihi.
 * Yedek: son kullanıcı mesajındaki Türkçe karakter analizi.
 */
export const detectLanguage = (messages, preferred) => {
  if (preferred === "tr" || preferred === "en") return preferred;

  const lastUserMessage = [...(messages || [])]
    .reverse()
    .find((message) => message?.role === "user");

  const text = lastUserMessage?.content || "";
  if (!text) return "tr";

  const turkishCharacters = /[çğıöşüÇĞİÖŞÜ]/g;
  const turkishMatches = text.match(turkishCharacters)?.length || 0;

  const englishMarkers = /\b(what|who|where|when|how|why|is|are|the|and|about|tell|me|do|you|can|projects|skills|contact)\b/gi;
  const englishMatches = text.match(englishMarkers)?.length || 0;

  if (turkishMatches > 0) return "tr";
  if (englishMatches >= 2) return "en";

  return "tr";
};

export const buildSystemPrompt = (language) =>
  language === "en" ? SYSTEM_CONTEXT_EN : SYSTEM_CONTEXT_TR;

/**
 * Chat mesajlarını işler ve model yanıtını döndürür.
 */
export const handleChat = async ({ messages, language, apiKey }) => {
  if (!apiKey) {
    throw new Error(
      "GROQ_API_KEY bulunamadı. .env dosyasına GROQ_API_KEY ekleyin veya Netlify'de environment variable tanımlayın."
    );
  }

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    throw new Error("Mesaj geçmişi boş olamaz");
  }

  // Güvenlik: çok uzun geçmişleri kırp (son 10 mesaj yeterli, token israfını önler)
  const recentMessages = messages.slice(-10);
  const resolvedLanguage = detectLanguage(recentMessages, language);

  const groq = new OpenAI({ apiKey, baseURL: GROQ_BASE_URL });

  let lastError = null;

  for (const model of MODELS) {
    try {
      const completion = await groq.chat.completions.create({
        model,
        messages: [
          { role: "system", content: buildSystemPrompt(resolvedLanguage) },
          ...recentMessages,
        ],
        max_tokens: 800,
        temperature: 0.6,
      });

      const message = completion.choices?.[0]?.message;
      const reply = message?.content?.trim();

      if (reply) {
        return { reply, language: resolvedLanguage, model };
      }

      // Reasoning modelleri içerik boş dönebilir, sonraki modele geç
      lastError = new Error(`"${model}" modeli boş yanıt döndürdü`);
    } catch (error) {
      lastError = error;
      console.error(`Groq "${model}" hatası:`, error?.message || error);
    }
  }

  throw lastError || new Error("Model yanıt üretemedi");
};
