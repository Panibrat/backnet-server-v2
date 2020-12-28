import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';

import SocketIO from '../../../services/SocketService';
import { setTitle } from '../../../store/actions/menuActions';
import { setActiveArea } from '../../../store/actions/plansViewActions';
import { getAIbyId, getBIbyId } from '../../../store/selectors/selectors';
import HeatFloorRight from '../../Animated/Pages/HeatFloorRight/HeatFloorRight';
import HeatFloorLeft from '../../Animated/Pages/HeatFloorLeft/HeatFloorLeft';
import { ControlContainer } from '../../ControlContainer';
import { pagePointsConfig } from '../BoilerPage/pagePointsConfig';
import { defaultAIData, defaultBOData } from '../constants';

import styles from './HeatFloorsPage.css';

export const HeatFloorsPage = () => {
  const dispatch = useDispatch();
  const [isRightHeatFloorShown, setRightHeatFloorShown] = useState(true);

    useEffect(() => {
        dispatch(setTitle('Теплый пол (Родители)'));
        dispatch(setActiveArea('heatFloorRight'));
        SocketIO.setRequestedPointsToBuffer(pagePointsConfig);
    }, [dispatch]);

    const toggleHeatFloor = () => {
      const title = isRightHeatFloorShown ? 'Теплый пол (Л)' : 'Теплый пол (Родители)';

        dispatch(setTitle(title));

        if (isRightHeatFloorShown) {
            dispatch(setActiveArea('heatFloorLeft'));
        } else {
            dispatch(setActiveArea('heatFloorRight'));
        }

        setRightHeatFloorShown(!isRightHeatFloorShown);
    };

    const iT_HF_FO_RIGHT = useSelector(getAIbyId('AI3000178')) || defaultAIData;
    const oSP_HF_RIGHT = useSelector(getAIbyId('AI3000181')) || defaultAIData;
    const oHEAT_HF_RIGHT = useSelector(getAIbyId('AI3000182')) || defaultAIData;
    const temperatureHFKitchenRight = useSelector(getAIbyId('AI3000177')) || defaultAIData;
    const temperatureKitchenRight = useSelector(getAIbyId('AI3000160')) || defaultAIData;

    const oPUMP_HF_RIGHT = useSelector(getBIbyId('BI3000261')) || defaultBOData;

    const iT_HF_FO_LEFT = useSelector(getAIbyId('AI3001170')) || defaultAIData;
    const oSP_HF_LEFT = useSelector(getAIbyId('AI3001175')) || defaultAIData;
    const oHEAT_HF_LEFT = useSelector(getAIbyId('AI3001182')) || defaultAIData;

    const temperatureKitchenLeft = useSelector(getAIbyId('AI3000778')) || defaultAIData;
    const temperatureZalLeft = useSelector(getAIbyId('AI3000870')) || defaultAIData;
    const temperatureHFKitchenLeft = useSelector(getAIbyId('AI3001164')) || defaultAIData;
    const temperatureHFHallLeft = useSelector(getAIbyId('AI3001165')) || defaultAIData;
    const temperatureHFWC1Left = useSelector(getAIbyId('AI3001166')) || defaultAIData;
    const temperatureHFWC2Left = useSelector(getAIbyId('AI3001167')) || defaultAIData;
    const temperatureHFZal_R_Left = useSelector(getAIbyId('AI3001168')) || defaultAIData;
    const temperatureHFZal_L_Left = useSelector(getAIbyId('AI3001169')) || defaultAIData;

    const valveHF_kitchen_Left = useSelector(getAIbyId('AI3001176')) || defaultAIData;
    const valveHF_hall_Left = useSelector(getAIbyId('AI3001177')) || defaultAIData;
    const valveHF_WC1_Left = useSelector(getAIbyId('AI3001178')) || defaultAIData;
    const valveHF_WC2_Left = useSelector(getAIbyId('AI3001179')) || defaultAIData;
    const valveHF_zal_Right = useSelector(getAIbyId('AI3001181')) || defaultAIData;
    const valveHF_zal_Left = useSelector(getAIbyId('AI3001180')) || defaultAIData;

    const oPUMP_HF_LEFT = useSelector(getBIbyId('BI3001240')) || defaultBOData;

    return (
      <div className={styles.container}>
        {
              isRightHeatFloorShown ?
                <HeatFloorRight
                  oPUMP={oPUMP_HF_RIGHT}
                  oHEAT={oHEAT_HF_RIGHT}
                  iT_FOR={iT_HF_FO_RIGHT}
                  SP_T_FOR={oSP_HF_RIGHT}
                  iT_HF_KITCHEN={temperatureHFKitchenRight}
                  iT_KITCHEN={temperatureKitchenRight}
                />
                :
                <HeatFloorLeft
                  oPUMP={oPUMP_HF_LEFT}
                  oHEAT={oHEAT_HF_LEFT}
                  iT_FOR={iT_HF_FO_LEFT}
                  SP_T_FOR={oSP_HF_LEFT}
                  iT_KITCHEN={temperatureKitchenLeft}
                  iT_HF_KITCHEN={temperatureHFKitchenLeft}
                  iT_HF_HALL={temperatureHFHallLeft}
                  iT_HF_WC1={temperatureHFWC1Left}
                  iT_HF_WC2={temperatureHFWC2Left}
                  iT_HF_ZAL_R={temperatureHFZal_R_Left}
                  iT_HF_ZAL_L={temperatureHFZal_L_Left}
                  iT_ZAL={temperatureZalLeft}
                  oVLV_KITCHEN={valveHF_kitchen_Left}
                  oVLV_HALL={valveHF_hall_Left}
                  oVLV_WC1={valveHF_WC1_Left}
                  oVLV_WC2={valveHF_WC2_Left}
                  oVLV_ZAL_R={valveHF_zal_Right}
                  oVLV_ZAL_L={valveHF_zal_Left}
                />
        }
        <Button
          style={{ margin: '15px' }}
          variant="contained"
          color="primary"
          onClick={toggleHeatFloor}
        >
          {isRightHeatFloorShown ? 'На Теплый пол (Л)' : 'На Теплый пол (Родители)'}
        </Button>
        <ControlContainer/>
      </div>
    );
};
