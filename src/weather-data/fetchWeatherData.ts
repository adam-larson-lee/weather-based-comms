import WeatherData from "./WeatherData";

const url = 'http://api.openweathermap.org/data/2.5/forecast?q=minneapolis,us&units=imperial&APPID=09110e603c1d5c272f94f64305c09436';

const fetchWeatherData = (): Promise<WeatherData[]> => {
  return fetch(url)
    .then(response => response.json())
    .then(json => json.list)
    .catch((error) => {
      console.log("error", error);
    });
};

export default fetchWeatherData;
