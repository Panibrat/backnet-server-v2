import React from 'react';
import PropTypes from 'prop-types';

import { ActionContainer } from './ActionContainer';
import { CustomIcon } from '../CustomIcon/CustomIcon';

export const ActionGroup = ({ action, src }) => {
  return (
    <>
      <ActionContainer onClick={action}>
        <CustomIcon src={src} />
      </ActionContainer>
    </>
  );
};

ActionGroup.propTypes = {
  src: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};
