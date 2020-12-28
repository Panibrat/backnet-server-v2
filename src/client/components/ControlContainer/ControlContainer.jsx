import React from 'react';
import { useSelector } from 'react-redux';

import { getActiveArea, getAIs, getAOs, getBIs, getBOs } from '../../store/selectors/selectors';
import { AnalogInputControl } from '../Pages/LightsPage/components/AnalogInputControl/AnalogInputControl';
import { AnalogOutputControl } from '../Pages/LightsPage/components/AnalogOutputControl/AnalogOutputControl';
import { BinaryInputControl } from '../Pages/LightsPage/components/BinaryInputControl/BinaryInputControl';
import { BinaryOutputControl } from '../Pages/LightsPage/components/BinaryOutputControl/BinaryOutputControl';
import styles from './ControlContainer.css';
import { controlConfig } from './config';

export const ControlContainer = () => {
  const aos = useSelector(getAOs);
  const bos = useSelector(getBOs);
  const ais = useSelector(getAIs);
  const bis = useSelector(getBIs);
  const activeArea = useSelector(getActiveArea);

  if (
    Object.keys(aos).length === 0 ||
    Object.keys(bos).length === 0 ||
    Object.keys(ais).length === 0 ||
    Object.keys(bis).length === 0 ||
    !activeArea
  ) {
    return null;
  }

  return (
    <div className={styles.container}>
      {
        controlConfig[ activeArea ].ao.map((item) => {
          return (
            <AnalogOutputControl
              key={item}
              data={aos[ item ]}
            />
          );
        },
        )
      }

      {
        controlConfig[ activeArea ].bo.map((item) => {
          return (
            <BinaryOutputControl
              key={item}
              type='offOn'
              data={bos[ item ]}
            />
          );
        },
        )
      }

      {
        controlConfig[ activeArea ].ai.map((item) => {
          return (
            <AnalogInputControl
              key={item}
              type='temperature'
              data={ais[ item ]}
            />
          );
        },
        )
      }

      {
        controlConfig[ activeArea ].bi.map((item) => {
          return (
            <BinaryInputControl
              key={item}
              type='offOn'
              data={bis[ item ]}
            />
          );
        },
        )
      }
    </div>
  );
};
