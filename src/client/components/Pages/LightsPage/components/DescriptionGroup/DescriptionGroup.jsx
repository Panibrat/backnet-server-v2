import React from 'react';
import PropTypes from 'prop-types';

import { DescriptionContainer } from './DescriptionContainer';
import { PointDescription } from './PointDescription';
import { PointName } from './PointName';

export const DescriptionGroup = ({ name, description }) => {
  return (
    <>
      <DescriptionContainer>
        <PointName>
          {name}
        </PointName>
        <PointDescription>
          {description}
        </PointDescription>
      </DescriptionContainer>
    </>
  );
};

DescriptionGroup.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
