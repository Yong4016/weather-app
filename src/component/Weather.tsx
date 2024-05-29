import React from 'react';
import { WeatherDataProps } from '../type/type';

const Weather = ({ weather }: WeatherDataProps) => {
  if (!weather) {
    return null;
  }

  const {
    name: city,
    main: { temp, feels_like, temp_min, temp_max },
    weather: [{ description }],
  } = weather;

  return (
    <div className='weather-box'>
      <h1>{city}</h1>
      <h3 style={{marginBottom: '32px'}}>{description.toUpperCase()}</h3>
      <h3>{temp.toFixed(1)} &#8451;</h3>
      <h3>Feels like: {feels_like.toFixed(1)} &#8451;</h3>
     <div style={{display: 'flex', gap: '12px'}}>
       <h5>Low: {temp_min.toFixed(1)} &#8451;</h5>
       <h5>High: {temp_max.toFixed(1)} &#8451;</h5>
     </div>
      
    </div>
  );
};

export default Weather;
