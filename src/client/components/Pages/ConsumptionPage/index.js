import ConsumptionPage from './ConsumptionPage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setTitle } from '../../../actions/menuActions';
import { findPoint } from'../../../common/helpers';

const pointsConfig = {
    ai: [
        3001160,
        3001161,
    ],
};

const countDayConsumption = (store) => {
    const zeroDay = findPoint('AV3001393', store.av);
    const nowDay = store.modbus.EnergyDayTotal ? store.modbus.EnergyDayTotal : 0;
    return {
        title: 'Day Energy',
        description: 'Сегодня: дневной тариф',
        value: (nowDay.value - zeroDay.value) / 1000,
    }
};

const countNightConsumption = (store) => {
    const zeroNight = findPoint('AV3001394', store.av);
    const nowNight = store.modbus.EnergyNightTotal ? store.modbus.EnergyNightTotal : 0;
    return {
        title: 'Night Energy',
        description: 'Сегодня: ночной тариф',
        value: (nowNight.value - zeroNight.value) / 1000,
    }
};

const countMonthConsumptionDay = (store) => {
    const zeroDay = findPoint('AV3001396', store.av);
    const nowDay = store.modbus.EnergyDayTotal ? store.modbus.EnergyDayTotal : 0;
    return {
        title: 'Month: Day Energy',
        description: 'За месяц: дневной тариф',
        value: (nowDay.value - zeroDay.value) / 1000,
    }
};

const countMonthConsumptionNight = (store) => {
    const zeroNight = findPoint('AV3001395', store.av);
    const nowNight = store.modbus.EnergyNightTotal ? store.modbus.EnergyNightTotal : 0;
    return {
        title: 'Month: Night Energy',
        description: 'За месяц: ночной тариф',
        value: (nowNight.value - zeroNight.value) / 1000,
    }
};
const mapStateToProps = (store) => {
    return {
        pointsConfig,
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

        oWATER_COUNT: findPoint('AI3001160', store.ai),
        oWATER_DAY: findPoint('AI3001161', store.ai),
        oPWR_DAY: countDayConsumption(store),
        oPWR_NIGHT: countNightConsumption(store),
        oPWR_MONTH_DAY: countMonthConsumptionDay(store),
        oPWR_MONTH_NIGHT: countMonthConsumptionNight(store),
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setTitle,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsumptionPage);
