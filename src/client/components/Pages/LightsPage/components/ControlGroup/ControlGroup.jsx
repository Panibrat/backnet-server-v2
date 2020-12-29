import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';

import { ActionGroup } from '../ActionGroup/ActionGroup';
import { ControlGroupContainer } from './ControlGroupContainer';
import { DescriptionGroup } from '../DescriptionGroup/DescriptionGroup';
import { CustomIcon } from '../CustomIcon/CustomIcon';
import { SetterGroup } from '../SetterGroup/SetterGroup';
import { StatusGroup } from '../StatusGroup/StatusGroup';
import { SwitchGroup } from '../SwitchGroup/SwitchGroup';

export const ControlGroup = ({
  iconSrc,
  actionIconSrc,
  action,
  name,
  value,
  description,
  unit,
  switcher,
  setter,
  checked,
}) => (
  <>
    <ControlGroupContainer>
      <CustomIcon src={iconSrc}/>
      <DescriptionGroup name={name} description={description}/>
      <StatusGroup value={value} unit={unit}/>
      {
        actionIconSrc && action && <ActionGroup src={actionIconSrc} action={action}/>
      }
      {
        switcher &&
        <SwitchGroup checked={checked} action={action}/>
      }
      {
        setter &&
        <SetterGroup action={action}/>
      }
    </ControlGroupContainer>
  </>
);

ControlGroup.propTypes = {
  iconSrc: PropTypes.string,
  name: PropTypes.string,
  value: oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
  ]),
  description: PropTypes.string,
  unit: PropTypes.string,
  actionIconSrc: PropTypes.string,
  action: PropTypes.func,
  switcher: PropTypes.bool,
  setter: PropTypes.bool,
  checked: PropTypes.bool,
};
