export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation tidak didukung'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ lat: latitude, lon: longitude });
      },
      (error) => {
        reject(error);
      },
      { timeout: 10000 }
    );
  });
};

export const getCityNameFromCoords = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
    );
    const data = await response.json();
    return data[0]?.name || 'Unknown Location';
  } catch {
    return 'Unknown Location';
  }
};