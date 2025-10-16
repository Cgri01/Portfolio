import { useState } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // EmailJS gönderimi
    emailjs.send(
      'service_4i65q9r', // EmailJS Service ID
      'template_bf73xlm', // EmailJS Template ID
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'cgriag@gmail.com' // Kendi email'in
      },
      'cWs8eZYcJHA-A_RK_' // EmailJS Public Key
    )
    .then((result) => {
      console.log('Email gönderildi:', result.text);
      alert('Mesajınız gönderildi! En kısa sürede dönüş yapacağım.');
      
      // Formu temizle
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    })
    .catch((error) => {
      console.error('Email gönderilemedi:', error);
      alert('Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin veya direkt email atın.');
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  const contactMethods = [
    {
      icon: '📧',
      title: 'E-posta',
      value: 'cgriag@gmail.com',
      link: 'mailto:cgriag@gmail.com'
    },
    {
      icon: '📱',
      title: 'Telefon',
      value: '+90 541 732 59 25',
      link: 'tel:+905417325925'
    },
    {
      icon: '📍',
      title: 'Konum',
      value: 'Adana, Türkiye / Lefkoşa, Kuzey Kıbrıs',
      link: '#'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Başlığı */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            İletişim
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bir proje üzerinde birlikte çalışmak veya sadece merhaba demek isterseniz, 
            benimle iletişime geçmekten çekinmeyin!
          </p>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* İletişim Bilgileri */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              İletişim Bilgilerim
            </h3>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
              Aşağıdaki iletişim kanallarından bana ulaşabilir veya formu doldurarak 
              direkt mesaj gönderebilirsiniz. En kısa sürede size dönüş yapacağım.
            </p>

            {/* İletişim Metodları */}
            <div className="space-y-4 mb-8">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.link}
                  className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-200 group"
                >
                  <span className="text-2xl mr-4 group-hover:scale-110 transition-transform duration-200">
                    {method.icon}
                  </span>
                  <div>
                    <div className="font-semibold text-gray-900">{method.title}</div>
                    <div className="text-gray-600">{method.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* İletişim Formu */}
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Mesaj Gönder
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    İsim *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50"
                    placeholder="Adınız"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Konu *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50"
                  placeholder="Mesaj konusu"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Mesaj *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none disabled:opacity-50"
                  placeholder="Mesajınızı buraya yazın..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl disabled:shadow-lg flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Gönderiliyor...
                  </>
                ) : (
                  'Mesajı Gönder'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;