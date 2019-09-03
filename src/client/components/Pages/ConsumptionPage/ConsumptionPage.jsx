import * as React from 'react';
import SocketIO from '../../../services/SocketService';

import List from '@material-ui/core/List';

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
    componentDidMount() {
        this.props.setTitle('Потребление ресурсов');
        SocketIO.setRequestedPointsToBuffer(this.props.pointsConfig);
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
                        <PowerDayConsumptionItem {...this.props.oPWR_MONTH_DAY} />
                        <PowerNightConsumptionItem {...this.props.oPWR_MONTH_NIGHT} />
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

export default ConsumptionPage;
