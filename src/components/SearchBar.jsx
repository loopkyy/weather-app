import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Clock, X, ChevronRight } from 'lucide-react';

const SearchBar = ({ onSearch, loading, recentSearches = [], onClearRecent }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showRecent, setShowRecent] = useState(false);
  const inputRef = useRef(null);

  const popularCities = [
    { name: 'Jakarta', country: 'ID' },
    { name: 'Bandung', country: 'ID' },
    { name: 'Surabaya', country: 'ID' },
    { name: 'Tokyo', country: 'JP' },
    { name: 'London', country: 'GB' },
    { name: 'New York', country: 'US' },
    { name: 'Singapore', country: 'SG' },
    { name: 'Bali', country: 'ID' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !loading) {
      onSearch(query);
      if (inputRef.current) inputRef.current.blur();
    }
  };

  const handleCityClick = (city) => {
    onSearch(city);
    setQuery('');
    if (inputRef.current) inputRef.current.blur();
  };

  const handleClearRecent = (e) => {
    e.stopPropagation();
    onClearRecent?.();
  };
  
  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search Form */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
            loading ? 'text-blue-500 animate-pulse' : 'text-gray-400 dark:text-gray-500'
          }`}>
            {loading ? (
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Search size={20} />
            )}
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              setShowRecent(true);
            }}
            onBlur={() => {
              setTimeout(() => {
                setIsFocused(false);
                setShowRecent(false);
              }, 200);
            }}
            placeholder="Cari kota atau lokasi..."
            className="w-full pl-12 pr-24 py-4 text-gray-900 dark:text-white bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
            disabled={loading}
            autoComplete="off"
          />
          
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Clear search"
              >
                <X size={16} className="text-gray-400 dark:text-gray-500" />
              </button>
            )}
            
            <button
              type="submit"
              disabled={!query.trim() || loading}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
                query.trim() && !loading
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              }`}
            >
              <span>Cari</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </form>

      {/* Dropdown Suggestions */}
      {(isFocused || showRecent) && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl overflow-hidden z-50 animate-slideDown">
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="p-3 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Clock size={14} className="mr-2 text-gray-400" />
                  Pencarian Terbaru
                </div>
                <button
                  onClick={handleClearRecent}
                  className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                >
                  Hapus semua
                </button>
              </div>
              <div className="space-y-1">
                {recentSearches.slice(0, 3).map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleCityClick(search)}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left"
                  >
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-3 text-gray-400" />
                      <span className="text-gray-800 dark:text-gray-200">{search}</span>
                    </div>
                    <ChevronRight size={14} className="text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Popular Cities */}
          <div className="p-3">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Kota Populer
            </div>
            <div className="grid grid-cols-2 gap-2">
              {popularCities.map((city) => (
                <button
                  key={`${city.name}-${city.country}`}
                  onClick={() => handleCityClick(city.name)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 border border-gray-100 dark:border-gray-700/50 hover:border-blue-200 dark:hover:border-blue-700/50 group"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                      <MapPin size={14} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {city.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {city.country}
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 dark:text-gray-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
          
          {/* Search Tips */}
          <div className="p-3 bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Gunakan format "Kota, Negara" untuk hasil lebih akurat
            </div>
          </div>
        </div>
      )}
      {!isFocused && (
        <div className="mt-4 flex flex-wrap gap-2 justify-center animate-fadeIn">
          {popularCities.slice(0, 4).map((city) => (
            <button
              key={`chip-${city.name}`}
              onClick={() => handleCityClick(city.name)}
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 bg-gray-100/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md border border-transparent hover:border-blue-200 dark:hover:border-blue-800"
            >
              <MapPin size={12} className="mr-2" />
              {city.name}
            </button>
          ))}
        </div>
      )}

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SearchBar;