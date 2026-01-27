import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import { getWeatherData, getForecastData } from '../services/weatherService';
import { RefreshCw, Star, MapPin, Thermometer, Globe } from 'lucide-react';
import { Github } from 'lucide-react';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric');
  const [favorites, setFavorites] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  const defaultCity = "Kuningan";

  // Initialize from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('weatherFavorites');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));

    const savedRecent = localStorage.getItem('recentSearches');
    if (savedRecent) setRecentSearches(JSON.parse(savedRecent));
  }, []);

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null);
    
    try {
      const [currentData, forecastData] = await Promise.all([
        getWeatherData(city, unit),
        getForecastData(city, unit)
      ]);
      
      setWeatherData(currentData);
      setForecastData(forecastData);
      
      // Update recent searches
      updateRecentSearches(city);
      
    } catch (err) {
      setError(err.message || "Gagal memuat data cuaca");
    } finally {
      setLoading(false);
    }
  };

  const updateRecentSearches = (city) => {
    const updatedRecent = [
      city,
      ...recentSearches.filter(item => item !== city)
    ].slice(0, 5);
    
    setRecentSearches(updatedRecent);
    localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  useEffect(() => {
    fetchWeatherData(defaultCity);
  }, [unit]);

  const toggleFavorite = () => {
    if (!weatherData) return;
    
    const city = weatherData.name;
    let updatedFavorites;
    
    if (favorites.includes(city)) {
      updatedFavorites = favorites.filter(fav => fav !== city);
    } else {
      updatedFavorites = [...favorites, city];
    }
    
    setFavorites(updatedFavorites);
    localStorage.setItem('weatherFavorites', JSON.stringify(updatedFavorites));
  };

  const toggleUnit = () => {
    setUnit(prev => prev === 'metric' ? 'imperial' : 'metric');
  };

  const handleSearch = (city) => {
    if (city.trim()) {
      fetchWeatherData(city);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-gray-900/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/*Search */}
        <div className="mb-8 lg:mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
            {/* Title */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
                SkyCast Dashboard
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Informasi cuaca real-time & prakiraan
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-auto lg:mx-0">
              <SearchBar 
                onSearch={handleSearch} 
                loading={loading} 
                recentSearches={recentSearches}
                onClearRecent={clearRecentSearches}
              />
            </div>
          </div>

          {/* Location & Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-4 lg:p-5 shadow-sm border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                <MapPin size={22} className="text-white" />
              </div>
              
              <div>
                {weatherData ? (
                  <div>
                    <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      {weatherData.name}, {weatherData.sys?.country}
                      <button
                        onClick={toggleFavorite}
                        className="transition-transform hover:scale-110"
                      >
                        <Star 
                          size={20} 
                          className={`${
                            favorites.includes(weatherData.name)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-400 dark:text-gray-500'
                          } hover:text-yellow-400 dark:hover:text-yellow-400`} 
                        />
                      </button>
                    </h2>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                      <Globe size={14} className="mr-1.5" />
                      {weatherData.coord?.lat?.toFixed(2)}°N, {weatherData.coord?.lon?.toFixed(2)}°E
                    </div>
                  </div>
                ) : (
                  <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                )}
              </div>
            </div>
            
            {/* Controls */}
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden">
                <button
                  onClick={toggleUnit}
                  className={`px-4 py-2.5 text-sm font-medium transition-all ${
                    unit === 'metric' 
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                  }`}
                >
                  °C
                </button>
                <button
                  onClick={toggleUnit}
                  className={`px-4 py-2.5 text-sm font-medium transition-all ${
                    unit === 'imperial' 
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                  }`}
                >
                  °F
                </button>
              </div>
              
              <button
                onClick={() => weatherData && fetchWeatherData(weatherData.name)}
                disabled={loading}
                className="p-3 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-gray-300 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-700 shadow-sm hover:shadow-md transition-all disabled:opacity-50"
              >
                <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
              </button>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8">
            <div className="p-4 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border border-red-200 dark:border-red-800 rounded-xl shadow-sm">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3">
                  <Thermometer size={20} className="text-red-500 dark:text-red-400" />
                </div>
                <div>
                  <div className="font-medium text-red-700 dark:text-red-400">
                    Terjadi Kesalahan
                  </div>
                  <div className="text-sm text-red-600 dark:text-red-500/80 mt-1">
                    {error}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        {loading ? (
          <div className="space-y-8 animate-pulse">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 h-96 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
              <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
            </div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
          </div>
        ) : weatherData ? (
          <div className="space-y-8">
            {/* Weather Cards Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Current Weather - Larger */}
              <div className="lg:col-span-2">
                <CurrentWeather data={weatherData} unit={unit} />
              </div>
              
              {/* Favorites Sidebar */}
              {favorites.length > 0 && (
                <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Favorit Anda
                    </h3>
                    <div className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                      {favorites.length} kota
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {favorites.map((city) => (
                      <button
                        key={city}
                        onClick={() => handleSearch(city)}
                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition-all group"
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-100 to-amber-100 dark:from-yellow-900/20 dark:to-amber-900/20 flex items-center justify-center mr-3">
                            <Star size={16} className="text-yellow-500 dark:text-yellow-400" />
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                              {city}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Klik untuk melihat cuaca
                            </div>
                          </div>
                        </div>
                        <div className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                          Lihat
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      Klik bintang di header untuk menambah/hapus favorit
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Forecast Section */}
            <Forecast data={forecastData} unit={unit} />

            {/* Quick Stats */}
            {weatherData && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Tekanan</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {weatherData.main.pressure} hPa
                  </div>
                </div>
                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Jarak Pandang</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {(weatherData.visibility / 1000).toFixed(1)} km
                  </div>
                </div>
                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Sunrise</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('id-ID', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Sunset</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('id-ID', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>

{/* Footer */}
      <div className="mt-12 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-center sm:text-left">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Data cuaca disediakan oleh OpenWeatherMap
        </div>
        <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          SkyCast v1.0 • © {new Date().getFullYear()}
        </div>
      </div>
      
      <a 
        href="https://github.com/loopkyy"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <Github size={16} />
        <span>GitHub</span>
      </a>
    </div>
  </div>
</div>
    </div>
  );
};

export default WeatherDashboard;