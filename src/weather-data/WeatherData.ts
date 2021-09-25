export default interface WeatherData {
  dt: number;
  main: {
    temp: string
  };
  weather: [{
    main: String,
  }];
}
