import Switch from '@material-ui/core/Switch';
import React from 'react';
import PropTypes from 'prop-types';

import { ActionContainer } from '../ActionGroup/ActionContainer';

export const SwitchGroup = ({ action, checked }) => {
  return (
    <>
      <ActionContainer>
        <Switch
          checked={checked}
          onChange={action}
          color='primary'
        />
      </ActionContainer>
    </>
  );
};

SwitchGroup.propTypes = {
  checked: PropTypes.bool.isRequired,
  action: PropTypes.func.isRequired,
};
