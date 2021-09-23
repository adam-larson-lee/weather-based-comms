import React from 'react';

export interface WeatherData {
  main: {
    temp: string
  }
}

const Day = (props: { weatherData: WeatherData }) =>
  <>
    <p>{props.weatherData.main.temp}</p>
  </>

export default Day;
