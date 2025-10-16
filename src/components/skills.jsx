const Skills = () => {
  const skillCategories = [
    {
      category: "Frontend",
      icon: "🎨",
      skills: ["Angular", "JavaScript", "HTML5", "CSS3", "TailwindCSS", "TypeScript", "Vue.js", "Bootstrap"]
    },
    {
      category: "Backend",
      icon: "⚙️",
      skills: ["C#", "SQL"]
    },
    {
      category: "Araçlar & Diğer",
      icon: "🛠️",
      skills: ["Git", "GitHub", "VS Code"]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Başlığı */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Yeteneklerim
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Geliştirme sürecinde kullandığım teknolojiler ve araçlar
          </p>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div 
              key={categoryIndex}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Kategori Başlığı */}
              <div className="text-center mb-6">
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="text-xl font-bold text-gray-900">
                  {category.category}
                </h3>
              </div>
              
              {/* Skills Listesi */}
              <div className="flex flex-wrap gap-3 justify-center">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full font-medium hover:bg-blue-100 transition-colors duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Ek Bilgiler */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-2xl mr-3">🚀</span>
              Sürekli Gelişim
            </h3>
            <p className="leading-relaxed opacity-90">
              Teknoloji dünyası hızla değişiyor ve ben de bu değişime ayak uydurmak için 
              sürekli yeni teknolojiler öğreniyor, kendimi geliştiriyorum.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-2xl mr-3">🎯</span>
              Öğrenme Yolculuğum
            </h3>
            <p className="leading-relaxed opacity-90">
              Şu anda <strong>Node.js</strong>, ve <strong>React Native </strong> 
              üzerine odaklanıyorum. Her gün yeni bir şey öğrenmek 
              benim için bir tutku.
            </p>
          </div>
        </div>

        {/* Teknoloji İstatistikleri */}
        {/* <div className="mt-12 text-center">
          <div className="inline-flex flex-wrap justify-center gap-8 bg-white rounded-xl shadow-lg p-8">
            {[
              { number: '15+', label: 'Teknoloji' },
              { number: '2+', label: 'Yıl Deneyim' },
              { number: '20+', label: 'Proje' },
              { number: '∞', label: 'Öğrenme İsteği' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Skills;