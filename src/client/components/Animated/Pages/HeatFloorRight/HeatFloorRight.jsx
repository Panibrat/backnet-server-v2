import * as React from 'react';
import styles from './HeatFloorRight.css';

import { HeatFloorRightStaticBase } from './components/HeatFloorRightStaticBase/HeatFloorRightStaticBase';
import { PumpCollector } from '../../Components/PumpCollector/PumpCollector';

import TemperatureTile from "../../../../common/Components/TemperatureTile/TemperatureTile";
import HFTemperatureTile from "../../../../common/Components/HFTemperatureTile/HFTemperatureTile";
import ValuePercentTile from "../../../../common/Components/ValuePercentTile/ValuePercentTile";
import TextTile from "../../../../common/Components/TextTile/TextTile";
import { valueToFixed } from "../../../../common/helpers";

export const HeatFloorRight = (props) => (
    <div className={styles.container}>
        <svg
            width="100%"
            height="100%"
            version="1.1"
            viewBox="0 0 95.25 79.375"
        >
            <HeatFloorRightStaticBase/>
            <PumpCollector isOn={props.oPUMP.value}/>
            <g transform="translate(23, 20) scale(0.25)"> // Кухня
                <HFTemperatureTile temperature={ valueToFixed(props.iT_HF_KITCHEN.value) } />
            </g>
            <g transform="translate(79, 24) scale(0.28)"> // T_FOR
                <TemperatureTile
                    temperature={ valueToFixed(props.iT_FOR.value) }
                    plateColor="#ffea00"
                    textColor="black"
                    strokeColor="black"
                    textOpacity="0.9"
                    plateOpacity="0.9"
                    fontWeight="bold"
                />
                />
            </g>
            <g transform="translate(79, 17) scale(0.28)"> // SP_T_FOR
                <TemperatureTile
                    temperature={ valueToFixed(props.SP_T_FOR.value) }
                    plateColor="#00e676"
                    textColor="black"
                    strokeColor="black"
                    textOpacity="1"
                    plateOpacity="0.9"
                    fontWeight="bold"
                />
            </g>
            <g transform="translate(21, 3) scale(0.28)"> // T_ROOM_KITCHEN
                <TemperatureTile
                    temperature={ valueToFixed(props.iT_KITCHEN.value) }
                />
            </g>
            <g transform="translate(73, 66) scale(0.28)"> // oVLV
                <ValuePercentTile
                    value={ valueToFixed(props.oHEAT.value) }
                />
            </g>
            <g transform="translate(7, 47) scale(0.28) rotate(-90)">
                <TextTile text={ 'Тамбур' } />
            </g>
            <g transform="translate(29, 47) scale(0.28) rotate(-90)">
                <TextTile text={ 'Кухня' } />
            </g>
            <g transform="translate(51, 47) scale(0.28) rotate(-90)">
                <TextTile text={ 'с/у 1эт' } />
            </g>
            <g transform="translate(73, 47) scale(0.28) rotate(-90)">
                <TextTile text={ 'с/у 2эт' } />
            </g>
        </svg>
    </div>
);

export default HeatFloorRight;
