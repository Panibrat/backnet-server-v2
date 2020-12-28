import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SocketIO from '../../../services/SocketService';
import { setTitle } from '../../../store/actions/menuActions';
import { getAIbyId, getAObyId } from '../../../store/selectors/selectors';
import AirDuct from '../../Animated/Pages/AirDuct/AirDuct';
import { pagePointsConfig } from './pagePointsConfig';
import { defaultAIData, defaultAOData } from '../constants';
import { AnalogOutputControl } from '../LightsPage/components/AnalogOutputControl/AnalogOutputControl';
import styles from './DampersPage.css';

export const DampersPage = () => {
  const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Воздушные заслонки'));
        SocketIO.setRequestedPointsToBuffer(pagePointsConfig);
    }, [dispatch]);

    const dpFan = useSelector(getAIbyId('AI3001125')) || defaultAIData;

    const sD_L_K_B = useSelector(getAObyId('AO3001146')) || defaultAOData;
    const sD_D1_D2 = useSelector(getAObyId('AO3001147')) || defaultAOData;
    const sD_R_K_B = useSelector(getAObyId('AO3001148')) || defaultAOData;
    const sD_R_ZAL = useSelector(getAObyId('AO3001149')) || defaultAOData;
    const sD_L_ZAL = useSelector(getAObyId('AO3001150')) || defaultAOData;

    return (
      <div className={styles.container}>
        <AirDuct
          dpFan={dpFan}
          sD_L_K_B={sD_L_K_B}
          sD_D1_D2={sD_D1_D2}
          sD_R_K_B={sD_R_K_B}
          sD_R_ZAL={sD_R_ZAL}
          sD_L_ZAL={sD_L_ZAL}
        />
        <AnalogOutputControl type='damper' data={sD_L_K_B}/>
        <AnalogOutputControl type='damper' data={sD_D1_D2}/>
        <AnalogOutputControl type='damper' data={sD_R_K_B}/>
        <AnalogOutputControl type='damper' data={sD_R_ZAL}/>
        <AnalogOutputControl type='damper' data={sD_L_ZAL}/>
      </div>
    );
};
