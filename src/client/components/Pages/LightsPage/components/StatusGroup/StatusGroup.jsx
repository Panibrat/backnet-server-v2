import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';

import { StatusContainer } from './StatusContainer';
import { Unit } from './Unit';
import { Value } from './Value';

export const StatusGroup = ({ value, unit }) => {
  return (
    <>
      <StatusContainer>
        <Value>
          {value}
        </Value>
        {
          unit && <Unit>
            {unit}
          </Unit>
        }
      </StatusContainer>
    </>
  );
};

StatusGroup.propTypes = {
  value: oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  unit: PropTypes.string,
};
