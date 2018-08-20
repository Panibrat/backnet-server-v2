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

const mapStateToProps = (store) => {
    return {
        PwrActiveTotal: findPoint('AV3000726', store.av),
        I1: findPoint('AV3000715', store.av),
        I2: findPoint('AV3000716', store.av),
        I3: findPoint('AV3000717', store.av),
        L1N: findPoint('AV3000719', store.av),
        L2N: findPoint('AV3000720', store.av),
        L3N: findPoint('AV3000721', store.av),
        PWR1: findPoint('AV3000723', store.av),
        PWR2: findPoint('AV3000724', store.av),
        PWR3: findPoint('AV3000725', store.av),
        EnergyTotal: findPoint('AV3000729', store.av),
        EnergyDayTotal: findPoint('AV3000730', store.av),
        EnergyNightTotal: findPoint('AV3000731', store.av),

        oPWR_DAY: findPoint('AI3000375', store.ai),
        oPWR_NIGHT: findPoint('AI3000376', store.ai),
        oWATER_COUNT: findPoint('AI3000370', store.ai),
        oWATER_DAY: findPoint('AI3000371', store.ai),

    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setTitle: setTitle
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsumptionPage);