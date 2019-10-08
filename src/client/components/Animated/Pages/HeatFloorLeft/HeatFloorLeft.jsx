import * as React from 'react';
import styles from './HeatFloorLeft.css';

import { HeatFloorLeftStaticBase } from './components/HeatFloorLeftStaticBase/HeatFloorLeftStaticBase';
import { PumpCollector } from '../../Components/PumpCollector/PumpCollector';

import TemperatureTile from "../../../../common/Components/TemperatureTile/TemperatureTile";
import HFTemperatureTile from "../../../../common/Components/HFTemperatureTile/HFTemperatureTile";
import ValuePercentTile from "../../../../common/Components/ValuePercentTile/ValuePercentTile";
import TextTile from "../../../../common/Components/TextTile/TextTile";
import { valueToFixed } from "../../../../common/helpers";

export const HeatFloorLeft = (props) => (
    <div className={styles.container}>
        <svg
            width="100%"
            height="100%"
            version="1.1"
            viewBox="0 0 95.25 79.375"
        >
            <HeatFloorLeftStaticBase/>
            <PumpCollector isOn={props.oPUMP.value}/>
            <g transform="translate(1, 20) scale(0.25)"> // Кухня
                <HFTemperatureTile temperature={ valueToFixed(props.iT_HF_KITCHEN.value) } />
            </g>
            <g transform="translate(14, 20) scale(0.25)"> // Тамбур
                <HFTemperatureTile temperature={ valueToFixed(props.iT_HF_HALL.value) } />
            </g>
            <g transform="translate(27, 20) scale(0.25)"> // с/у 1эт
                <HFTemperatureTile temperature={ valueToFixed(props.iT_HF_WC1.value) } />
            </g>
            <g transform="translate(41, 20) scale(0.25)"> // с/у 2эт
                <HFTemperatureTile temperature={ valueToFixed(props.iT_HF_WC2.value) } />
            </g>
            <g transform="translate(54, 20) scale(0.25)"> // Зал Пр
                <HFTemperatureTile temperature={ valueToFixed(props.iT_HF_ZAL_R.value) } />
            </g>
            <g transform="translate(67, 20) scale(0.25)"> // Зал Лев
                <HFTemperatureTile temperature={ valueToFixed(props.iT_HF_ZAL_L.value) } />
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
            <g transform="translate(0, 3) scale(0.28)"> // T_ROOM_KITCHEN
                <TemperatureTile
                    temperature={ valueToFixed(props.iT_KITCHEN.value) }
                />
            </g>
            <g transform="translate(58, 3) scale(0.28)"> // T_ROOM_ZAL
                <TemperatureTile
                    temperature={ valueToFixed(props.iT_ZAL.value) }
                />
            </g>
            <g transform="translate(1, 40) scale(0.25)"> // Кухня
                <ValuePercentTile
                    value={ valueToFixed(props.oVLV_KITCHEN.value) }
                />
            </g>
            <g transform="translate(14, 40) scale(0.25)"> // Тамбур
                <ValuePercentTile
                    value={ valueToFixed(props.oVLV_HALL.value) }
                />
            </g>
            <g transform="translate(27, 40) scale(0.25)"> // с/у 1эт
                <ValuePercentTile
                    value={ valueToFixed(props.oVLV_WC1.value) }
                />
            </g>
            <g transform="translate(40, 40) scale(0.25)"> // с/у 2эт
                <ValuePercentTile
                    value={ valueToFixed(props.oVLV_WC2.value) }
                />
            </g>
            <g transform="translate(53, 40) scale(0.25)"> // Зал Пр
                <ValuePercentTile
                    value={ valueToFixed(props.oVLV_ZAL_R.value) }
                />
            </g>
            <g transform="translate(66, 40) scale(0.25)"> // Зал Лев
                <ValuePercentTile
                    value={ valueToFixed(props.oVLV_ZAL_L.value) }
                />
            </g>
            <g transform="translate(73, 66) scale(0.28)"> // oVLV
                <ValuePercentTile
                    value={ valueToFixed(props.oHEAT.value) }
                />
            </g>
            <g transform="translate(7, 47) scale(0.28) rotate(-90)">
                <TextTile text={ 'Кухня' } />
            </g>
            <g transform="translate(20, 47) scale(0.28) rotate(-90)">
                <TextTile text={ 'Тамбур' } />
            </g>
            <g transform="translate(33, 47) scale(0.28) rotate(-90)">
                <TextTile text={ 'с/у 1эт' } />
            </g>
            <g transform="translate(46, 47) scale(0.28) rotate(-90)">
                <TextTile text={ 'с/у 2эт' } />
            </g>
            <g transform="translate(59, 47) scale(0.28) rotate(-90)">
                <TextTile text={ 'Зал (Пр)' } />
            </g>
            <g transform="translate(72, 47) scale(0.28) rotate(-90)">
                <TextTile text={ 'Зал (Лев)' } />
            </g>
        </svg>
    </div>
);

export default HeatFloorLeft;
