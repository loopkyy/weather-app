import React, { useState, useEffect } from 'react';
import { Cloud, MapPin, Menu, X, Sun, Moon } from 'lucide-react';

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const menuItems = [
    { label: 'Cuaca Saat Ini' },
    { label: 'Prakiraan 5 Hari' },
    { label: 'Lokasi' },
    { label: 'Pengaturan' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Cloud size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Weather
                </h1>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <MapPin size={12} className="mr-1" />
                  <span>Current location</span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation & Time */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-right">
              <div className="font-medium text-gray-800 dark:text-white">
                {formatTime(currentTime)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {currentTime.getHours() >= 6 && currentTime.getHours() < 18 ? (
                  <div className="flex items-center">
                    <Sun size={12} className="mr-1 text-amber-500" />
                    Daytime
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Moon size={12} className="mr-1 text-blue-400" />
                    Nighttime
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Time */}
          <div className="md:hidden">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {formatTime(currentTime)}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden pt-16">
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          
          <div className="relative bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="py-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  className="w-full px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            <div className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700">
              Weather v1.0 • Data updated in real-time
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;