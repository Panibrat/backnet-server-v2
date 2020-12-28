import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slider from '@material-ui/core/Slider';

import SocketIO from '../../../../../services/SocketService';
import setTemp from './images/set_temp.svg';
import voltageImg from './images/voltage.svg';
import damperOpenImg from './images/dmpr_hor_open_40x40.svg';
import { ControlGroup } from '../ControlGroup/ControlGroup';
import { DialogValue } from './DialogValue';

const iconsConfig = {
  setTemperature: setTemp,
  setAny: voltageImg,
  damper: damperOpenImg,
};

export const AnalogOutputControl = memo(
  ({ type, data }) => {
    const {
      description = '',
      name = '',
      units = '',
      value = -99,
      title = '',
      minValue = 0,
      maxValue = 100,
      stepValue = 1,
      iconType = '',
    } = data;

    const [itemValue, setItemValue] = useState(value);
    const [open, setOpen] = useState(false);

    const iconSet = type || iconType || 'setAny';

    useEffect(() => {
      setItemValue(value);
    }, [value]);

    const handleDialogOpen = () => {
      setOpen(true);
    };

    const handleDialogClose = () => {
      setOpen(false);
    };

    const handleChange = (e, newValue) => {
      setItemValue(newValue);
    };

    const handleConfirm = () => {

        SocketIO.writeAO({
          title,
          value: itemValue,
        });

      setOpen(false);
    };

    return (
      <>
        <ControlGroup
          iconSrc={iconsConfig[iconSet]}
          name={name}
          description={description}
          value={value?.toFixed(1)}
          setter
          unit={units}
          action={handleDialogOpen}
        />

        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={open}
          onClose={handleConfirm}
        >
          <DialogTitle>Задать значение</DialogTitle>
          <DialogValue>{itemValue?.toFixed(1)}{units}</DialogValue>
          <DialogContent>
            <Slider
              value={itemValue}
              min={minValue}
              max={maxValue}
              marks
              step={stepValue}
              onChange={handleChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirm} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
});

AnalogOutputControl.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    stepValue: PropTypes.number,
    units: PropTypes.string,
    readOnly: PropTypes.bool,
    iconType: PropTypes.string,
    value: PropTypes.number,
  }),
  type: PropTypes.oneOf([
    'setTemperature',
    'setAny',
    'damper',
  ]),
};
