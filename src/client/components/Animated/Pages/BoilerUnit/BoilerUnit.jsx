import * as React from 'react';
import styles from './BoilerUnit.css';

import { Pump } from './../../Components/PumpSvg/Pump'
import {ElectricHeater} from "./components/ElectricHeater/ElectricHeater";
import {WaterHeater} from "./components/WaterHeater/WaterHeater";
import {BoilerStaticBase} from "./components/BoilerStaticBase/BoilerStaticBase";
import TemperatureTile from "../../../../common/Components/TemperatureTile/TemperatureTile";
import {valueToFixed} from "../../../../common/helpers";

export const BoilerUnit = (props) => (
    <div className={styles.container}>
        <svg viewBox="0 0 111.12 66.146" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <g transform='translate(0 -230.854)'>
                    <BoilerStaticBase/>
                    <Pump isOn={props.oPUMP_REC.value} x="214.183" y="332.04"/>
                    <Pump isOn={props.oPUMP_BOY.value} x="136.791" y="308.637"/>
                    <WaterHeater isOn = {props.oPUMP_BOY.value}/>
                    <ElectricHeater isOn={props.oBOYLER.value}/>
                    <g transform="translate(45, 250) scale(0.3)">
                        <TemperatureTile
                            temperature={ valueToFixed(props.iT_GVS.value) }
                            plateColor="#ffea00"
                            textColor="black"
                            strokeColor="black"
                            textOpacity="0.9"
                            plateOpacity="0.9"
                            fontWeight="bold"
                        />
                        />
                    </g>
                    <g transform="translate(45, 236) scale(0.3)">
                        <TemperatureTile
                            temperature={ valueToFixed(props.sT_GVS.value) }
                            plateColor="#00e676"
                            textColor="black"
                            strokeColor="black"
                            textOpacity="1"
                            plateOpacity="0.9"
                            fontWeight="bold"
                        />
                    </g>
                </g>
        </svg>
    </div>
);

export default BoilerUnit;
