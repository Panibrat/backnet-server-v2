import React from 'react';
import PropTypes from 'prop-types';

import { ControlGroup } from '../ControlGroup/ControlGroup';
import thermometerIcon from './images/thermometer.svg';
import liquidPressureIcon from './images/pressure-gauge.svg';
import powerImg from './images/renewable-energy.svg';
import waterTapImg from './images/water-tap.svg';
import moneyImg from './images/money.svg';
import meterImg from './images/electric-meter.svg';
import tariffDayImg from './images/solar-plug.svg';
import tariffNightImg from './images/moon.svg';
import voltageImg from './images/voltmeter.svg';
import amperImg from './images/amper-meter.svg';

const iconsConfig = {
  temperature: thermometerIcon,
  airPressure: thermometerIcon,
  liquidPressure: liquidPressureIcon,
  tSetPoint: thermometerIcon,
  funSpeed: thermometerIcon,
  damper: thermometerIcon,
  valve: thermometerIcon,
  power: powerImg,
  waterCounter: waterTapImg,
  money: moneyImg,
  meter: meterImg,
  tariffDay: tariffDayImg,
  tariffNight: tariffNightImg,
  voltage: voltageImg,
  amper: amperImg,
};

export const AnalogInputControl = ({
  type,
  data,
  accuracy = 1,
  divider = 1,
  multiplier = 1,
  unit = '',
}) => {
  const { description = '', name = '', units = '', value = '' } = data;

  const preparedValue = value ? ((multiplier * value) / divider).toFixed(accuracy) : (0).toFixed(
    accuracy);

  return (
    <>
      <ControlGroup
        iconSrc={iconsConfig[ type ]}
        name={name}
        description={description}
        value={preparedValue}
        unit={unit || units}
      />
    </>
  );
};

AnalogInputControl.propTypes = {
  data: PropTypes.any.isRequired,
  accuracy: PropTypes.number,
  divider: PropTypes.number,
  multiplier: PropTypes.number,
  unit: PropTypes.string,
  type: PropTypes.oneOf([
    'temperature',
    'airPressure',
    'liquidPressure',
    'tSetPoint',
    'funSpeed',
    'damper',
    'valve',
    'power',
    'waterCounter',
    'money',
    'meter',
    'tariffDay',
    'tariffNight',
    'voltage',
    'amper',
  ]),
};
