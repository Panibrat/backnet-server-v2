import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import List from '@material-ui/core/List';

import { PowerConsumptionItem } from '../../MetersItems/PowerConsumptionItem/PowerConsumptionItem';
import { VoltageItem } from '../../MetersItems/VoltageItem/VoltageItem';
import { AmperItem } from '../../MetersItems/AmperItem/AmperItem';
import { PowerItem } from '../../MetersItems/PowerItem/PowerItem';
import { WaterConsumptionItem } from '../../MetersItems/WaterConsumptionItem/WaterConsumptionItem';
import { MoneyItem } from '../../MetersItems/MoneyItem/MoneyItem';
import { PowerDayConsumptionItem } from '../../MetersItems/PowerDayConsumptionItem/PowerDayConsumptionItem';
import { PowerNightConsumptionItem } from '../../MetersItems/PowerNightConsumptionItem/PowerNightConsumptionItem';
import { setTitle } from '../../../actions/menuActions';
import styles from './ConsumptionPage.css';

export class ConsumptionPage extends React.Component {
    componentDidMount() {
        this.props.setTitle('Потребление ресурсов');
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.values_container}>
                    <List>
                        <PowerItem {...this.props.PwrActiveTotal} />
                        <WaterConsumptionItem {...this.props.oWATER_COUNT} />
                        <WaterConsumptionItem {...this.props.oWATER_DAY} />
                        <MoneyItem {...this.props.oWATER_DAY}
                            multiple={0.01427}
                        />
                        <PowerConsumptionItem {...this.props.EnergyTotal} />
                        <PowerConsumptionItem {...this.props.EnergyDayTotal} />
                        <PowerConsumptionItem {...this.props.EnergyNightTotal} />

                        <PowerDayConsumptionItem {...this.props.oPWR_DAY} />

                        <MoneyItem {...this.props.oPWR_DAY}
                            multiple={1.68}
                        />
                        <PowerNightConsumptionItem {...this.props.oPWR_NIGHT} />
                        <MoneyItem {...this.props.oPWR_NIGHT}
                            multiple={0.84}
                        />
                        <VoltageItem {...this.props.L1N} />
                        <VoltageItem {...this.props.L2N} />
                        <VoltageItem {...this.props.L3N} />
                        <AmperItem {...this.props.I1} />
                        <AmperItem {...this.props.I2} />
                        <AmperItem {...this.props.I3} />
                        <PowerItem {...this.props.PWR1} />
                        <PowerItem {...this.props.PWR2} />
                        <PowerItem {...this.props.PWR3} />
                    </List>
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

const countDayConsumption = (store) => {
    const zeroDay = findPoint('AV3001393', store.av);
    const nowDay = store.modbus.EnergyDayTotal;
    return {
        title: zeroDay.title,
        description: zeroDay.description,
        value: nowDay.value - zeroDay.value,
    }
};

const mapStateToProps = (store) => {
    return {
        PwrActiveTotal: { ...store.modbus.PwrActiveTotal },
        I1: { ...store.modbus.I1 },
        I2: { ...store.modbus.I2 },
        I3: { ...store.modbus.I3 },
        L1N: { ...store.modbus.L1N },
        L2N: { ...store.modbus.L2N },
        L3N: { ...store.modbus.L3N },
        PWR1: { ...store.modbus.Pwr1 },
        PWR2: { ...store.modbus.Pwr2 },
        PWR3: { ...store.modbus.Pwr3 },
        EnergyTotal: { ...store.modbus.EnergyTotal },
        EnergyDayTotal: { ...store.modbus.EnergyDayTotal },
        EnergyNightTotal: { ...store.modbus.EnergyNightTotal },

        oWATER_COUNT: findPoint('AI3000370', store.ai),
        oWATER_DAY: findPoint('AI3000371', store.ai),
        oPWR_DAY: countDayConsumption(store),
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setTitle,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsumptionPage);
