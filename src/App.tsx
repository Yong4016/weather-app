import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Selector from './component/Selector';
import Weather from './component/Weather';
import { WeatherData } from './type/type';
import ClipLoader from 'react-spinners/ClipLoader';

function App() {
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string>('');
  const cities = ['Sydney', 'Paris', 'London', 'New York'];
  const API_KEY = process.env.REACT_APP_API_KEY;

  const getWeatherByCoords = async (lat: number, lon: number) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    setLoading(true);
    const response = await fetch(url);
    const data: WeatherData = await response.json();
    setWeather(data);
    setLoading(false);
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      getWeatherByCoords(latitude, longitude);
    });
  };

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    setLoading(true);
    const response = await fetch(url);
    const data: WeatherData = await response.json();
    setWeather(data);
    setLoading(false);
  };

  const handleCityChange = (city: string) => {
    if (city === 'current') {
      setCity('');
    } else {
      setCity(city);
    }
  };

  useEffect(() => {
    if (city === '') {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <>
      {loading ? (
        <div className='container'>
          <ClipLoader
            color='#f88c6b'
            loading={loading}
            size={150}
            aria-label='Loading Spinner'
          />
        </div>
      ) : (
        <div className='container'>
          <Weather weather={weather} />
          <Selector
            cities={cities}
            setCity={setCity}
            handleCityChange={handleCityChange}
          />
        </div>
      )}
    </>
  );
}

export default App;
