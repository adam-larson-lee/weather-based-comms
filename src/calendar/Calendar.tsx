import React, { useEffect, useState } from 'react';
import Day, { WeatherData } from './Day';

const Calendar = () => {

  const [days, setDays] = useState<WeatherData[]>([]);

  useEffect(() => {
      const url = 'http://api.openweathermap.org/data/2.5/forecast?q=minneapolis,us&units=imperial&APPID=09110e603c1d5c272f94f64305c09436';

      const fetchData = async () => {
          try {
              const response = await fetch(url);
              const json = await response.json();
              console.log(json.list);
              setDays(json.list);
          } catch (error) {
              console.log("error", error);
          }
      };

      fetchData();
  }, []);

  return <>
    {days.map((weatherData: WeatherData) => {
      return <Day weatherData={weatherData}/>
    })}
  </>

};

export default Calendar;
