import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTitle } from '../../../store/actions/menuActions';

import HeatStationUnit from '../../Animated/Pages/HeatStationUnit/HeatStationUnit';
import { getAIbyId, getBIbyId, getBObyId } from '../../../store/selectors/selectors';
import SocketIO from '../../../services/SocketService';
import { defaultAIData, defaultBOData } from '../constants';
import { AnalogInputControl } from '../LightsPage/components/AnalogInputControl/AnalogInputControl';
import { BinaryInputControl } from '../LightsPage/components/BinaryInputControl/BinaryInputControl';
import { BinaryOutputControl } from '../LightsPage/components/BinaryOutputControl/BinaryOutputControl';
import { pagePointsConfig } from './pagePointsConfig';
import styles from './HeatStationPage.css';

export const HeatStationPage = () => {
  const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Котельная'));
        SocketIO.setRequestedPointsToBuffer(pagePointsConfig);
    }, [dispatch]);

    const iT_SUP = useSelector(getAIbyId('AI3000157')) || defaultAIData;
    const iT_RET = useSelector(getAIbyId('AI3000158')) || defaultAIData;
    const oSP_KOT = useSelector(getAIbyId('AI3000171')) || defaultAIData;

    const oPUMP_EL = useSelector(getBIbyId('BI3000279')) || defaultBOData;
    const oKOTEL = useSelector(getBIbyId('BI3000249')) || defaultBOData;
    const oEL_1X = useSelector(getBIbyId('BI3000278')) || defaultBOData;
    const oEL_2X = useSelector(getBIbyId('BI3000277')) || defaultBOData;

    const sEL_KOTEL = useSelector(getBObyId('BO3000248')) || defaultBOData;

    return (
      <div className={styles.container}>
        <HeatStationUnit
          oKOTEL={oKOTEL}
          oEL_1X={oEL_1X}
          oEL_2X={oEL_2X}
          oPUMP_EL={oPUMP_EL}
          oSP_KOT={oSP_KOT}
          iT_SUP={iT_SUP}
          iT_RET={iT_RET}
        />
        <BinaryOutputControl type='offOn' data={sEL_KOTEL}/>

        <AnalogInputControl type='temperature' data={oSP_KOT}/>
        <AnalogInputControl type='temperature' data={iT_SUP}/>
        <AnalogInputControl type='temperature' data={iT_RET}/>

        <BinaryInputControl type='offOn' data={oKOTEL}/>
        <BinaryInputControl type='offOn' data={oPUMP_EL}/>
        <BinaryInputControl type='offOn' data={oEL_1X}/>
        <BinaryInputControl type='offOn' data={oEL_2X}/>
      </div>
    );
};
