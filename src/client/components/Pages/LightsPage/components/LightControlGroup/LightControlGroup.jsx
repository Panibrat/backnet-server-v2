import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';

import SocketIO from '../../../../../services/SocketService';
import { ControlGroupContainer } from '../ControlGroup/ControlGroupContainer';
import { CustomIcon } from '../CustomIcon/CustomIcon';
import { DescriptionContainer } from '../DescriptionGroup/DescriptionContainer';
import { PointDescription } from '../DescriptionGroup/PointDescription';
import { PointName } from '../DescriptionGroup/PointName';
import { ActionButtonContainer } from './ActionButtonContainer';
import { ActionVerticalGroupContainer } from './ActionVerticalGroupContainer';
import lightOnSrc from '../../light-bulb-on.svg';
import lightOffSrc from '../../light-bulb-off.svg';
import { HeaderActionsContainer } from './HeaderActionsContainer';
import { SelectWrapper } from './SelectWrapper';

export const LightControlGroup = ({
  setLightPointData,
  setAutoPointData,
  realValuePointData,
}) => {

  const dispatch = useDispatch();

  useEffect(() => {
    const realOut = realValuePointData.value;
    const spPoint = setAutoPointData.value;

    if (realOut !== spPoint) {
      SocketIO.writeBO({
        title: setLightPointData.title,
        value: realOut,
      });
    }

  }, [dispatch, realValuePointData.value, setAutoPointData.value, setLightPointData.title]);

  const handleOn = () => {
    SocketIO.writeBO({
      title: setLightPointData.title,
      value: 1,
    });
  };

  const handleOff = () => {
    SocketIO.writeBO({
      title: setLightPointData.title,
      value: 0,
    });
  };

  const handleSelect = (e) => {
    e.preventDefault();

    SocketIO.writeBO({
      title: setAutoPointData.title,
      value: e.target.value,
    });
  };

  return (
    <>
      <ControlGroupContainer>
        <ActionVerticalGroupContainer>
          <HeaderActionsContainer>
            <CustomIcon src={ realValuePointData.value ? lightOnSrc : lightOffSrc }/>
            <DescriptionContainer>
              <PointName>
                {realValuePointData.name}
              </PointName>
              <PointDescription>
                {realValuePointData.description}
              </PointDescription>
            </DescriptionContainer>
          </HeaderActionsContainer>
          <ActionButtonContainer>
            <Button variant="contained" color='primary' onClick={handleOn}>
              On
            </Button>
            <Button variant="contained" color='secondary' onClick={handleOff}>
              Off
            </Button>
            <SelectWrapper>
              <Select
                displayEmpty
                value={setAutoPointData.value}
                onChange={handleSelect}
              >
                <MenuItem value={0}>{setAutoPointData.units[0]}</MenuItem>
                <MenuItem value={1}>{setAutoPointData.units[1]}</MenuItem>
              </Select>
            </SelectWrapper>
          </ActionButtonContainer>
        </ActionVerticalGroupContainer>
      </ControlGroupContainer>
    </>
  );
};

LightControlGroup.propTypes = {
  setLightPointData: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    value: PropTypes.number,
  }),
  setAutoPointData: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    units: PropTypes.array,
    value: PropTypes.number,
  }),
  realValuePointData: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    value: PropTypes.number,
  }),
};
