import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SocketIO from '../../../services/SocketService';
import { setTitle } from '../../../store/actions/menuActions';
import { getBIbyId, getBObyId } from '../../../store/selectors/selectors';
import { pagePointsConfig } from './pagePointsConfig';
import { defaultBOData } from '../constants';
import { LightControlGroup } from './components/LightControlGroup';
import { BlindControlGroup } from './components/LightControlGroup/BlindControlGroup';

export const LightsPage = () => {
  const dispatch = useDispatch();

    useEffect(() => {
      dispatch(setTitle('Наружный свет'));
      SocketIO.setRequestedPointsToBuffer(pagePointsConfig);
    }, [dispatch]);

    const sLightOut = useSelector(getBObyId('BO3000873')) || defaultBOData;
    const sLightOutAuto = useSelector(getBObyId('BO3001424')) || defaultBOData;
    const oLightOut = useSelector(getBIbyId('BI3000872')) || defaultBOData;

    const sUpBlind = useSelector(getBObyId('BO3001409')) || defaultBOData;
    const sDownBlind = useSelector(getBObyId('BO3001410')) || defaultBOData;
    const sStopBlind = useSelector(getBObyId('BO3001411')) || defaultBOData;
    const sBlindsAuto = useSelector(getBObyId('BO3001419')) || defaultBOData;

    return (
      <>
        <LightControlGroup
          setLightPointData={sLightOut}
          setAutoPointData={sLightOutAuto}
          realValuePointData={oLightOut}
        />
        <BlindControlGroup
          setUpBlindPointData={sUpBlind}
          setDownBlindPointData={sDownBlind}
          setStopBlindPointData={sStopBlind}
          setAutoPointData={sBlindsAuto}
        />
      </>
    );
};
