import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import SecondFloorItem from './SecondFloorItem';
import { findPoint } from '../../common/helpers';
import { setActiveArea } from '../../actions/plansViewActions';
import { setTitle } from '../../actions/menuActions';

const pointsConfig = {
    ai: [
        3000156,
        3000767,
        3000792,
        3000769,
        3000791,
        3000772,
        3000789,
        3000773,
        3000790,
        3000187,
        3000179,
        3001167,
        3001179,
        3000182,

    ],
    ao: [
        3000881,
        3000880,
        3000803,
        3001147,
        3000802,
        3000798,
        3001146,
        3000801,
        3001148,
        3001190,
    ],
    bo: [ 3001246 ],
    bi: [],
};

const mapStateToProps = (store) => {
    return {
        pointsConfig,
        temperatureOutdoor: findPoint('AI3000156', store.ai),
        temperatureD1: findPoint('AI3000767', store.ai),
        spTemperatureD1: findPoint('AI3000792', store.ai),
        temperatureD2: findPoint('AI3000769', store.ai),
        spTemperatureD2: findPoint('AI3000791', store.ai),
        temperatureCabinetLeft: findPoint('AI3000772', store.ai),
        spTemperatureCabinetLeft: findPoint('AI3000789', store.ai),
        temperatureBedroomLeft: findPoint('AI3000773', store.ai),
        spTemperatureBedroomLeft: findPoint('AI3000790', store.ai),
        temperatureCabinetRight: findPoint('AI3000187', store.ai),
        temperatureBedroomRight: findPoint('AI3000179', store.ai),
        temperatureHFWC2Left:  findPoint('AI3001167', store.ai),
        isOnSecondFloorHF_WC_Left: (findPoint('AI3001179', store.ai).value > 5) && (findPoint('BI3001240', store.bi).value > 0),
        isOnSecondFloorHF_WC_Right: (findPoint('AI3000182', store.ai).value > 5),
        spTemperatureBedroomRight: findPoint('AO3000881', store.ao),
        spTemperatureCabinetRight: findPoint('AO3000880', store.ao),
        activeArea: store.plans.activeArea,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setTitle,
        setActiveArea: setActiveArea,
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(SecondFloorItem);
