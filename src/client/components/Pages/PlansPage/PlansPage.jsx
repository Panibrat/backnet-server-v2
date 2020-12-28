import React, { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';

import { FirstFloorItem } from './FirstFloorItem';
import { SecondFloorItem } from './SecondFloorItem';
import { ControlContainer } from '../../ControlContainer';
import { setTitle } from '../../../store/actions/menuActions';
import styles from './PlansPage.css';

export const PlansPage = () => {
  const dispatch = useDispatch();

  const [isFirstFloorShown, setShowFirstFloor] = useState(true);

    useEffect(() => {
      const title = isFirstFloorShown ? 'Первый этаж' : 'Второй этаж';

        dispatch(setTitle(title));
    }, [dispatch, isFirstFloorShown]);

    const toggleFloor = () => {
        setShowFirstFloor(!isFirstFloorShown);
    };

    return (
      <div className={styles.container}>
        {isFirstFloorShown ? <FirstFloorItem/> : <SecondFloorItem/>}
        <Button variant="contained" color="primary" onClick={toggleFloor}>
          {isFirstFloorShown ? 'На Второй этаж' : 'На Первый этаж'}
        </Button>
        <ControlContainer/>
      </div>
    );
};

export default memo(PlansPage);
