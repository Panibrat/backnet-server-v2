import HeatFloorsPage from './HeatFloorsPage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setTitle } from '../../../actions/menuActions';
import { setActiveArea } from '../../../actions/plansViewActions';
import { findPoint } from'../../../common/helpers';

const pointsConfig = {
    ai: [
        // RIGHT
        3000178,
        3000181,
        3000182,
        3000177,
        3000160,
        // LEFT
        3001170,
        3001175,
        3001182,
        3000778,
        3000870,
        3001164,
        3001165,
        3001166,
        3001167,
        3001168,
        3001169,
        3001176,
        3001177,
        3001178,
        3001179,
        3001181,
        3001180,

    ],
    ao: [
        // RIGHT
        3000219,
        3000234,
        3000235,
        // LEFT
        3001185,
        3001188,
        3001189,
        3001190,
        3001191,
        3001192,
        3001193,
        3001184,
    ],
    bo: [
        // RIGHT
        3000267,
        3000882,
        3000283,
        // LEFT
        3001241,
        3001242,
        3001243,
        3001244,
        3001245,
        3001246,
        3001247,
    ],
    bi: [
        3000261,
        3001240,
    ],
};

const mapStateToProps = (store) => {
    return {
        pointsConfig,
        iT_HF_FO_RIGHT: findPoint('AI3000178', store.ai),
        oSP_HF_RIGHT: findPoint('AI3000181', store.ai),
        oHEAT_HF_RIGHT: findPoint('AI3000182', store.ai),
        temperatureHFKitchenRight: findPoint('AI3000177', store.ai),
        temperatureKitchenRight: findPoint('AI3000160', store.ai),

        oPUMP_HF_RIGHT: findPoint('BI3000261', store.bi),

        iT_HF_FO_LEFT: findPoint('AI3001170', store.ai),
        oSP_HF_LEFT: findPoint('AI3001175', store.ai),
        oHEAT_HF_LEFT: findPoint('AI3001182', store.ai),
        temperatureKitchenLeft: findPoint('AI3000778', store.ai),
        temperatureZalLeft: findPoint('AI3000870', store.ai),
        temperatureHFKitchenLeft: findPoint('AI3001164', store.ai),
        temperatureHFHallLeft: findPoint('AI3001165', store.ai),
        temperatureHFWC1Left: findPoint('AI3001166', store.ai),
        temperatureHFWC2Left:  findPoint('AI3001167', store.ai),
        temperatureHFZal_R_Left: findPoint('AI3001168', store.ai),
        temperatureHFZal_L_Left: findPoint('AI3001169', store.ai),
        valveHF_kitchen_Left: findPoint('AI3001176', store.ai),
        valveHF_hall_Left: findPoint('AI3001177', store.ai),
        valveHF_WC1_Left: findPoint('AI3001178', store.ai),
        valveHF_WC2_Left: findPoint('AI3001179', store.ai),
        valveHF_zal_Right: findPoint('AI3001181', store.ai),
        valveHF_zal_Left: findPoint('AI3001180', store.ai),

        oPUMP_HF_LEFT: findPoint('BI3001240', store.bi),

        sT_HF_FOR_RIGHT: findPoint('AO3000219', store.ao),
        sT_K_MIN_RIGHT: findPoint('AO3000234', store.ao),
        sT_K_MAX_RIGHT: findPoint('AO3000235', store.ao),

        sHF_AUTO_RIGHT: findPoint('BO3000267', store.bo),
        sSTR_KITCHEN_RIGHT: findPoint('BO3000882', store.bo),
        sHF_TCNT_RIGHT: findPoint('BO3000283', store.bo),
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setTitle,
        setActiveArea,
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(HeatFloorsPage);
