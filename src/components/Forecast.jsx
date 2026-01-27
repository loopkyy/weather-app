import React, { useState } from 'react';
import { getWeatherIcon, formatDay, formatFullDate } from '../utils/weatherUtils';
import { ChevronRight, Droplets, Wind, Thermometer, Sunrise, Sunset } from 'lucide-react';

const WeatherIcon = ({ iconCode, condition, size = 'text-4xl' }) => {
  const icon = getWeatherIcon(iconCode, condition);
  return (
    <div className={`${size} animate-pulse`} title={condition}>
      {icon}
    </div>
  );
};

const Forecast = ({ data, unit }) => {
  const tempUnit = unit === 'metric' ? '°C' : '°F';
  const windUnit = unit === 'metric' ? 'm/s' : 'mph';
  const [selectedDay, setSelectedDay] = useState(0);
  
  const dailyForecasts = data.slice(0, 5);

  const getWeatherAdvice = (weatherMain) => {
    const advice = {
      Rain: "Hari hujan, siapkan payung atau jas hujan.",
      Clear: "Cerah sempurna, ideal untuk aktivitas luar ruangan.",
      Clouds: "Berawan, cahaya matahari cukup nyaman.",
      Thunderstorm: "Cuaca ekstrem, hindari area terbuka.",
      Snow: "Salju turun, gunakan pakaian hangat.",
      Mist: "Berkabut, berhati-hati saat berkendara.",
      Drizzle: "Gerimis ringan, tetap bawa pelindung hujan."
    };
    return advice[weatherMain] || "Cuaca normal untuk beraktivitas.";
  };

  return (
    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Prakiraan 5 Hari
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Pilih hari untuk detail lengkap
            </p>
          </div>
          <div className="text-xs font-medium px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
            {dailyForecasts.length} hari
          </div>
        </div>
      </div>

      {/* Day selector - Horizontal Tabs */}
      <div className="flex mb-8 border-b border-gray-200 dark:border-gray-700">
        {dailyForecasts.map((day, index) => (
          <button
            key={index}
            onClick={() => setSelectedDay(index)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-all duration-200 relative ${
              selectedDay === index
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <div className="flex flex-col items-center">
              <span className={`font-medium ${selectedDay === index ? 'text-blue-600 dark:text-blue-400' : ''}`}>
                {formatDay(day.dt)}
              </span>
              <div className="my-2">
                <WeatherIcon 
                  iconCode={day.weather[0].icon}
                  condition={day.weather[0].description}
                  size="text-3xl"
                />
              </div>
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-gray-800 dark:text-white">
                  {Math.round(day.temp.max)}°
                </span>
                <span className="text-gray-400">/</span>
                <span className="text-gray-500 dark:text-gray-400">
                  {Math.round(day.temp.min)}°
                </span>
              </div>
            </div>
            {selectedDay === index && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
            )}
          </button>
        ))}
      </div>

      {/* Selected day highlight card */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {formatFullDate(dailyForecasts[selectedDay].dt)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 capitalize mt-1">
                {dailyForecasts[selectedDay].weather[0].description}
              </div>
            </div>
            <div className="relative">
              <WeatherIcon 
                iconCode={dailyForecasts[selectedDay].weather[0].icon}
                condition={dailyForecasts[selectedDay].weather[0].description}
                size="text-6xl"
              />
            </div>
          </div>

          {/* Temperature stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 rounded-lg bg-white/50 dark:bg-gray-800/50">
              <div className="flex items-center justify-center mb-2">
                <Thermometer size={16} className="text-red-500 mr-2" />
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Maks</span>
              </div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {Math.round(dailyForecasts[selectedDay].temp.max)}{tempUnit}
              </div>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-white/50 dark:bg-gray-800/50">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Rata-rata</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {Math.round(dailyForecasts[selectedDay].temp.day)}{tempUnit}
              </div>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-white/50 dark:bg-gray-800/50">
              <div className="flex items-center justify-center mb-2">
                <Thermometer size={16} className="text-blue-500 mr-2" />
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Min</span>
              </div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {Math.round(dailyForecasts[selectedDay].temp.min)}{tempUnit}
              </div>
            </div>
          </div>

          {/* Additional metrics */}
          <div className="flex justify-center space-x-6">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center mr-2">
                <Droplets size={14} className="text-cyan-600 dark:text-cyan-400" />
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Kelembapan</div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {dailyForecasts[selectedDay].humidity}%
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-2">
                <Wind size={14} className="text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Angin</div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {dailyForecasts[selectedDay].wind_speed || 0} {windUnit}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weather advice */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="flex items-start">
          <ChevronRight size={20} className="text-blue-500 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <div className="font-medium text-gray-800 dark:text-white mb-1">
              Saran Aktivitas
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {getWeatherAdvice(dailyForecasts[selectedDay].weather[0].main)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forecast;