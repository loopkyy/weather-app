import React, { useState, useEffect } from 'react';
import { Cloud, MapPin, Menu, X, Sun, Moon, Settings, Navigation } from 'lucide-react';

const Header = ({ currentLocation = "Current location", onLocationClick, onSettingsClick }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDaytime, setIsDaytime] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setIsDaytime(now.getHours() >= 6 && now.getHours() < 18);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const menuItems = [
    { icon: <Navigation size={18} />, label: 'Lokasi Saya', action: onLocationClick },
    { icon: <Settings size={18} />, label: 'Pengaturan', action: onSettingsClick },
  ];

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo & Brand */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors lg:hidden"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X size={22} className="text-gray-700 dark:text-gray-300" />
                ) : (
                  <Menu size={22} className="text-gray-700 dark:text-gray-300" />
                )}
              </button>

              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-xl transition-all duration-300 ${
                  isDaytime 
                    ? 'bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-200 dark:shadow-blue-900/30' 
                    : 'bg-gradient-to-br from-indigo-600 to-purple-500 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30'
                }`}>
                  <Cloud size={24} className="text-white" />
                </div>
                
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    SkyCast
                  </h1>
                  <button 
                    onClick={onLocationClick}
                    className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                  >
                    <MapPin size={14} className="mr-1.5 group-hover:scale-110 transition-transform" />
                    <span className="truncate max-w-[150px]">{currentLocation}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Time & Date - Desktop */}
            <div className="hidden lg:flex items-center space-x-8">
              <div className="text-right">
                <div className="flex items-center justify-end mb-1">
                  {isDaytime ? (
                    <Sun size={16} className="text-amber-500 mr-2 animate-pulse" />
                  ) : (
                    <Moon size={16} className="text-indigo-400 mr-2" />
                  )}
                  <div className="text-2xl font-light tracking-tight text-gray-900 dark:text-white">
                    {formatTime(currentTime)}
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(currentTime)}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button 
                  onClick={onLocationClick}
                  className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Refresh location"
                >
                  <Navigation size={20} className="text-gray-700 dark:text-gray-300" />
                </button>
                
                <button 
                  onClick={onSettingsClick}
                  className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Settings"
                >
                  <Settings size={20} className="text-gray-700 dark:text-gray-300" />
                </button>
              </div>
            </div>

            {/* Time Only - Mobile */}
            <div className="flex items-center space-x-3 lg:hidden">
              <div className={`p-1.5 rounded-lg ${isDaytime ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-indigo-100 dark:bg-indigo-900/30'}`}>
                {isDaytime ? (
                  <Sun size={16} className="text-amber-600 dark:text-amber-400" />
                ) : (
                  <Moon size={16} className="text-indigo-600 dark:text-indigo-400" />
                )}
              </div>
              <div className="text-right">
                <div className="font-medium text-gray-900 dark:text-white">
                  {formatTime(currentTime)}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {isDaytime ? 'Siang' : 'Malam'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
        isMenuOpen ? 'visible' : 'invisible'
      }`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-30' : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <div className={`absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 shadow-xl border-t border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}>
          {/* Current Info */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {formatTime(currentTime)}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(currentTime)}
                </div>
              </div>
              <div className={`p-2 rounded-lg ${isDaytime ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-indigo-100 dark:bg-indigo-900/30'}`}>
                {isDaytime ? (
                  <Sun size={20} className="text-amber-600 dark:text-amber-400" />
                ) : (
                  <Moon size={20} className="text-indigo-600 dark:text-indigo-400" />
                )}
              </div>
            </div>
            
            <div className="text-sm text-gray-600 dark:text-gray-300">
              <MapPin size={14} className="inline mr-1.5" />
              {currentLocation}
            </div>
          </div>
          
          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center px-5 py-4 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-800 transition-colors"
                onClick={() => {
                  item.action?.();
                  setIsMenuOpen(false);
                }}
              >
                <span className="mr-3 text-gray-500 dark:text-gray-400">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
          
          {/* Footer */}
          <div className="p-4 text-center border-t border-gray-100 dark:border-gray-800">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center justify-center mb-1">
                <Cloud size={12} className="mr-1.5 text-blue-500" />
                SkyCast v1.0
              </div>
              <div>Data cuaca real-time • © {new Date().getFullYear()}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;