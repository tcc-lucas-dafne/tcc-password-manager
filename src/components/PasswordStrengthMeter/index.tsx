import React from 'react';
import { LinearProgress } from '@mui/material';
import { MeterContainer } from './style';


const strengthColor = (score: number) => {
  switch (score) {
    case 0:
      return "red";
    case 1:
      return "orange";
    case 2:
      return "yellow";
    case 3:
      return "lightgreen";
    case 4:
      return "green";
    default:
      return "red";
  }
};

const PasswordStrengthMeter = ({ strength }: { strength: number }) => (
  <MeterContainer>
    <LinearProgress variant="determinate" value={(strength + 1) * 20} style={{ backgroundColor: strengthColor(strength) }} />
  </MeterContainer>
);

export default PasswordStrengthMeter;