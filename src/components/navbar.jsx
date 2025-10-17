import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll efekti için
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Menü öğeleri
  const navItems = [
    { name: 'Ana Sayfa', href: '#home' },
    { name: 'Hakkımda', href: '#about' },
    // { name: 'Projeler', href: '#projects' },
    { name: 'Yetenekler', href: '#skills' },
    // { name: 'İletişim', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo - Sol taraf */}
          <div className="flex items-center space-x-3">
            {/* Resmim */}
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
              <img
                src="/1.jpg"
                alt="Profil"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Çağrı Alagöz</h1>
              <p className="text-xs text-gray-500">Yazılım Mühendisliği Öğrencisi</p>
            </div>
          </div>

          {/* Desktop Menü - ORTADA */}
          <div className="hidden md:flex flex-grow justify-center items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Boş div - Sağ tarafı dengelemek için */}
          <div className="hidden md:block w-40"> 
            {/* Logo ile aynı genişlikte */}
          </div>

          {/* Mobile Menü Butonu */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menü */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 bg-white/95 backdrop-blur-md rounded-lg shadow-lg">
            <div className="flex flex-col space-y-3 px-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 py-2 transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <a
                href="#contact"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium text-center mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                İletişime Geç
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;