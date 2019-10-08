import * as React from 'react';
import styles from './HeatingRadiatorsRight.css';

import { HeatingRadiatorsRightStaticBase } from './components/HeatingRadiatorsRightStaticBase/HeatingRadiatorsRightStaticBase';
import { PumpRadiatorCollector } from '../../Components/PumpRadiatorCollector/PumpRadiatorCollector';

import TemperatureTile from "../../../../common/Components/TemperatureTile/TemperatureTile";
import ValuePercentTile from "../../../../common/Components/ValuePercentTile/ValuePercentTile";
import TextTile from "../../../../common/Components/TextTile/TextTile";
import { valueToFixed } from "../../../../common/helpers";

export const HeatingRadiatorsRight = (props) => (
    <div className={styles.container}>
        <svg
            width="100%"
            height="100%"
            version="1.1"
            viewBox="0 0 360 300"
        >
            <HeatingRadiatorsRightStaticBase/>
            <PumpRadiatorCollector isOn={props.oPUMP.value } />
            <g transform="translate(305, 91)"> // T_FOR
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
            <g transform="translate(305, 65)"> // SP_T_FOR
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
            <g transform="translate(0, 15)"> // T_ZAL
                <TemperatureTile
                    temperature={ valueToFixed(props.iT_ZAL.value) }
                />
            </g>
            <g transform="translate(68, 75)"> // T_KITCHEN
                <TemperatureTile
                    temperature={ valueToFixed(props.iT_KITCHEN.value) }
                />
            </g>
            <g transform="translate(136, 15)"> // T_BEDROOM
                <TemperatureTile
                    temperature={ valueToFixed(props.iT_BEDROOM.value) }
                />
            </g>
            <g transform="translate(204, 75)"> // T_CABINET
                <TemperatureTile
                    temperature={ valueToFixed(props.iT_CABINET.value) }
                />
            </g>
            <g transform="translate(0, 145) scale(0.9)"> // oVLV_ZAL
                <ValuePercentTile
                    value={ valueToFixed(props.VLV_ZAL.value) }
                />
            </g>
            <g transform="translate(68, 145) scale(0.9)"> // oVLV_KITCHEN
                <ValuePercentTile
                    value={ valueToFixed(props.VLV_KITCHEN.value) }
                />
            </g>
            <g transform="translate(136, 145) scale(0.9)"> // oVLV_BEDROOM
                <ValuePercentTile
                    value={ valueToFixed(props.VLV_BEDROOM.value) }
                />
            </g>
            <g transform="translate(204, 145) scale(0.9)"> // oVLV_CABINET
                <ValuePercentTile
                    value={ valueToFixed(props.VLV_CABINET.value) }
                />
            </g>
            <g transform="translate(272, 145) scale(0.9)"> // oVLV_BASE
                <ValuePercentTile
                    value={ valueToFixed(props.VLV_BASE.value) }
                />
            </g>
            <g transform="translate(278, 250)"> // oHEAT
                <ValuePercentTile
                    value={ valueToFixed(props.oHEAT.value) }
                />
            </g>
            <g transform="translate(22, 170)  rotate(-90)">
                <TextTile text={ 'Зал' } />
            </g>
            <g transform="translate(90, 170)  rotate(-90)">
                <TextTile text={ 'Кухня' } />
            </g>
            <g transform="translate(158, 170)  rotate(-90)">
                <TextTile text={ 'Спальня' } />
            </g>
            <g transform="translate(226, 170)  rotate(-90)">
                <TextTile text={ 'Кабинет' } />
            </g>
            <g transform="translate(294, 170)  rotate(-90)">
                <TextTile text={ 'Подвал' } />
            </g>

        </svg>
    </div>
);

export default HeatingRadiatorsRight;
