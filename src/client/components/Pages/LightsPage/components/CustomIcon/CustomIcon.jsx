import React from 'react';
import PropTypes from 'prop-types';

import { IconImage } from './IconImage';
import { IconWrapper } from './IconWrapper';

export const CustomIcon = ({ src, action }) => {
  return (
    <>
      <IconWrapper onClick={action}>
        <IconImage src={ src } />
      </IconWrapper>
    </>
  );
};

CustomIcon.propTypes = {
  src: PropTypes.string.isRequired,
  action: PropTypes.func,
};
