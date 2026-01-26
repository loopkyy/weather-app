import React from 'react';
import { Thermometer, Droplets, Wind, MapPin } from 'lucide-react';
import { getWeatherIcon } from '../utils/weatherUtils';

const CurrentWeather = ({ data, unit }) => {
  const tempUnit = unit === 'metric' ? '°C' : '°F';
  const windUnit = unit === 'metric' ? 'm/s' : 'mph';

  return (
    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
      {/* Location Header */}
      <div className="flex items-center mb-6">
        <MapPin size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
        <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">
          {data.name}, {data.sys?.country || ''}
        </h2>
      </div>

      {/* Main Weather Info */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-baseline">
            <span className="text-5xl font-light text-gray-900 dark:text-white tracking-tight">
              {Math.round(data.main.temp)}
            </span>
            <span className="text-xl text-gray-600 dark:text-gray-400 ml-1">
              {tempUnit}
            </span>
          </div>
          <div className="text-gray-700 dark:text-gray-300 text-base font-medium capitalize mt-1">
            {data.weather[0].description}
          </div>
        </div>
        <div className="relative">
          {/* PAKAI EMOJI: */}
          <div className="text-7xl animate-pulse">
            {getWeatherIcon(data.weather[0].icon, data.weather[0].description)}
          </div>
        </div>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100 dark:border-gray-800">
        <div className="flex flex-col items-center p-3 rounded-xl bg-gray-50/50 dark:bg-gray-800/50">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-2">
            <Thermometer size={18} className="text-blue-600 dark:text-blue-400" />
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">Feels Like</span>
          <span className="text-lg font-semibold text-gray-800 dark:text-white">
            {Math.round(data.main.feels_like)}{tempUnit}
          </span>
        </div>

        <div className="flex flex-col items-center p-3 rounded-xl bg-gray-50/50 dark:bg-gray-800/50">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/30 mb-2">
            <Droplets size={18} className="text-cyan-600 dark:text-cyan-400" />
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">Humidity</span>
          <span className="text-lg font-semibold text-gray-800 dark:text-white">
            {data.main.humidity}%
          </span>
        </div>

        <div className="flex flex-col items-center p-3 rounded-xl bg-gray-50/50 dark:bg-gray-800/50">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-2">
            <Wind size={18} className="text-purple-600 dark:text-purple-400" />
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">Wind</span>
          <span className="text-lg font-semibold text-gray-800 dark:text-white">
            {data.wind.speed} {windUnit}
          </span>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-6 text-xs text-gray-500 dark:text-gray-400 text-center">
        Updated just now
      </div>
    </div>
  );
};

export default CurrentWeather;