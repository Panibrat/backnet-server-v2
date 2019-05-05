import React from 'react';
import List from '@material-ui/core/List';
import { AnalogInputItem } from '../AnalogInputItem/AnalogInputItem';
import { BinaryInputItem } from '../BinaryInputItem/BinaryInputItem';
import  BinaryOutputItem  from '../BinaryOutputItem/BinaryOutputItem';
import { AnalogOutputItemSlider } from '../AnalogOutputItemSlider/AnalogOutputItemSlider';

import styles from './ControlContainer.css';

import { controlConfig } from './config';

const ControlContainer = (props) => {
    const {
        activeArea,
        findAi,
        findAo,
        findBi,
        findBo,
    } = props;

    return (
        <div className={styles.container}>
            <List className={styles.list_type}>
                {
                    controlConfig[activeArea] && controlConfig[activeArea].ao.map(item => {
                            const aoPoint = findAo(item);
                            return (
                                <AnalogOutputItemSlider
                                    key={item} {...aoPoint}
                                    stepValue={aoPoint.units === '%' ? 5 : 0.5}
                                />
                            );
                        }
                    )
                }
                {
                    controlConfig[activeArea] && controlConfig[activeArea].bo.map(item => {
                            const boPoint = findBo(item);
                            return ( <BinaryOutputItem key={item} {...boPoint} />);
                        }
                    )
                }
                {
                    controlConfig[activeArea] && controlConfig[activeArea].ai.map(item => {
                            const aiPoint = findAi(item);
                            return ( <AnalogInputItem key={item} {...aiPoint} />);
                        }
                    )
                }
                {
                    controlConfig[activeArea] && controlConfig[activeArea].bi.map(item => {
                            const biPoint = findBi(item);
                            return ( <BinaryInputItem key={item} {...biPoint} />);
                        }
                    )
                }
            </List>
        </div>
    )
};

export default ControlContainer;
