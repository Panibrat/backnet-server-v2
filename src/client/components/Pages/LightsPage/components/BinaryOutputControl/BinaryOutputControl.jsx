import React, { useEffect, useState, memo } from 'react';
//import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

//import { updateBO } from '../../../../../store/actions/BinaryOutputActions';
import SocketIO from '../../../../../services/SocketService';
import pc from './images/pc.svg';
import coolingImg from './images/snowflake.svg';
import heatingImg from './images/sun2.svg';
import thermostat from './images/thermostat.svg';
import powerOffButtonIcon from './images/power-off.svg';
import powerOnButtonIcon from './images/power-on.svg';
import { ControlGroup } from '../ControlGroup/ControlGroup';

const iconsConfig = {
  offOn: [powerOffButtonIcon, powerOnButtonIcon],
  coolHeat: [coolingImg, heatingImg],
  control: [thermostat, pc],
};

export const BinaryOutputControl = memo(
  ({ type, data }) => {
    const { description = '', name = '', units = '', value = false, title } = data;

    const [itemValue, setItemValue] = useState(false);
    //const dispatch = useDispatch();

    const handleSwitch = () => {
      setItemValue((prevValue) => {
        // dispatch(updateBO({ ...data, value: !prevValue })); // TODO: DELETE before upload to PROD!!!

        SocketIO.writeBO({
          title,
          value: !prevValue,
        });

        return !prevValue;
      });
    };

    useEffect(() => {
      if (value !== itemValue) {
        setItemValue(value);
      }
    }, [value]);

    return (
      <>
        <ControlGroup
          iconSrc={value ? iconsConfig[type][1] : iconsConfig[type][0]}
          name={name}
          description={description}
          value={itemValue ? units[1] : units[0]}
          switcher
          checked = {!!itemValue}
          action={handleSwitch}
        />
      </>
    );
  });

BinaryOutputControl.propTypes = {
  data: PropTypes.any.isRequired,
  type: PropTypes.oneOf(['offOn', 'coolHeat', 'control']),
};
