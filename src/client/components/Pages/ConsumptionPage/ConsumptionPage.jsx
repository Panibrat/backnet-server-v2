import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SocketIO from '../../../services/SocketService';
import { setTitle } from '../../../store/actions/menuActions';
import {
  getAIbyId,
  getAVbyId,
  getModbusPointById,
} from '../../../store/selectors/selectors';
import { pagePointsConfig } from './pagePointsConfig';
import { defaultAIData, defaultAVData } from '../constants';
import { AnalogInputControl } from '../LightsPage/components/AnalogInputControl/AnalogInputControl';
import styles from './ConsumptionPage.css';

export const ConsumptionPage = () => {
  const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Потребление ресурсов'));
        SocketIO.setRequestedPointsToBuffer(pagePointsConfig);
    }, [dispatch]);

    const oWATER_COUNT = useSelector(getAIbyId('AI3001160')) || defaultAIData;
    const oWATER_DAY = useSelector(getAIbyId('AI3001161')) || defaultAIData;

    const energyDayZeroDay = useSelector(getAVbyId('AV3001393')) || defaultAVData;
    const energyDayZeroNight = useSelector(getAVbyId('AV3001394')) || defaultAVData;
    const energyMonthZeroNight = useSelector(getAVbyId('AV3001395')) || defaultAVData;
    const energyMonthZeroDay = useSelector(getAVbyId('AV3001396')) || defaultAVData;

    const pwrActiveTotal = useSelector(getModbusPointById('PwrActiveTotal')) || defaultAVData;
    const energyTotal = useSelector(getModbusPointById('EnergyTotal')) || defaultAVData;
    const energyDayTotal = useSelector(getModbusPointById('EnergyDayTotal')) || defaultAVData;
    const energyNightTotal = useSelector(getModbusPointById('EnergyNightTotal')) || defaultAVData;

    const I1 = useSelector(getModbusPointById('I1')) || defaultAVData;
    const I2 = useSelector(getModbusPointById('I2')) || defaultAVData;
    const I3 = useSelector(getModbusPointById('I3')) || defaultAVData;
    const L1N = useSelector(getModbusPointById('L1N')) || defaultAVData;
    const L2N = useSelector(getModbusPointById('L2N')) || defaultAVData;
    const L3N = useSelector(getModbusPointById('L3N')) || defaultAVData;
    const PWR1 = useSelector(getModbusPointById('Pwr1')) || defaultAVData;
    const PWR2 = useSelector(getModbusPointById('Pwr2')) || defaultAVData;
    const PWR3 = useSelector(getModbusPointById('Pwr3')) || defaultAVData;

    const oPWR_DAY = useMemo(() => {
      return {
            title: 'Day Energy',
            description: 'Сегодня: дневной тариф',
            value: (energyDayTotal.value - energyDayZeroDay.value) / 1000,
        };
    }, [energyDayTotal.value, energyDayZeroDay.value]);

    const oPWR_NIGHT = useMemo(() => {
      return {
            title: 'Night Energy',
            description: 'Сегодня: ночной тариф',
            value: (energyNightTotal.value - energyDayZeroNight.value) / 1000,
        };
    }, [energyDayZeroNight.value, energyNightTotal.value]);

    const oPWR_MONTH_DAY = useMemo(() => {
      return {
            title: 'Month: Day Energy',
            description: 'За месяц: дневной тариф',
            value: (energyDayTotal.value - energyMonthZeroDay.value) / 1000,
        };
    }, [energyDayTotal.value, energyMonthZeroDay.value]);

    const oPWR_MONTH_NIGHT = useMemo(() => {
      return {
            title: 'Month: Night Energy',
            description: 'За месяц: ночной тариф',
            value: (energyNightTotal.value - energyMonthZeroNight.value) / 1000,
        };
    }, [energyMonthZeroNight.value, energyNightTotal.value]);

    return (
      <div className={styles.container}>
        <AnalogInputControl accuracy={3} type='power' data={pwrActiveTotal}/>
        <AnalogInputControl accuracy={2} divider = {1000} type='waterCounter' data={oWATER_COUNT}/>
        <AnalogInputControl accuracy={2} type='waterCounter' data={oWATER_DAY}/>
        <AnalogInputControl accuracy={2} type='money' multiplier={0.01427} unit="UAH" data={oWATER_DAY}/>
        <AnalogInputControl accuracy={3} divider = {1000} type='meter' data={energyTotal}/>
        <AnalogInputControl accuracy={3} divider = {1000} type='meter' data={energyDayTotal}/>
        <AnalogInputControl accuracy={3} divider = {1000} type='meter' data={energyNightTotal}/>
        <AnalogInputControl type='tariffDay' unit="kW*h" data={oPWR_DAY} />
        <AnalogInputControl accuracy={2} type='money' multiplier={1.68} unit="UAH" data={oPWR_DAY}/>
        <AnalogInputControl type='tariffNight' unit="kW*h" data={oPWR_NIGHT}/>
        <AnalogInputControl accuracy={2} type='money' multiplier={0.90} unit="UAH" data={oPWR_NIGHT}/>

        <AnalogInputControl type='tariffDay' unit="kW*h" data={oPWR_MONTH_DAY} />
        <AnalogInputControl type='tariffNight' unit="kW*h" data={oPWR_MONTH_NIGHT} />

        <AnalogInputControl type='voltage' data={L1N} />
        <AnalogInputControl type='voltage' data={L2N} />
        <AnalogInputControl type='voltage' data={L3N} />
        <AnalogInputControl type='amper' data={I1} />
        <AnalogInputControl type='amper' data={I2} />
        <AnalogInputControl type='amper' data={I3} />
        <AnalogInputControl accuracy={3} type='power' data={PWR1} />
        <AnalogInputControl accuracy={3} type='power' data={PWR2} />
        <AnalogInputControl accuracy={3} type='power' data={PWR3} />
      </div>
    );
};
