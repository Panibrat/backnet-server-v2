import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SocketIO from '../../../../services/SocketService';
import { convertDiffTemperaturesToColor, valueToFixed } from '../../../../common/helpers';
import { setTitle } from '../../../../store/actions/menuActions';
import { setActiveArea } from '../../../../store/actions/plansViewActions';
import { getActiveArea, getAIbyId, getAObyId, getBIbyId } from '../../../../store/selectors/selectors';
import { pagePointsConfig } from './pagePointsConfig';
import { defaultAIData, defaultAOData, defaultBOData } from '../../constants';
import SecondFloorPlan from './SecondFloorPlan';
import TemperatureTile from '../../../../common/Components/TemperatureTile/TemperatureTile';
import HFTemperatureTile from '../../../../common/Components/HFTemperatureTile/HFTemperatureTile';
import Radiator from '../../../../common/Components/Radiator/Radiator';
import styles from './SecondFloorItem.css';

const selectedAreaOpacity = '0.2';

export const SecondFloorItem = () => {
  const dispatch = useDispatch();
  const activeArea = useSelector(getActiveArea);

  useEffect(() => {
    dispatch(setTitle('Второй этаж'));
    dispatch(setActiveArea(''));
    SocketIO.setRequestedPointsToBuffer(pagePointsConfig);
  }, [dispatch]);

  const handleAreaClick = (areaId, areaTitle) => {
    if (areaId === activeArea) {
      dispatch(setActiveArea(''));
      dispatch(setTitle('Второй этаж'));
    } else {
      dispatch(setActiveArea(areaId));
      dispatch(setTitle(areaTitle));
    }
  };

  const temperatureOutdoor = useSelector(getAIbyId('AI3000156')) || defaultAIData;
  const temperatureD1 = useSelector(getAIbyId('AI3000767')) || defaultAIData;
  const spTemperatureD1 = useSelector(getAIbyId('AI3000792')) || defaultAIData;
  const temperatureD2 = useSelector(getAIbyId('AI3000769')) || defaultAIData;
  const spTemperatureD2 = useSelector(getAIbyId('AI3000791')) || defaultAIData;
  const temperatureCabinetLeft = useSelector(getAIbyId('AI3000772')) || defaultAIData;
  const spTemperatureCabinetLeft = useSelector(getAIbyId('AI3000789')) || defaultAIData;
  const temperatureBedroomLeft = useSelector(getAIbyId('AI3000773')) || defaultAIData;
  const spTemperatureBedroomLeft = useSelector(getAIbyId('AI3000790')) || defaultAIData;
  const temperatureCabinetRight = useSelector(getAIbyId('AI3000187')) || defaultAIData;
  const temperatureBedroomRight = useSelector(getAIbyId('AI3000179')) || defaultAIData;
  const temperatureHFWC2Left = useSelector(getAIbyId('AI3001167')) || defaultAIData;

  const isOnPumpHF_L = useSelector(getBIbyId('BI3001240')) || defaultBOData;
  const isOnPumpSO_R = useSelector(getBIbyId('BI3000247')) || defaultBOData;
  const isOnPumpSO_L = useSelector(getBIbyId('BI3000818')) || defaultBOData;

  const secondFloorHF_WC_Left_valve = useSelector(getAIbyId('AI3001179')) || defaultAIData;
  const isOnSecondFloorHF_WC_Left = secondFloorHF_WC_Left_valve.value > 5 && isOnPumpHF_L.value;

  const secondFloorHF_WC_Right_valve = useSelector(getAIbyId('AI3000182')) || defaultAIData;
  const isOnSecondFloorHF_WC_Right = secondFloorHF_WC_Right_valve.value > 5;

  const secondFloorSO_D1_valve = useSelector(getAIbyId('AI3000785')) || defaultAIData;
  const isOnSecondFloorSO_D1 = secondFloorSO_D1_valve.value > 5 && isOnPumpSO_L.value;

  const secondFloorSO_D2_valve = useSelector(getAIbyId('AI3000784')) || defaultAIData;
  const isOnSecondFloorSO_D2 = secondFloorSO_D2_valve.value > 5 && isOnPumpSO_L.value;

  const secondFloorSO_CabinetLeft_valve = useSelector(getAIbyId('AI3000782')) || defaultAIData;
  const isOnSecondFloorSO_CabinetLeft = secondFloorSO_CabinetLeft_valve.value > 5 && isOnPumpSO_L.value;

  const secondFloorSO_BedroomLeft_valve = useSelector(getAIbyId('AI3000783')) || defaultAIData;
  const isOnSecondFloorSO_BedroomLeft = secondFloorSO_BedroomLeft_valve.value > 5 && isOnPumpSO_L.value;

  const secondFloorSO_CabinetRight_valve = useSelector(getAIbyId('AI3000166')) || defaultAIData;
  const isOnSecondFloorSO_CabinetRight = secondFloorSO_CabinetRight_valve.value > 5 && isOnPumpSO_R.value;

  const secondFloorSO_BedroomRight_valve = useSelector(getAIbyId('AI3000165')) || defaultAIData;
  const isOnSecondFloorSO_BedroomRight = secondFloorSO_BedroomRight_valve.value > 5 && isOnPumpSO_R.value;

  const spTemperatureBedroomRight = useSelector(getAObyId('AO3000881')) || defaultAOData;
  const spTemperatureCabinetRight = useSelector(getAObyId('AO3000880')) || defaultAOData;

  const colorSecondFloorBedroomRight = convertDiffTemperaturesToColor(
    temperatureBedroomRight.value,
    spTemperatureBedroomRight.value,
  );
  const colorSecondCabinetRight = convertDiffTemperaturesToColor(
    temperatureCabinetRight.value,
    spTemperatureCabinetRight.value,
  );
  const colorSecondFloorD1 = convertDiffTemperaturesToColor(
    temperatureD1.value,
    spTemperatureD1.value,
  );
  const colorSecondFloorD2 = convertDiffTemperaturesToColor(
    temperatureD2.value,
    spTemperatureD2.value,
  );
  const colorSecondFloorBedroomLeft = convertDiffTemperaturesToColor(
    temperatureBedroomLeft.value,
    spTemperatureBedroomLeft.value,
  );
  const colorSecondCabinetLeft = convertDiffTemperaturesToColor(
    temperatureCabinetLeft.value,
    spTemperatureCabinetLeft.value,
  );

  return (
    <div className={styles.container}>
      <svg viewBox="20 0 360 450" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <g className="secondFloorBedroomRight">
          <path
            d="m204.66665,115.99978l36.66622,0l0,-14.93331l16.26664,-16.79996l50.3999,0l16.5333,16.5333l0,15.19997l36.53327,0.26666l-0.26667,86.93317l-102.93314,0l0,3.2l-53.06656,0l-0.13296,-90.39983z"
            fill={colorSecondFloorBedroomRight}
            opacity="0.5"
          />
        </g>
        <g className="SecFloorCabinetRight">
          <path
            d="m261.88679,310l99.24528,0.18867l0.18868,49.24529l-31.88679,0c0,0 -0.18868,14.5283 -0.18868,14.71698c0,0.18868 -11.88679,12.64151 -11.88679,12.64151c0,0 -43.20755,-0.18868 -43.20755,-0.18868c0,0 -12.26415,-12.07547 -12.26415,-12.07547c0,0 0,-64.5283 0,-64.5283z"
            fill={colorSecondCabinetRight}
            opacity="0.5"
          />
        </g>
        <g className="SecFloorD1">
          <path
            d="m38.723404,116.028369l76.453901,-0.283688l0,60.851064l-20.70922,0l0,26.666666l-55.886525,0l0.141844,-87.234042z"
            fill={colorSecondFloorD1}
            opacity="0.5"
          />
        </g>
        <g className="SecFloorD2">
          <path
            d="m118.799902,115.999908c0.133333,0 76.533272,0 76.39994,-0.000002c0.133332,0.000002 0.133332,90.39993 0,90.399927c0.133332,0.000003 -53.466625,-0.13333 -53.599957,-0.133334c0.133332,0.000004 -0.133335,-3.733327 -0.133335,-3.86666c0,-0.133333 -2.399998,-22.399982 -2.533329,-22.399985c0.133331,0.000003 -0.000002,-3.466661 -0.133334,-3.466664c0.133332,0.000003 -19.999985,0.000003 -20.133317,0c0.133332,0.000003 -0.000001,-60.533282 0.133332,-60.533282z"
            fill={colorSecondFloorD2}
            opacity="0.5"
          />
        </g>
        <g className="SecFloorCabinetLeft">
          <path
            d="m38.723385,310.070827l99.432598,-0.141851c0.141839,0.000007 0.425527,64.538994 0.425527,64.538994c0,0 -12.482266,12.482265 -12.624105,12.482257c0.141839,0.000008 -43.120559,0.000008 -43.262397,0c0.141838,0.000008 -12.198583,-12.340413 -12.340421,-12.340421c0.141838,0.000008 0.141838,-14.893605 0,-14.893612c0.141838,0.000007 -31.631202,-0.141837 -31.773039,-0.141844c0.141837,0.000007 -0.000007,-50.070899 0.141837,-49.503523z"
            fill={colorSecondCabinetLeft}
            opacity="0.5"
          />
        </g>
        <g className="SecFloorBedroomLeft">
          <path
            d="m147.834819,270.51504l104.329739,-0.412365l-0.206185,61.855574l-104.535921,0l0.412367,-61.443209z"
            fill={colorSecondFloorBedroomLeft}
            opacity="0.5"
          />
        </g>
        <g className="secFloorHF_WC_Left" transform="translate(0, 5)">
          <path id="svg_5537"
                d="m153.953099,211.423513c-22.43008,0.37021 29.67218,-0.36468 34.61939,-0.4171c4.94721,-0.05242 5.10709,5.27423 0.10428,5.21376c-5.00281,-0.06047 -30.28756,0.1254 -34.6194,0.20855c-4.33184,0.08315 -4.38764,5.54326 0,5.31804c4.38764,-0.22522 29.54318,-0.25499 34.51512,-0.20855c4.97194,0.04644 5.20612,5.14805 -0.20855,5.00521c-5.41467,-0.14284 -30.04945,0.50117 -34.41084,0.52138c-4.36139,0.02022 -4.201,5.19185 0.10427,5.21376c4.30527,0.02191 29.38668,-0.22203 34.51512,-0.20855c5.12844,0.01348 5.12899,5.04903 0.10428,5.21377c-4.85997,-0.08238 -34.6194,0.31282 -34.72367,0.20855c-4.35147,0.0299 -4.23956,5.89988 0.10427,5.63086c4.55239,0.02191 34.6194,-0.20855 34.51512,-0.31282c5.10378,-0.05242 5.33754,5.17519 0.20855,5.21376c-5.12899,0.03857 -29.72423,0.17858 -34.61939,0.20855c-4.89516,0.02997 -4.8433,4.25339 -0.20855,4.27529c4.63475,0.0219 59.72629,-0.37329 34.82794,-0.31283"
                opacity="0.5"
                strokeWidth="2"
                stroke={isOnSecondFloorHF_WC_Left ? 'red' : 'grey'}
                fill="none"
          />
        </g>
        <g className="secondFloorHF_WC_Right" transform="translate(0, 5)">
          <path id="svg_5536"
                d="m210.32169,211.15251c-22.43008,0.37021 29.67218,-0.36468 34.61939,-0.4171c4.94721,-0.05242 5.10709,5.27423 0.10428,5.21376c-5.00281,-0.06047 -30.28756,0.1254 -34.6194,0.20855c-4.33184,0.08315 -4.38764,5.54326 0,5.31804c4.38764,-0.22522 29.54318,-0.25499 34.51512,-0.20855c4.97194,0.04644 5.20612,5.14805 -0.20855,5.00521c-5.41467,-0.14284 -30.04945,0.50117 -34.41084,0.52138c-4.36139,0.02022 -4.201,5.19185 0.10427,5.21376c4.30527,0.02191 29.38668,-0.22203 34.51512,-0.20855c5.12844,0.01348 5.12899,5.04903 0.10428,5.21377c-4.85997,-0.08238 -34.6194,0.31282 -34.72367,0.20855c-4.35147,0.0299 -4.23956,5.89988 0.10427,5.63086c4.55239,0.02191 34.6194,-0.20855 34.51512,-0.31282c5.10378,-0.05242 5.33754,5.17519 0.20855,5.21376c-5.12899,0.03857 -29.72423,0.17858 -34.61939,0.20855c-4.89516,0.02997 -4.8433,4.25339 -0.20855,4.27529c4.63475,0.0219 59.72629,-0.37329 34.82794,-0.31283"
                opacity="0.5"
                strokeWidth="2"
                stroke={isOnSecondFloorHF_WC_Right ? 'red' : 'grey'}
                fill="none"
          />
        </g>
        <g transform="translate(175, 60)">>
          <TemperatureTile temperature={valueToFixed(temperatureOutdoor.value)}/>
        </g>
        <g transform="translate(50, 140)">>
          <TemperatureTile temperature={valueToFixed(temperatureD1.value)}/>
        </g>
        <g transform="translate(130, 140)">>
          <TemperatureTile temperature={valueToFixed(temperatureD2.value)}/>
        </g>
        <g transform="translate(260, 140)">
          <TemperatureTile temperature={valueToFixed(temperatureBedroomRight.value)}/>
        </g>
        <g transform="translate(65, 325)">
          <TemperatureTile temperature={valueToFixed(temperatureCabinetLeft.value)}/>
        </g>
        <g transform="translate(175, 290)">
          <TemperatureTile temperature={valueToFixed(temperatureBedroomLeft.value)}/>
        </g>
        <g transform="translate(290, 325)">
          <TemperatureTile temperature={valueToFixed(temperatureCabinetRight.value)}/>
        </g>
        <g transform="translate(152, 230)">
          <HFTemperatureTile temperature={valueToFixed(temperatureHFWC2Left.value)}/>
        </g>
        <g className="secondFloor_BedroomRightRadiator" transform="translate(360, 135) rotate(90)">
          <Radiator isOn={isOnSecondFloorSO_BedroomRight}/>
        </g>
        <g className="secondFloor_BedroomRightRadiator" transform="translate(268, 85)">
          <Radiator isOn={isOnSecondFloorSO_BedroomRight}/>
        </g>
        <g className="secondFloor_D2Radiator" transform="translate(165, 117)">
          <Radiator isOn={isOnSecondFloorSO_D2}/>
        </g>
        <g className="secondFloor_CabinetRightRadiator" transform="translate(281, 377)">
          <Radiator isOn={isOnSecondFloorSO_CabinetRight}/>
        </g>
        <g className="secondFloor_D1Radiator" transform="translate(49, 135) rotate(90)">
          <Radiator isOn={isOnSecondFloorSO_D1}/>
        </g>
        <g className="secondFloor_CabinetLeftRadiator" transform="translate(89, 376)">
          <Radiator isOn={isOnSecondFloorSO_CabinetLeft}/>
        </g>
        <g className="secondFloor_BedroomLeftRadiator" transform="translate(187, 322)">
          <Radiator isOn={isOnSecondFloorSO_BedroomLeft}/>
        </g>
        <g className="secondFloorBedroomRight">
          <path
            d="m204.66665,115.99978l36.66622,0l0,-14.93331l16.26664,-16.79996l50.3999,0l16.5333,16.5333l0,15.19997l36.53327,0.26666l-0.26667,86.93317l-102.93314,0l0,3.2l-53.06656,0l-0.13296,-90.39983z"
            fill="black"
            opacity={activeArea === 'secondFloorBedroomRight' ? selectedAreaOpacity : 0}
            onClick={() => handleAreaClick('secondFloorBedroomRight', 'Спальня(Родители)')}
          />
        </g>
        <g className="SecFloorCabinetRight">
          <path
            d="m261.88679,310l99.24528,0.18867l0.18868,49.24529l-31.88679,0c0,0 -0.18868,14.5283 -0.18868,14.71698c0,0.18868 -11.88679,12.64151 -11.88679,12.64151c0,0 -43.20755,-0.18868 -43.20755,-0.18868c0,0 -12.26415,-12.07547 -12.26415,-12.07547c0,0 0,-64.5283 0,-64.5283z"
            fill="black"
            opacity={activeArea === 'SecFloorCabinetRight' ? selectedAreaOpacity : 0}
            onClick={() => handleAreaClick('SecFloorCabinetRight', 'Кабинет(Родители)')}
          />
        </g>
        <g className="SecFloorD1">
          <path
            d="m38.723404,116.028369l76.453901,-0.283688l0,60.851064l-20.70922,0l0,26.666666l-55.886525,0l0.141844,-87.234042z"
            fill="black"
            opacity={activeArea === 'SecFloorD1' ? selectedAreaOpacity : 0}
            onClick={() => handleAreaClick('SecFloorD1', 'Комната Юли')}
          />
        </g>
        <g className="SecFloorD2">
          <path
            d="m118.799902,115.999908c0.133333,0 76.533272,0 76.39994,-0.000002c0.133332,0.000002 0.133332,90.39993 0,90.399927c0.133332,0.000003 -53.466625,-0.13333 -53.599957,-0.133334c0.133332,0.000004 -0.133335,-3.733327 -0.133335,-3.86666c0,-0.133333 -2.399998,-22.399982 -2.533329,-22.399985c0.133331,0.000003 -0.000002,-3.466661 -0.133334,-3.466664c0.133332,0.000003 -19.999985,0.000003 -20.133317,0c0.133332,0.000003 -0.000001,-60.533282 0.133332,-60.533282z"
            fill="black"
            opacity={activeArea === 'SecFloorD2' ? selectedAreaOpacity : 0}
            onClick={() => handleAreaClick('SecFloorD2', 'Комната Егора')}
          />
        </g>
        <g className="SecFloorCabinetLeft">
          <path
            d="m38.723385,310.070827l99.432598,-0.141851c0.141839,0.000007 0.425527,64.538994 0.425527,64.538994c0,0 -12.482266,12.482265 -12.624105,12.482257c0.141839,0.000008 -43.120559,0.000008 -43.262397,0c0.141838,0.000008 -12.198583,-12.340413 -12.340421,-12.340421c0.141838,0.000008 0.141838,-14.893605 0,-14.893612c0.141838,0.000007 -31.631202,-0.141837 -31.773039,-0.141844c0.141837,0.000007 -0.000007,-50.070899 0.141837,-49.503523z"
            fill="black"
            opacity={activeArea === 'SecFloorCabinetLeft' ? selectedAreaOpacity : 0}
            onClick={() => handleAreaClick('SecFloorCabinetLeft', 'Кабинет')}
          />
        </g>
        <g className="SecFloorBedroomLeft">
          <path
            d="m147.834819,270.51504l104.329739,-0.412365l-0.206185,61.855574l-104.535921,0l0.412367,-61.443209z"
            fill="black"
            opacity={activeArea === 'SecFloorBedroomLeft' ? selectedAreaOpacity : 0}
            onClick={() => handleAreaClick('SecFloorBedroomLeft', 'Спальня')}
          />
        </g>
        <g transform="translate(147, 210)">
          <rect
            width="49"
            height="58"
            fill="black"
            opacity={activeArea === 'secondFloorHF_WC_Left' ? selectedAreaOpacity : 0}
            onClick={() => handleAreaClick('secondFloorHF_WC_Left', 'c/у 2')}
          />
        </g>
        <SecondFloorPlan/>
      </svg>
    </div>
  );
};
