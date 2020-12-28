
import React from 'react';
import PropTypes from 'prop-types';

import { ActionContainer } from '../ActionGroup/ActionContainer';
import { CustomIcon } from '../CustomIcon/CustomIcon';
import settingsImg from './images/settings.svg';

export const SetterGroup = ({ action }) => {
  return (
    <>
      <ActionContainer>
        <CustomIcon
          action={action}
          src={settingsImg}
        />
      </ActionContainer>
    </>
  );
};

SetterGroup.propTypes = {
  action: PropTypes.func.isRequired,
};
