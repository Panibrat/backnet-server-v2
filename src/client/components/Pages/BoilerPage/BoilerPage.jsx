import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';

import SocketIO from '../../../services/SocketService';
import { setTitle } from '../../../store/actions/menuActions';
import { setActiveArea } from '../../../store/actions/plansViewActions';
import { getAIbyId, getAObyId, getBIbyId, getBObyId } from '../../../store/selectors/selectors';
import BoilerUnit from '../../Animated/Pages/BoilerUnit/BoilerUnit';
import { ControlContainer } from '../../ControlContainer';
import { pagePointsConfig } from './pagePointsConfig';
import { defaultAIData, defaultAOData, defaultBOData } from '../constants';

import styles from './BoilerPage.css';

export const BoilerPage = () => {
  const dispatch = useDispatch();
  const [isRightBoilerShown, setRightBoilerShown] = useState(true);

  useEffect(() => {
    dispatch(setTitle('Бойлер ГВС (Родители)'));
    dispatch(setActiveArea('boilerRight'));
    SocketIO.setRequestedPointsToBuffer(pagePointsConfig);
  }, [dispatch]);

  const toggleBoiler = () => {
    const title = isRightBoilerShown ? 'Бойлер ГВС (Л)' : 'Бойлер ГВС (Родители)';

    dispatch(setTitle(title));

    if (isRightBoilerShown) {
      dispatch(setActiveArea('boilerLeft'));
    } else {
      dispatch(setActiveArea('boilerRight'));
    }

    setRightBoilerShown(!isRightBoilerShown);
  };

  const iT_GVS_R = useSelector(getAIbyId('AI3000174')) || defaultAIData;
  const iT_GVS_L = useSelector(getAIbyId('AI3000777')) || defaultAIData;
  const oPUMP_REC_L = useSelector(getAIbyId('AI3000781')) || defaultAIData;

  const sT_GVS_R = useSelector(getAObyId('AO3000209')) || defaultAOData;
  const sT_GVS_L = useSelector(getAObyId('AO3000805')) || defaultAOData;

  const oPUMP_BOY_R = useSelector(getBIbyId('BI3000254')) || defaultBOData;
  const oPUMP_BOY_L = useSelector(getBIbyId('BI3000819')) || defaultBOData;
  const oPUMP_REC_R = useSelector(getBIbyId('BI3000255')) || defaultBOData;
  const oBOYLER_R = useSelector(getBIbyId('BI3000253')) || defaultBOData;
  const oBOYLER_L = useSelector(getBIbyId('BI3000807')) || defaultBOData;

  return (
    <div className={styles.container}>
      {
        isRightBoilerShown ?
          <BoilerUnit
            oPUMP_REC={oPUMP_REC_R}
            oPUMP_BOY={oPUMP_BOY_R}
            oBOYLER={oBOYLER_R}
            iT_GVS={iT_GVS_R}
            sT_GVS={sT_GVS_R}
          />
          :
          <BoilerUnit
            oPUMP_REC={oPUMP_REC_L}
            oPUMP_BOY={oPUMP_BOY_L}
            oBOYLER={oBOYLER_L}
            iT_GVS={iT_GVS_L}
            sT_GVS={sT_GVS_L}
          />
      }
      <Button
        style={{ margin: '15px' }}
        variant="contained"
        color="primary"
        onClick={toggleBoiler}
      >
        {isRightBoilerShown ? 'На Бойлер ГВС (Л)' : 'На Бойлер ГВС (Родители)'}
      </Button>
      <ControlContainer />
    </div>
  );
};
