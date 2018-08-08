import * as React from 'react';
import { connect } from 'react-redux';

import { PowerConsumptionItem } from '../../MetersItems/PowerConsumptionItem/PowerConsumptionItem';
import { VoltageItem } from '../../MetersItems/VoltageItem/VoltageItem';
import { AmperItem } from '../../MetersItems/AmperItem/AmperItem';
import { PowerItem } from '../../MetersItems/PowerItem/PowerItem';
import { WaterConsumptionItem } from '../../MetersItems/WaterConsumptionItem/WaterConsumptionItem';
import { MoneyItem } from '../../MetersItems/MoneyItem/MoneyItem';
import { PowerDayConsumptionItem } from '../../MetersItems/PowerDayConsumptionItem/PowerDayConsumptionItem';
import { PowerNightConsumptionItem } from '../../MetersItems/PowerNightConsumptionItem/PowerNightConsumptionItem';

import styles from './ConsumptionPage.css';

export class ConsumptionPage extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.title}>
                    Consumption Page
                </div>
                <p style={{textAlign: "center"}}>{window.innerWidth} x {window.innerHeight}</p>
                <div className={styles.values_container}>
                    <WaterConsumptionItem
                        name={'oWATER_COUNT'}
                        description={'Счетчик воды'}
                        value={9168670}
                        units={'м3'}
                    />
                    <WaterConsumptionItem
                        name={'oWATER_DAY'}
                        description={'Сегодня потребили'}
                        value={1234}
                        units={'м3'}
                    />
                    <MoneyItem
                        name={'oWATER_DAY'}
                        description={'Сегодня потребили'}
                        value={1234}
                        units={'UAH'}
                        multiple={0.01427}
                    />
                    <PowerConsumptionItem />
                    <PowerConsumptionItem value={225789123} />
                    <PowerConsumptionItem value={25789123} />
                    <PowerDayConsumptionItem
                        value={15.587}
                    />
                    <MoneyItem
                        name={'PowerDay'}
                        description={'Потребление энергии. День.'}
                        value={15.587}
                        units={'UAH'}
                        multiple={1.68}
                    />
                    <PowerNightConsumptionItem
                        value={32.432}
                    />
                    <MoneyItem
                        name={'PowerNight'}
                        description={'Потребление энергии. Ночь.'}
                        value={32.432}
                        units={'UAH'}
                        multiple={0.84}
                    />
                    <VoltageItem
                        name={'U1'}
                        description={'Напряжение 1й фазы'}
                        value={221.5}
                        units={'V'}
                    />
                    <VoltageItem
                        name={'U2'}
                        description={'Напряжение 2й фазы'}
                        value={223.4}
                        units={'V'}
                    />
                    <VoltageItem
                        name={'U3'}
                        description={'Напряжение 3й фазы'}
                        value={220.9}
                        units={'V'}
                    />
                    <AmperItem
                        name={'I1'}
                        description={'Ток 1й фазы'}
                        value={2.93}
                        units={'A'}
                    />
                    <AmperItem
                        name={'I2'}
                        description={'Ток 2й фазы'}
                        value={4.73}
                        units={'A'}
                    />
                    <AmperItem
                        name={'I3'}
                        description={'Ток 3й фазы'}
                        value={10.88}
                        units={'A'}
                    />
                    <PowerItem
                        name={'Power 1'}
                        description={'Потребление 1й фазы'}
                        value={3.68}
                        units={'kW'}
                    />
                    <PowerItem
                        name={'Power 2'}
                        description={'Потребление 2й фазы'}
                        value={15.77}
                        units={'kW'}
                    />
                    <PowerItem
                        name={'Power 3'}
                        description={'Потребление 3й фазы'}
                        value={0.97}
                        units={'kW'}
                    />
                </div>
            </div>
        );
    }
}

const findPoint = (point, pointsList) => {
    const index = pointsList.findIndex(item => item.title === point);
    if (index === -1) {
        return 99;
    }
    return pointsList[index];
};

const mapStateToProps = (store) => {
    return {
        iT_SUP: findPoint('AI3000157', store.ai),
        iT_RET: findPoint('AI3000158', store.ai),
        oSP_KOT: findPoint('AI3000171', store.ai),

        oPUMP_EL: findPoint('BI3000279', store.bi),
        oKOTEL: findPoint('BI3000249', store.bi),
        oEL_1X: findPoint('BI3000278', store.bi),
        oEL_2X: findPoint('BI3000277', store.bi),

        sEL_KOTEL: findPoint('BO3000248', store.bo),
    };
};

export default connect(mapStateToProps)(ConsumptionPage);
