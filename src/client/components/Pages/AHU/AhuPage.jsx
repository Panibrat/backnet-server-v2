import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setTitle } from '../../../store/actions/menuActions';
import SocketIO from '../../../services/SocketService';
import { getAObyId, getAIbyId, getBObyId, getBIbyId } from '../../../store/selectors/selectors';
import AirUnit from '../../Animated/Pages/AirUnit/AirUnit';
import { defaultAIData, defaultAOData, defaultBOData } from '../constants';
import { AnalogInputControl } from '../LightsPage/components/AnalogInputControl/AnalogInputControl';
import { AnalogOutputControl } from '../LightsPage/components/AnalogOutputControl/AnalogOutputControl';
import { BinaryInputControl } from '../LightsPage/components/BinaryInputControl/BinaryInputControl';
import { BinaryOutputControl } from '../LightsPage/components/BinaryOutputControl/BinaryOutputControl';
import styles from './AhuPage.css';
import { pagePointsConfig } from './pagePointsConfig';

export const AhuPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle('Приточная установка'));
    SocketIO.setRequestedPointsToBuffer(pagePointsConfig);
  }, [dispatch]);

  const tFor = useSelector(getAIbyId('AI3001122')) || defaultAIData;
  const tOut = useSelector(getAIbyId('AI3000156')) || defaultAIData;
  const tRet = useSelector(getAIbyId('AI3001123')) || defaultAIData;
  const tIsp = useSelector(getAIbyId('AI3001124')) || defaultAIData;
  const tComp = useSelector(getAIbyId('AI3001154')) || defaultAIData;
  const pFreon = useSelector(getAIbyId('AI3001126')) || defaultAIData;
  const dpFan = useSelector(getAIbyId('AI3001125')) || defaultAIData;
  const spTFor = useSelector(getAIbyId('AI3001133')) || defaultAIData;
  const spTRet = useSelector(getAIbyId('AI3001157')) || defaultAIData;
  const speedFan = useSelector(getAIbyId('AI3001127')) || defaultAIData;
  const damperFreshLevel = useSelector(getAIbyId('AI3001128')) || defaultAIData;

  const setTemperatureDayHeat = useSelector(getAObyId('AO3001137')) || defaultAOData;
  const setTemperatureNightHeat = useSelector(getAObyId('AO3001138')) || defaultAOData;
  const setTemperatureDayCool = useSelector(getAObyId('AO3001139')) || defaultAOData;
  const setTemperatureNightCool = useSelector(getAObyId('AO3001140')) || defaultAOData;
  const setDamperMinWinter = useSelector(getAObyId('AO3001142')) || defaultAOData;
  const setDamperMinSummer = useSelector(getAObyId('AO3001143')) || defaultAOData;
  const sVSD = useSelector(getAObyId('AO3001136')) || defaultAOData;

  const sSTART = useSelector(getBObyId('BO3001224')) || defaultBOData;
  const sSEASON = useSelector(getBObyId('BO3001226')) || defaultBOData;
  const sLOCAL = useSelector(getBObyId('BO3001233')) || defaultBOData;
  const sALWAYS = useSelector(getBObyId('BO3001236')) || defaultBOData;

  const oKKB = useSelector(getBIbyId('BI3001200')) || defaultBOData;
  const oFan = useSelector(getBIbyId('BI3001199')) || defaultBOData;
  const oHeat = useSelector(getBIbyId('BI3001202')) || defaultBOData;
  const oDamperTop = useSelector(getBIbyId('BI3001208')) || defaultBOData;
  const oDamperButtom = useSelector(getBIbyId('BI3001209')) || defaultBOData;
  const aFaza = useSelector(getBIbyId('BI3001232')) || defaultBOData;
  const aPV = useSelector(getBIbyId('BI3001213')) || defaultBOData;
  const aKKB = useSelector(getBIbyId('BI3001218')) || defaultBOData;
  const oAlarms = useSelector(getBIbyId('BI3001206')) || defaultBOData;
  const oRQ_HEAT = useSelector(getBIbyId('BI3001228')) || defaultBOData;
  const oRQ_COOL = useSelector(getBIbyId('BI3001229')) || defaultBOData;

  return (
    <div className={styles.container}>
      <AirUnit
        tFor={tFor}
        tOut={tOut}
        tRet={tRet}
        tIsp={tIsp}
        tComp={tComp}
        pFreon={pFreon}
        dpFan={dpFan}
        spTFor={spTFor}
        spTRet={spTRet}
        speedFan={speedFan}
        damperFreshLevel={damperFreshLevel}
        oAlarms={oAlarms}
        oRQ_HEAT={oRQ_HEAT}
        oRQ_COOL={oRQ_COOL}
        oKKB={oKKB}
        oFan={oFan}
        oHeat={oHeat}
        oDamperTop={oDamperTop}
        oDamperButtom={oDamperButtom}
        aKKB={aKKB}
        aFaza={aFaza}
        aPV={aPV}
      />
      <BinaryOutputControl type='offOn' data={sSTART}/>
      <BinaryOutputControl type='coolHeat' data={sSEASON}/>
      <BinaryOutputControl type='control' data={sLOCAL}/>
      <BinaryOutputControl type='offOn' data={sALWAYS}/>

      <AnalogOutputControl type='setTemperature' data={setTemperatureDayHeat}/>
      <AnalogOutputControl type='setTemperature' data={setTemperatureNightHeat}/>
      <AnalogOutputControl type='setTemperature' data={setTemperatureDayCool}/>
      <AnalogOutputControl type='setTemperature' data={setTemperatureNightCool}/>
      <AnalogOutputControl type='damper' data={setDamperMinWinter}/>
      <AnalogOutputControl type='setAny' data={sVSD}/>
      <AnalogOutputControl type='damper' data={setDamperMinSummer}/>

      <AnalogInputControl type='temperature' data={tFor}/>
      <AnalogInputControl type='temperature' data={tOut}/>
      <AnalogInputControl type='temperature' data={tRet}/>
      <AnalogInputControl type='temperature' data={tIsp}/>
      <AnalogInputControl type='temperature' data={tComp}/>
      <AnalogInputControl type='liquidPressure' data={pFreon}/>

      <BinaryInputControl type='offOn' data={oKKB}/>
      <BinaryInputControl type='offOn' data={oFan}/>
      <BinaryInputControl type='offOn' data={oHeat}/>
      <BinaryInputControl type='offOn' data={oDamperTop}/>
      <BinaryInputControl type='offOn' data={oDamperButtom}/>
      <BinaryInputControl type='normalAlarm' data={aKKB}/>
      <BinaryInputControl type='normalAlarm' data={aFaza}/>
      <BinaryInputControl type='normalAlarm' data={aPV}/>
    </div>
  );
};
