import { OpenAI } from 'openai';


// HAKKIMDA BILGILER
const SYSTEM_CONTEXT = `
Sen Çağrı Alagöz'ün portfolyo sitesindeki bir AI asistansın. 
Ziyaretçilerin Çağrı hakkında sorduğu soruları, aşağıdaki bilgilere dayanarak cevapla.
Sadece bu bilgilerle ilgili sorulara cevap ver, bilmediğin bir şey sorulursa 
"Bu konuda kesin bilgim yok, Çağrı ile direkt iletişime geçebilirsiniz" de ve iletişim bilgilerini ver veya portfolyo sitesinin en alt kısmı olan Iletişim kısmından Çağrı'ya mail atabilecekleri bilgisini ver.
Kullanıcı İngilizce yazarsa cevabı da İngilizce ver; Türkçe yazarsa Türkçe ver.
Yanıtların kısa, samimi ve yardımsever olsun.

Hakkında bilgiler:
- İsim: Çağrı Alagöz
- Ünvan: Yazılım Mühendisi
- Okul: Yakın Doğu Üniversitesi, 2021'de başlayıp 2026'da mezun oldu.
- Bölüm: Yazılım Mühendisi
- Şehir: Adana / Lefkoşa
- Teknolojiler: React, JavaScript, TailwindCSS, Angular, Python, C#
- Bildiği diller: Türkçe anadili , İngilizce akıcı konuşma ve anlama.
- İlgi alanları: Web Geliştirme, UI/UX Tasarım, Arduino, Yapay Zeka, IT, Spor
- Deneyimler:
    Net Bilişim ve Yazılım Hizmetlerindeki stajında, C# ve Angular kullanarak fullstack web uygulamaları geliştirdi.
    Adana Organize Sanayi Bölgesi'nde, IT stajı yaparak, sistem yönetimi ve ağ güvenliği konularında deneyim kazandı.  
- İletişim: cgriag@gmail.com
- Telefon numarası: +90 541 732 5925
- Askerlik durumu: Tecilli 2030'un aralık ayına kadar tecili var.

The same information in English:
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
- Phone number: +90 541 732 5925
- Military service status: Exempt until December 2030.

Çok uzun olmayan, samimi ve yardımsever cevaplar ver. Sadece Türkçe konuş, yabancı kelime kullanma.
`;
export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { messages } = JSON.parse(event.body);

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Mesaj geçmişi boş olamaz' })
      };
    }

    // Güvenlik: çok uzun geçmişleri kırp (son 10 mesaj yeterli, token israfını önler)
    const recentMessages = messages.slice(-10);

    const groq = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: 'https://api.groq.com/openai/v1'
    });

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_CONTEXT },
        ...recentMessages
      ]
    });

    const reply = completion.choices[0].message.content;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply })
    };
  } catch (error) {
    console.error('Groq hatası:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Bir şeyler ters gitti, tekrar dene.' })
    };
  }
};
