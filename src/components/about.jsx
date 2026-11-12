import { useLanguage } from '../i18n/useLanguage';

const About = () => {
  const { t, language } = useLanguage();

  const interestsByLang = {
    tr: ['Web Geliştirme', 'UI/UX Tasarım', 'Arduino', 'Yapay Zeka', 'Spor', 'IT'],
    en: ['Web Development', 'UI/UX Design', 'Arduino', 'Artificial Intelligence', 'Sports', 'IT'],
  };

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Başlığı */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.about.title}
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* Ana İçerik */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {/* Giriş Paragrafı */}
          <div className="text-center mb-8">
            <p className="text-xl text-gray-700 leading-relaxed">
              {t.about.lead}
            </p>
          </div>

          {/* Kişisel Bilgiler Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Sol Taraf - Temel Bilgiler */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  {t.about.basicInfo}
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex justify-between">
                    <span>{t.about.name}:</span>
                    <span className="font-medium">Çağrı Alagöz</span>
                  </li>
                  <li className="flex justify-between">
                    <span>{t.about.titleLabel}:</span>
                    <span className="font-medium">{t.navbar.role}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>{t.about.city}:</span>
                    <span className="font-medium">Adana / Lefkoşa</span>
                  </li>
                  <li className="flex justify-between">
                    <span>{t.about.email}:</span>
                    <span className="font-medium">cgriag@gmail.com <br /> cgriag01@gmail.com</span>
                  </li>
                </ul>
              </div>

              {/* Eğitim */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  {t.about.education}
                </h3>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="font-medium text-gray-800">{t.about.degree}</p>
                  <p className="text-sm text-gray-600">{t.about.school}</p>
                  <p className="text-xs text-gray-500 mt-1">2021 - 2026</p>
                </div>
              </div>
            </div>

            {/* Sağ Taraf - Yetenekler & İlgi Alanları */}
            <div className="space-y-6">
              {/* Kısa Beceriler */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                  {t.about.focusTech}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['React', 'JavaScript', 'TailwindCSS', 'Angular', 'Python', 'C#' , ].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* İlgi Alanları */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-yellow-600 rounded-full mr-3"></span>
                  {t.about.interests}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {interestsByLang[language].map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CV Butonu */}
          <div className="text-center mt-8">
            <a
              href="/CagriCv.pdf"
              // download
              className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {t.about.viewCv}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
