import axios from 'axios';

// API Key dari environment variable
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Data mock untuk fallback
const mockWeatherData = {
  "coord": { "lon": 106.8451, "lat": -6.2146 },
  "weather": [{ "id": 801, "main": "Clouds", "description": "berawan", "icon": "02d" }],
  "main": {
    "temp": 30,
    "feels_like": 35,
    "temp_min": 29,
    "temp_max": 32,
    "pressure": 1010,
    "humidity": 75
  },
  "visibility": 10000,
  "wind": { "speed": 3.6, "deg": 170 },
  "clouds": { "all": 20 },
  "dt": Math.floor(Date.now() / 1000),
  "sys": {
    "country": "ID",
    "sunrise": Math.floor(Date.now() / 1000) - 36000,
    "sunset": Math.floor(Date.now() / 1000) - 18000
  },
  "timezone": 25200,
  "id": 1642911,
  "name": "Jakarta",
  "cod": 200
};

const mockForecastData = [
  {
    dt: Math.floor(Date.now() / 1000) + 86400,
    temp: { day: 31, min: 26, max: 32 },
    weather: [{ main: "Clear", description: "cerah", icon: "01d" }],
    humidity: 70
  },
  {
    dt: Math.floor(Date.now() / 1000) + 172800,
    temp: { day: 30, min: 25, max: 31 },
    weather: [{ main: "Clouds", description: "berawan", icon: "02d" }],
    humidity: 75
  },
  {
    dt: Math.floor(Date.now() / 1000) + 259200,
    temp: { day: 29, min: 24, max: 30 },
    weather: [{ main: "Rain", description: "hujan ringan", icon: "10d" }],
    humidity: 80
  },
  {
    dt: Math.floor(Date.now() / 1000) + 345600,
    temp: { day: 30, min: 25, max: 31 },
    weather: [{ main: "Clouds", description: "awan tersebar", icon: "03d" }],
    humidity: 73
  },
  {
    dt: Math.floor(Date.now() / 1000) + 432000,
    temp: { day: 31, min: 26, max: 32 },
    weather: [{ main: "Clear", description: "cerah", icon: "01d" }],
    humidity: 68
  }
];

export const getWeatherData = async (city, units = 'metric') => {
  console.log('Mengambil data cuaca untuk:', city, 'dengan API key:', API_KEY ? 'Ada' : 'Tidak ada');
  
  // Coba pakai API asli dulu
  if (API_KEY && API_KEY !== 'demo_key' && !API_KEY.includes('example')) {
    try {
      console.log('Menggunakan API OpenWeatherMap...');
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          appid: API_KEY,
          units: units,
          lang: 'id'
        },
        timeout: 5000 // timeout 5 detik
      });
      console.log('Data diterima dari API:', response.data.name);
      return response.data;
    } catch (error) {
      console.warn('API Error, fallback ke data mock:', error.message);
      // Lanjut ke data mock
    }
  }
  
  // Fallback ke data mock
  console.log('Menggunakan data mock untuk:', city);
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const mockData = { ...mockWeatherData };
  mockData.name = city;
  mockData.main.temp = 28 + Math.floor(Math.random() * 5);
  mockData.main.feels_like = mockData.main.temp + 3;
  mockData.main.temp_min = mockData.main.temp - 2;
  mockData.main.temp_max = mockData.main.temp + 2;
  mockData.main.humidity = 70 + Math.floor(Math.random() * 20);
  
  // Random weather
  const conditions = [
    { main: "Clear", desc: "cerah", icon: "01d" },
    { main: "Clouds", desc: "berawan", icon: "02d" },
    { main: "Rain", desc: "hujan ringan", icon: "10d" },
    { main: "Thunderstorm", desc: "badai petir", icon: "11d" },
    { main: "Snow", desc: "salju", icon: "13d" }
  ];
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
  mockData.weather[0] = {
    main: randomCondition.main,
    description: randomCondition.desc,
    icon: randomCondition.icon
  };
  
  // Random wind
  mockData.wind.speed = 2 + Math.random() * 5;
  mockData.wind.deg = Math.floor(Math.random() * 360);
  
  if (units === 'imperial') {
    mockData.main.temp = Math.round((mockData.main.temp * 9/5) + 32);
    mockData.main.feels_like = Math.round((mockData.main.feels_like * 9/5) + 32);
    mockData.main.temp_min = Math.round((mockData.main.temp_min * 9/5) + 32);
    mockData.main.temp_max = Math.round((mockData.main.temp_max * 9/5) + 32);
  }
  
  return mockData;
};

export const getForecastData = async (city, units = 'metric') => {
  console.log('Mengambil forecast untuk:', city);
  
  // Untuk forecast, OpenWeatherMap butuh endpoint khusus (biasanya butuh subscription)
  // Kita pakai mock data saja dulu
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Generate forecast mock data
  const forecasts = [];
  for (let i = 1; i <= 5; i++) {
    const baseTemp = 28 + Math.floor(Math.random() * 5);
    const conditions = [
      { main: "Clear", desc: "cerah", icon: "01d" },
      { main: "Clouds", desc: "berawan", icon: "02d" },
      { main: "Rain", desc: "hujan ringan", icon: "10d" }
    ];
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    
    let tempDay = baseTemp;
    let tempMin = baseTemp - 2;
    let tempMax = baseTemp + 2;
    
    if (units === 'imperial') {
      tempDay = Math.round((tempDay * 9/5) + 32);
      tempMin = Math.round((tempMin * 9/5) + 32);
      tempMax = Math.round((tempMax * 9/5) + 32);
    }
    
    forecasts.push({
      dt: Math.floor(Date.now() / 1000) + (i * 86400),
      temp: {
        day: tempDay,
        min: tempMin,
        max: tempMax
      },
      weather: [{
        main: randomCondition.main,
        description: randomCondition.desc,
        icon: randomCondition.icon
      }],
      humidity: 70 + Math.floor(Math.random() * 20)
    });
  }
  
  return forecasts;
};