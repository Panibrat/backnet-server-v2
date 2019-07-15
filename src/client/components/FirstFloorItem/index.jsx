import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import FirstFloorItem from './FirstFloorItem';
import { findPoint } from '../../common/helpers';
import { setActiveArea } from '../../actions/plansViewActions';
import { setTitle } from '../../actions/menuActions';

const mapStateToProps = (store) => {
    return {
        temperatureOutdoor: findPoint('AI3000156', store.ai),
        temperatureZalLeft: findPoint('AI3000870', store.ai),
        spTemperatureZalLeft: findPoint('AI3000794', store.ai),
        temperatureKitchenLeft: findPoint('AI3000778', store.ai),
        spTemperatureKitchenLeft: findPoint('AI3000793', store.ai),
        temperatureHFKitchenLeft: findPoint('AI3001164', store.ai),
        temperatureHFWC1Left: findPoint('AI3001166', store.ai),
        temperatureHFHallLeft: findPoint('AI3001165', store.ai),
        temperatureHFZal_L_Left: findPoint('AI3001169', store.ai),
        temperatureHFZal_R_Left: findPoint('AI3001168', store.ai),
        temperatureZalRight: findPoint('AI3000172', store.ai),
        spTemperatureZalRight: findPoint('AI3000173', store.ai),
        spTemperatureKitchenRight: findPoint('AO3000879', store.ao),
        temperatureKitchenRight: findPoint('AI3000160', store.ai),
        temperatureHFKitchenRight: findPoint('AI3000177', store.ai),
        isOnFirstFloorHF_WC_Left: (findPoint('AI3001178', store.ai).value > 5) && (findPoint('BI3001240', store.bi).value > 0),
        isOnFirstFloorHF_kitchen_Left: (findPoint('AI3001176', store.ai).value > 5) && (findPoint('BI3001240', store.bi).value > 0),
        isOnFirstFloorHF_zal_Left: (findPoint('AI3001180', store.ai).value > 5) && (findPoint('BI3001240', store.bi).value > 0),
        isOnFirstFloorHF_hall_Left: (findPoint('AI3001177', store.ai).value > 5) && (findPoint('BI3001240', store.bi).value > 0),
        isOnFirstFloorHF_kitchen_Right: (findPoint('AI3000182', store.ai).value > 5),
        isOnFirstFloorHF_WC_Right: (findPoint('AI3000182', store.ai).value > 5),
        isOnFirstFloorHF_hall_Right: (findPoint('AI3000182', store.ai).value > 5),
        activeArea: store.plans.activeArea,
        isOnFirstFloorSO_zal_Right: (findPoint('AI3000164', store.ai).value > 5) && (findPoint('BI3000247', store.bi).value > 0),
        isOnFirstFloorSO_kitchen_Right: (findPoint('AI3000163', store.ai).value > 5) && (findPoint('BI3000247', store.bi).value > 0),
        isOnFirstFloorSO_zal_Left: (findPoint('AI3000788', store.ai).value > 5) && (findPoint('BI3000818', store.bi).value > 0),
        isOnFirstFloorSO_kitchen_Left: (findPoint('AI3000786', store.ai).value > 5) && (findPoint('BI3000818', store.bi).value > 0),
    };

};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setActiveArea: setActiveArea,
        setHeaderTitle: setTitle,
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(FirstFloorItem);
