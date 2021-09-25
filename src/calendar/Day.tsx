import React from 'react';
import { Card, CardContent } from '@mui/material';
import dateFromUTCSeconds from '../date-functions/dateFromUtcSeconds';
import WeatherData from '../weather-data/WeatherData';
import { Email, Person, Phone, Textsms } from '@mui/icons-material';

interface DayProps {
  day: Date;
  hour: number;
  weatherData: WeatherData[];
}

enum ContactMethod {
  text = 'Text',
  email = 'Email',
  phone = 'Phone',
  any = 'Any',
}

const Day = ({ day, hour, weatherData }: DayProps) => {

  const getHourlyWeatherData = () => {
    for (let i = 0; i < weatherData.length; i += 1) {
      if (!weatherData[i + 1]) {
        return weatherData[i];
      } else {
        const nextWeatherDataHour = dateFromUTCSeconds(weatherData[i + 1].dt).getHours();
        if (nextWeatherDataHour > hour) {
          return weatherData[i];
        }
      }
    }
    return weatherData[weatherData.length - 1];
  }

  const hourlyWeatherData = getHourlyWeatherData();

  const getContactMethod = () => {
    const skies = hourlyWeatherData.weather[0].main;
    const temp = parseFloat(hourlyWeatherData.main.temp);
    if (skies === "Clear" && temp > 75) {
      return ContactMethod.text;
    } else if (temp >= 55 && temp <= 75) {
      return ContactMethod.email;
    } else if (temp < 55 && skies === 'Rain') {
      return ContactMethod.phone;
    }
    return ContactMethod.any;
  }

  const contactMethod = getContactMethod();

  const getContactMethodIcon = () => {
    switch (contactMethod) {
      case ContactMethod.text:
        return <Textsms/>
      case ContactMethod.email:
        return <Email/>;
      case ContactMethod.phone:
        return <Phone/>;
      default:
        return <Person/>;
    }
  }

  return <div className="mb-3">
    <Card>
      <CardContent>
        <p>{day.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
        <p><i>{`${hourlyWeatherData.main.temp}\u00b0F and ${hourlyWeatherData.weather[0].main}`}</i></p>
        <p>
          {getContactMethodIcon()}
          <b>{contactMethod}</b>
        </p>
      </CardContent>
    </Card>
  </div>;
}

export default Day;
