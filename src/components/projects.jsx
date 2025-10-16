const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "E-Ticaret Sitesi",
      description: "React ve Node.js kullanarak geliştirdiğim modern bir e-ticaret uygulaması. Kullanıcı girişi, sepete ekleme ve ödeme entegrasyonu içerir.",
      image: "/project1.jpg", // Kendi proje resimlerini ekle
      technologies: ["React", "Node.js", "MongoDB", "TailwindCSS"],
      demoLink: "#",
      githubLink: "#",
      featured: true
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Kullanıcıların görevlerini yönetebileceği responsive bir web uygulaması. Drag-drop özelliği ve gerçek zamanlı güncelleme.",
      image: "/project2.jpg",
      technologies: ["React", "Firebase", "CSS3", "JavaScript"],
      demoLink: "#",
      githubLink: "#",
      featured: true
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "Hava durumu API'si kullanarak geliştirdiğim hava durumu uygulaması. 5 günlük tahmin ve konum bazlı veri sunar.",
      image: "/project3.jpg",
      technologies: ["JavaScript", "API", "CSS3", "HTML5"],
      demoLink: "#",
      githubLink: "#",
      featured: false
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "React ve TailwindCSS kullanarak oluşturduğum kişisel portfolio sitesi. Responsive tasarım ve modern UI.",
      image: "/project4.jpg",
      technologies: ["React", "TailwindCSS", "Vite", "JavaScript"],
      demoLink: "#",
      githubLink: "#",
      featured: false
    }
  ];

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Başlığı */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Projelerim
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Geliştirdiğim bazı projeleri inceleyin. Her biri farklı teknolojiler ve 
            yaklaşımlarla oluşturulmuştur.
          </p>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
        </div>

        {/* Projeler Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                project.featured ? 'border-2 border-blue-500' : 'border border-gray-200'
              }`}
            >
              {/* Proje Resmi */}
              <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 relative overflow-hidden">
                {project.featured && (
                  <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                    ⭐ Öne Çıkan
                  </div>
                )}
                <div className="w-full h-full flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <p className="font-semibold">{project.title}</p>
                    <p className="text-sm opacity-90">Proje Görseli</p>
                  </div>
                </div>
              </div>

              {/* Proje İçerik */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Teknolojiler */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Butonlar */}
                <div className="flex space-x-3">
                  <a
                    href={project.demoLink}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                  >
                    Demo
                  </a>
                  <a
                    href={project.githubLink}
                    className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 text-center py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Daha Fazla Proje Butonu */}
        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Daha Fazla Proje İçin İletişime Geçin
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;