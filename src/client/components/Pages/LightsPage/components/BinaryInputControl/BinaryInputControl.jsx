import React, { memo } from 'react';
import PropTypes from 'prop-types';

import switchOffIcon from './images/switch.svg';
import switchOnIcon from './images/switchOn.svg';
import warning from './images/warning2.svg';
import ok from './images/ok2.svg';
import { ControlGroup } from '../ControlGroup/ControlGroup';

const iconsConfig = {
  offOn: [switchOffIcon, switchOnIcon],
  normalAlarm: [ok, warning],
};

export const BinaryInputControl = memo(
  ({ type, data }) => {
    const { description = '', name = '', units = ['Off', 'On'], value = '' } = data;

    return (
      <>
        <ControlGroup
          iconSrc={value ? iconsConfig[type][1] : iconsConfig[type][0]}
          name={name}
          description={description}
          value={value ? units[1] : units[0]}
        />
      </>
    );
  });

BinaryInputControl.propTypes = {
  data: PropTypes.any.isRequired,
  type: PropTypes.oneOf([
    'offOn',
    'normalAlarm',
  ]),
};
