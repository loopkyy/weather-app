export const getWeatherIcon = (iconCode, condition = '') => {
  const cond = (condition || '').toLowerCase();
  
  if (cond.includes('clear') || cond.includes('cerah')) return '☀️';
  if (cond.includes('rain') || cond.includes('hujan')) return '🌧️';
  if (cond.includes('drizzle') || cond.includes('gerimis')) return '🌦️';
  if (cond.includes('thunder') || cond.includes('petir')) return '⛈️';
  if (cond.includes('snow') || cond.includes('salju')) return '❄️';
  if (cond.includes('cloud') || cond.includes('awan')) return '☁️';
  if (cond.includes('mist') || cond.includes('fog') || cond.includes('kabut')) return '🌫️';
  if (cond.includes('wind') || cond.includes('angin')) return '💨';
  
  if (iconCode) {
    const code = iconCode.toString();
    if (code.startsWith('01')) return '☀️';
    if (code.startsWith('02')) return '⛅';
    if (code.startsWith('03') || code.startsWith('04')) return '☁️';
    if (code.startsWith('09') || code.startsWith('10')) return '🌧️';
    if (code.startsWith('11')) return '⛈️';
    if (code.startsWith('13')) return '❄️';
    if (code.startsWith('50')) return '🌫️';
  }
  
  return '🌈';
};

export const getWeatherEmoji = (condition) => {
  return getWeatherIcon('', condition);
};

export const formatDay = (timestamp) => {
  if (!timestamp) return '...';
  
  try {
    const date = new Date(timestamp * 1000);
    const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    return days[date.getDay()] || '...';
  } catch {
    return '...';
  }
};

export const formatFullDate = (timestamp) => {
  if (!timestamp) return '...';
  
  try {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch {
    return '...';
  }
};

export const formatTime = (timestamp) => {
  if (!timestamp) return '...';
  
  try {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return '...';
  }
};

export const getTemperatureColor = (temp, unit = 'metric') => {
  if (temp === null || temp === undefined) return 'text-gray-500';
  
  let tempC = temp;
  
  if (unit === 'imperial') {
    tempC = (temp - 32) * 5/9;
  }
  
  if (tempC < 15) return 'text-blue-500 dark:text-blue-400';
  if (tempC < 20) return 'text-blue-400 dark:text-blue-300';
  if (tempC < 25) return 'text-green-500 dark:text-green-400';
  if (tempC < 30) return 'text-green-400 dark:text-green-300';
  if (tempC < 35) return 'text-amber-500 dark:text-amber-400';
  if (tempC < 40) return 'text-orange-500 dark:text-orange-400';
  return 'text-red-500 dark:text-red-400';
};

export const getTemperatureGradient = (temp, unit = 'metric') => {
  if (temp === null || temp === undefined) return 'from-gray-400 to-gray-600';
  
  let tempC = temp;
  
  if (unit === 'imperial') {
    tempC = (temp - 32) * 5/9;
  }
  
  if (tempC < 15) return 'from-blue-400 to-blue-600';
  if (tempC < 20) return 'from-blue-300 to-blue-500';
  if (tempC < 25) return 'from-green-400 to-green-600';
  if (tempC < 30) return 'from-green-300 to-green-500';
  if (tempC < 35) return 'from-amber-400 to-amber-600';
  if (tempC < 40) return 'from-orange-400 to-orange-600';
  return 'from-red-400 to-red-600';
};

export const getWindDirection = (degrees) => {
  if (degrees === null || degrees === undefined) return '...';
  
  const directions = ['↑ Utara', '↗️ TL', '→ Timur', '↘️ TG', '↓ Selatan', '↙️ BD', '← Barat', '↖️ BL'];
  const index = Math.round((degrees % 360) / 45) % 8;
  return directions[index] || '...';
};

export const getHumidityLevel = (humidity) => {
  if (humidity === null || humidity === undefined) {
    return { level: '...', color: 'text-gray-500', emoji: '...' };
  }
  
  if (humidity < 30) return { level: 'Sangat Kering', color: 'text-yellow-600', emoji: '🏜️' };
  if (humidity < 50) return { level: 'Kering', color: 'text-amber-500', emoji: '🌵' };
  if (humidity < 70) return { level: 'Nyaman', color: 'text-green-500', emoji: '😊' };
  if (humidity < 85) return { level: 'Lembab', color: 'text-blue-500', emoji: '💧' };
  return { level: 'Sangat Lembab', color: 'text-cyan-500', emoji: '🌊' };
};

export const getWeatherAdvice = (weatherData) => {
  if (!weatherData) return ['🌤️ Cuaca sedang diproses...'];
  
  const { main, weather, wind, visibility } = weatherData;
  const temp = main?.temp || 25;
  const humidity = main?.humidity || 50;
  const condition = weather?.[0]?.main || '';
  const windSpeed = wind?.speed || 0;
  const vis = visibility || 10000;
  
  const advice = [];
  
  if (temp > 35) advice.push('🏖️ Hindari panas berlebih, cari tempat teduh');
  else if (temp < 20) advice.push('🧥 Pakai jaket atau baju hangat');
  
  if (condition.includes('Rain') || condition.includes('Drizzle')) {
    advice.push('☔ Bawa payung atau jas hujan');
  }
  
  if (condition.includes('Thunder')) {
    advice.push('⚡ Hindari area terbuka dan benda logam');
  }
  
  if (condition.includes('Snow')) {
    advice.push('❄️ Gunakan pakaian hangat dan berhati-hati');
  }
  
  if (windSpeed > 8) {
    advice.push('💨 Angin kencang, hati-hati dengan benda terbang');
  }
  
  if (vis < 2000) {
    advice.push('🚗 Hati-hati saat berkendara, gunakan lampu');
  }
  
  if (humidity > 80) {
    advice.push('💦 Udara lembab, gunakan pakaian yang menyerap keringat');
  } else if (humidity < 30) {
    advice.push('🧴 Gunakan pelembab kulit untuk mencegah kekeringan');
  }
  
  return advice.length > 0 ? advice : ['🌤️ Cuaca baik, nikmati hari Anda!'];
};