import React from 'react';
import Button from 'react-bootstrap/Button';
import { SelectorProps } from '../type/type';

const Selector = ({ cities, setCity, handleCityChange }: SelectorProps) => {
  return (
    <div className='selectors'>
      <Button
        variant='primary'
        onClick={() => handleCityChange('current')}
      >
        Current Location
      </Button>
      {cities.map((city, index) => (
        <Button
          variant='primary'
          key={index}
          onClick={() => {
            setCity(city);
          }}
        >
          {city}
        </Button>
      ))}
    </div>
  );
};

export default Selector;
