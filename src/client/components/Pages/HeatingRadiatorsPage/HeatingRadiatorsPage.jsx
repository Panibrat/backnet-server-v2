import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';

import SocketIO from '../../../services/SocketService';
import { setTitle } from '../../../store/actions/menuActions';
import { setActiveArea } from '../../../store/actions/plansViewActions';
import { getAIbyId, getBIbyId } from '../../../store/selectors/selectors';
import HeatingRadiatorsLeft from '../../Animated/Pages/HeatingRadiatorsLeft/HeatingRadiatorsLeft';
import HeatingRadiatorsRight from '../../Animated/Pages/HeatingRadiatorsRight/HeatingRadiatorsRight';
import { ControlContainer } from '../../ControlContainer';
import { defaultAIData, defaultBOData } from '../constants';
import { pagePointsConfig } from './pagePointsConfig';

import styles from './HeatingRadiatorsPage.css';

export const HeatingRadiatorsPage = () => {
  const dispatch = useDispatch();
  const [isRightHeatingRadiatorsShown, setRightHeatingRadiatorsShow] = useState(true);

  useEffect(() => {
        dispatch(setTitle('Радиаторы (Родители)'));
        dispatch(setActiveArea('heatingRadiatorsRight'));
        SocketIO.setRequestedPointsToBuffer(pagePointsConfig);
  }, [dispatch]);

  const toggleHeatingRadiators = () => {
    const title = isRightHeatingRadiatorsShown ? 'Радиаторы (Л)' : 'Радиаторы (Родители)';

    dispatch(setTitle(title));

    if (isRightHeatingRadiatorsShown) {
        dispatch(setActiveArea('heatingRadiatorsLeft'));
    } else {
        dispatch(setActiveArea('heatingRadiatorsRight'));
    }

    setRightHeatingRadiatorsShow(!isRightHeatingRadiatorsShown);
  };

  const iT_SO_FO_RIGHT = useSelector(getAIbyId('AI3000159')) || defaultAIData;
  const oSP_SO_RIGHT = useSelector(getAIbyId('AI3000169')) || defaultAIData;
  const oHEAT_SO_RIGHT = useSelector(getAIbyId('AI3000161')) || defaultAIData;
  const iT_KITCHEN_RIGHT = useSelector(getAIbyId('AI3000160')) || defaultAIData;
  const iT_ZAL_RIGHT = useSelector(getAIbyId('AI3000172')) || defaultAIData;
  const iT_CABINET_RIGHT = useSelector(getAIbyId('AI3000187')) || defaultAIData;
  const iT_BEDROOM_RIGHT = useSelector(getAIbyId('AI3000179')) || defaultAIData;

  const oSO_ZAL_RIGHT = useSelector(getAIbyId('AI3000164')) || defaultAIData;
  const oSO_KITCH_RIGHT = useSelector(getAIbyId('AI3000163')) || defaultAIData;
  const oSO_BEDROOM_RIGHT = useSelector(getAIbyId('AI3000165')) || defaultAIData;
  const oSO_CABINET_RIGHT = useSelector(getAIbyId('AI3000166')) || defaultAIData;
  const oSO_BASE_RIGHT = { value: 0 };

  const oPUMP_SO_RIGHT = useSelector(getBIbyId('BI3000247')) || defaultBOData;

  const iT_SO_FO_LEFT = useSelector(getAIbyId('AI3000776')) || defaultAIData;
  const oSP_SO_LEFT = useSelector(getAIbyId('AI3000795')) || defaultAIData;
  const oHEAT_SO_LEFT = useSelector(getAIbyId('AI3000780')) || defaultAIData;

  const temperatureCabinetLeft = useSelector(getAIbyId('AI3000772')) || defaultAIData;
  const temperatureBedroomLeft = useSelector(getAIbyId('AI3000773')) || defaultAIData;
  const temperatureD2 = useSelector(getAIbyId('AI3000769')) || defaultAIData;
  const temperatureD1 = useSelector(getAIbyId('AI3000767')) || defaultAIData;
  const temperatureKitchenLeft = useSelector(getAIbyId('AI3000778')) || defaultAIData;
  const temperatureZalLeft = useSelector(getAIbyId('AI3000870')) || defaultAIData;

  const oSO_CABINET_LEFT = useSelector(getAIbyId('AI3000782')) || defaultAIData;
  const oSO_BEDROOM_LEFT = useSelector(getAIbyId('AI3000783')) || defaultAIData;
  const oSO_D2 = useSelector(getAIbyId('AI3000784')) || defaultAIData;
  const oSO_D1 = useSelector(getAIbyId('AI3000785')) || defaultAIData;
  const oSO_KITCH_LEFT = useSelector(getAIbyId('AI3000786')) || defaultAIData;
  const oSO_ZAL_LEFT = useSelector(getAIbyId('AI3000788')) || defaultAIData;
  const oSO_BASE_LEFT = useSelector(getAIbyId('AI3000787')) || defaultAIData;

  const oPUMP_SO_LEFT = useSelector(getBIbyId('BI3000818')) || defaultBOData;

  return (
    <div className={styles.container}>
      {
          isRightHeatingRadiatorsShown ?
            <HeatingRadiatorsRight
              oPUMP={oPUMP_SO_RIGHT}
              oHEAT={oHEAT_SO_RIGHT}
              iT_FOR={iT_SO_FO_RIGHT}
              SP_T_FOR={oSP_SO_RIGHT}
              iT_ZAL={iT_ZAL_RIGHT}
              iT_KITCHEN={iT_KITCHEN_RIGHT}
              iT_BEDROOM={iT_BEDROOM_RIGHT}
              iT_CABINET={iT_CABINET_RIGHT}
              VLV_ZAL={oSO_ZAL_RIGHT}
              VLV_KITCHEN={oSO_KITCH_RIGHT}
              VLV_BEDROOM={oSO_BEDROOM_RIGHT}
              VLV_CABINET={oSO_CABINET_RIGHT}
              VLV_BASE={oSO_BASE_RIGHT}
            />
            :
            <HeatingRadiatorsLeft
              oPUMP={oPUMP_SO_LEFT}
              oHEAT={oHEAT_SO_LEFT}
              iT_FOR={iT_SO_FO_LEFT}
              SP_T_FOR={oSP_SO_LEFT}
              iT_ZAL={temperatureZalLeft}
              iT_KITCHEN={temperatureKitchenLeft}
              iT_BEDROOM={temperatureBedroomLeft}
              iT_CABINET={temperatureCabinetLeft}
              iT_D1={temperatureD1}
              iT_D2={temperatureD2}
              VLV_ZAL={oSO_ZAL_LEFT}
              VLV_KITCHEN={oSO_KITCH_LEFT}
              VLV_BEDROOM={oSO_BEDROOM_LEFT}
              VLV_CABINET={oSO_CABINET_LEFT}
              VLV_D1={oSO_D1}
              VLV_D2={oSO_D2}
              VLV_BASE={oSO_BASE_LEFT}
            />
      }
      <Button
        style={{ margin: '15px' }}
        variant="contained"
        color="primary"
        onClick={toggleHeatingRadiators}
      >
        {isRightHeatingRadiatorsShown ? 'На Радиаторы (Л)' : 'На Радиаторы (Родители)'}
      </Button>
      <ControlContainer/>
    </div>
  );
};
