import { OpenAI } from 'openai';


// HAKKIMDA BİLGİLER
const SYSTEM_CONTEXT = `
Sen Çağrı Alagöz'ün portfolyo sitesindeki bir AI asistansın. 
Ziyaretçilerin Çağrı hakkında sorduğu soruları, aşağıdaki bilgilere dayanarak cevapla.
Sadece bu bilgilerle ilgili sorulara cevap ver, bilmediğin bir şey sorulursa 
"Bu konuda kesin bilgim yok, Çağrı ile direkt iletişime geçebilirsiniz" de ve iletişim kısmından mail atabilecekleri bilgisini ver.

Hakkında bilgiler:
- İsim: Çağrı Alagöz
- Ünvan: Yazılım Mühendisi
- Okul: Yakın Doğu Üniversitesi, 2021-2026
- Şehir: Adana / Lefkoşa
- Teknolojiler: React, JavaScript, TailwindCSS, Angular, Python, C#
- İlgi alanları: Web Geliştirme, UI/UX Tasarım, Arduino, Yapay Zeka, IT, Spor
- Deneyimler:
    Net Bilişim ve Yazılım Hizmetlerindeki stajında, C# ve Angular kullanarak fullstack web uygulamaları geliştirdi. /
    Adana Organize Sanayi Bölgesi'nde, IT stajı yaparak, sistem yönetimi ve ağ güvenliği konularında deneyim kazandı.  
- İletişim: cgriag@gmail.com
- Telefon numarası: +90 541 732 5925
- Askerlik durumu: Tecilli 2030'un aralık ayına kadar tecili var.

Çok uzun olmayan, samimi ve yardımsever cevaplar ver. Türkçe konuş.
`;

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { message } = JSON.parse(event.body);

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Mesaj boş olamaz' })
      };
    }

    const groq = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: 'https://api.groq.com/openai/v1'
    });

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_CONTEXT },
        { role: 'user', content: message }
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