import React, { useEffect, useState } from 'react';
import dateFromUTCSeconds from '../date-functions/dateFromUtcSeconds';
import fetchWeatherData from '../weather-data/fetchWeatherData';
import WeatherData from '../weather-data/WeatherData';
import Day from './Day';
import TimeSlider from './TimeSlider';

const Calendar = () => {

  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [hour, setHours] = useState<number>(new Date().getHours());

  useEffect(() => {
      fetchWeatherData().then(setWeatherData);
  }, []);

  const groupWeatherDataByDay = () => {
      const dailyWeatherData: Record<string, WeatherData[]> = {};

      weatherData.forEach((weatherDataPoint) => {
        const date = dateFromUTCSeconds(weatherDataPoint.dt).toDateString();
        if (dailyWeatherData[date]) {
            dailyWeatherData[date].push(weatherDataPoint);
        } else {
          dailyWeatherData[date] = [weatherDataPoint];
        }
      });

      return Object
        .keys(dailyWeatherData)
        .map(date => ({ date: new Date(date), weatherData: dailyWeatherData[date] }))
        .sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  const onTimeChange = (event: Event, value: number | number[]) => setHours(typeof value === 'number' ? value : value[0]);

  return <div className='container'>
      <div className='row mb-3'>
        <TimeSlider
          defaultValue={new Date().getHours()}
          onChange={onTimeChange}
        />
      </div>
      <div className='row'>
        {groupWeatherDataByDay().map((day, i) => {
        if (i < 5) {
          return <div className='col-4'>
            <Day
              day={day.date}
              hour={hour}
              weatherData={day.weatherData}
            />
          </div>;
        }
        return null;
        })}
      </div>
  </div>

};

export default Calendar;
