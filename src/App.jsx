import React, { useState, useEffect } from 'react';
import WeatherDashboard from './components/WeatherDashboard';
import Header from './components/Header';
import { Github, Settings, MapPin, X, Sun, Moon, Search, Navigation } from 'lucide-react';

function App() {
  const [isDaytime, setIsDaytime] = useState(true);
  const [currentLocation, setCurrentLocation] = useState('Kuningan, ID');
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonType, setComingSoonType] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const hour = new Date().getHours();
      setIsDaytime(hour >= 6 && hour < 18);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleLocationClick = () => {
    setComingSoonType('location');
    setShowComingSoon(true);
  };

  const handleSettingsClick = () => {
    setComingSoonType('settings');
    setShowComingSoon(true);
  };

  const getComingSoonMessage = () => {
    switch(comingSoonType) {
      case 'location': return 'Fitur lokasi otomatis akan segera hadir! 🗺️';
      case 'settings': return 'Pengaturan lanjutan dalam pengembangan! ⚙️';
      default: return 'Fitur akan segera hadir! 🚀';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 via-blue-50/10 to-white/30 dark:from-gray-900 dark:via-gray-800/30 dark:to-gray-900/50 transition-all duration-700">
      <Header 
        currentLocation={currentLocation}
        onLocationClick={handleLocationClick}
        onSettingsClick={handleSettingsClick}
      />
      
      <main className="relative">
        <WeatherDashboard />
      </main>

      {/* Coming Soon Modal */}
      {showComingSoon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fadeIn"
            onClick={() => setShowComingSoon(false)}
          />
          
          <div className="relative w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-scaleIn">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500"></div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                    {comingSoonType === 'location' ? (
                      <MapPin size={24} className="text-white" />
                    ) : (
                      <Settings size={24} className="text-white" />
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {comingSoonType === 'location' ? 'Lokasi' : 'Pengaturan'}
                  </h2>
                </div>
                <button
                  onClick={() => setShowComingSoon(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <div className="text-center py-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 flex items-center justify-center">
                  <div className="text-3xl">🚀</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Fitur Segera Hadir!
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {getComingSoonMessage()}
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Stay tuned untuk update terbaru!
                </div>
              </div>

              <button 
                onClick={() => setShowComingSoon(false)}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                Mengerti
              </button>
            </div>
          </div>
        </div>
      )}

      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
}

export default App;