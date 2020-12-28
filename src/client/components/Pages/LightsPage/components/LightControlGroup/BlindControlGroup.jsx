import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import StopIcon from '@material-ui/icons/Stop';
import React from 'react';
import PropTypes from 'prop-types';
//import { useDispatch } from 'react-redux';
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
import blindsIcon from '../../window-svgrepo-com.svg';
import { HeaderActionsContainer } from './HeaderActionsContainer';
import { SelectWrapper } from './SelectWrapper';

export const BlindControlGroup = ({
  setUpBlindPointData,
  setDownBlindPointData,
  setStopBlindPointData,
  setAutoPointData,
}) => {

  //const dispatch = useDispatch();

  const sendImpulse = (title) => {
    //dispatch(updateBO({ title, value: true })); // TODO: DELETE Line;

    SocketIO.writeBO({
      title,
      value: 1,
    });

    const timeOutId = setTimeout(() => {
      //dispatch(updateBO({ title, value: false })); // TODO: DELETE Line

      SocketIO.writeBO({
        title,
        value: 0,
      });

      clearTimeout(timeOutId);
    }, 3000);
  };

  const handleUp = () => {
      sendImpulse(setUpBlindPointData.title);
  };

  const handleDown = () => {
      sendImpulse(setDownBlindPointData.title);
  };

  const handleStop = () => {
      sendImpulse(setStopBlindPointData.title);
  };

  const handleSelect = (e) => {
    e.preventDefault();
    //dispatch(updateBO({ title: setAutoPointData.title, value: e.target.value })); // TODO: DELETE Line

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
            <CustomIcon src={blindsIcon}/>
            <DescriptionContainer>
              <PointName>
                Штора
              </PointName>
              <PointDescription>
                Управление шторой
              </PointDescription>
            </DescriptionContainer>
          </HeaderActionsContainer>
          <ActionButtonContainer>
            <Button variant="contained" color='primary' onClick={handleUp}>
              <ArrowUpwardIcon />
            </Button>
            <Button variant="contained" color='primary' onClick={handleDown}>
              <ArrowDownwardIcon />
            </Button>
            <Button variant="contained" color='secondary' onClick={handleStop}>
              <StopIcon />
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

BlindControlGroup.propTypes = {
  setUpBlindPointData: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    value: PropTypes.number,
  }),
  setDownBlindPointData: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    value: PropTypes.number,
  }),
  setStopBlindPointData: PropTypes.shape({
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
};
