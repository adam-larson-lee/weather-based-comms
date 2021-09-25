import React from 'react';
import { Mark, Slider } from '@mui/material';

interface TimeSliderProps {
  defaultValue?: number;
  onChange?: ((event: Event, value: number | number[], activeThumb: number) => void) | undefined;
}

const TimeSlider = ({ onChange, defaultValue }: TimeSliderProps) => {

  const getHourString = (h: number) => `${h === 0 ? 12 : (h > 12 ? h - 12: h)}${h < 12 ? 'AM' : 'PM'}`

  const getMarks = () => {
    const marks: Mark[] = [];

    for (let i = 0; i < 23; i += 1) {
      if (i % 3 === 0) {
        marks.push({
          value: i,
          label: getHourString(i),
        });
      }
    }

    return marks; 
  }

  return <Slider
    defaultValue={defaultValue}
    min={0}
    max={23}
    step={1}
    marks={getMarks()}
    valueLabelDisplay='on'
    valueLabelFormat={getHourString}
    onChange={onChange}
  />;
};

export default TimeSlider;
