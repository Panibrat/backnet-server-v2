import HeatingRadiatorsPage from './HeatingRadiatorsPage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setTitle } from '../../../actions/menuActions';
import { setActiveArea } from '../../../actions/plansViewActions';
import { findPoint } from'../../../common/helpers';

const pointsConfig = {
    ai: [
        // RIGHT
        3000159,
        3000169,
        3000161,
        3000160,
        3000172,
        3000187,
        3000179,
        3000164,
        3000163,
        3000165,
        3000166,
        // LEFT
        3000776,
        3000795,
        3000780,
        3000772,
        3000773,
        3000769,
        3000767,
        3000778,
        3000870,
        3000782,
        3000783,
        3000784,
        3000785,
        3000786,
        3000787,
        3000788,
    ],
    ao: [
        // RIGHT
        3000206,
        // LEFT
        3000869,
    ],
    bo: [
        // RIGHT
        3000262,
        3000263,
        // LEFT
        3000821,
        3000822,
    ],
    bi: [
        // RIGHT
        3000247,
        // LEFT
        3000818,
    ],
};

const mapStateToProps = (store) => {
    return {
        pointsConfig,
        iT_SO_FO_RIGHT: findPoint('AI3000159', store.ai),
        oSP_SO_RIGHT: findPoint('AI3000169', store.ai),
        oHEAT_SO_RIGHT: findPoint('AI3000161', store.ai),
        iT_KITCHEN_RIGHT: findPoint('AI3000160', store.ai),
        iT_ZAL_RIGHT: findPoint('AI3000172', store.ai),
        iT_CABINET_RIGHT: findPoint('AI3000187', store.ai),
        iT_BEDROOM_RIGHT: findPoint('AI3000179', store.ai),
        oSO_ZAL_RIGHT: findPoint('AI3000164', store.ai),
        oSO_KITCH_RIGHT: findPoint('AI3000163', store.ai),
        oSO_BEDROOM_RIGHT: findPoint('AI3000165', store.ai),
        oSO_CABINET_RIGHT: findPoint('AI3000166', store.ai),
        oSO_BASE_RIGHT: { value: 0 },

        oPUMP_SO_RIGHT: findPoint('BI3000247', store.bi),



        iT_SO_FO_LEFT: findPoint('AI3000776', store.ai),
        oSP_SO_LEFT: findPoint('AI3000795', store.ai),
        oHEAT_SO_LEFT: findPoint('AI3000780', store.ai),

        temperatureCabinetLeft: findPoint('AI3000772', store.ai),
        temperatureBedroomLeft: findPoint('AI3000773', store.ai),
        temperatureD2: findPoint('AI3000769', store.ai),
        temperatureD1: findPoint('AI3000767', store.ai),
        temperatureKitchenLeft: findPoint('AI3000778', store.ai),
        temperatureZalLeft: findPoint('AI3000870', store.ai),
        oSO_CABINET_LEFT: findPoint('AI3000782', store.ai),
        oSO_BEDROOM_LEFT: findPoint('AI3000783', store.ai),
        oSO_D2: findPoint('AI3000784', store.ai),
        oSO_D1: findPoint('AI3000785', store.ai),
        oSO_KITCH_LEFT: findPoint('AI3000786', store.ai),
        oSO_ZAL_LEFT: findPoint('AI3000788', store.ai),
        oSO_BASE_LEFT: findPoint('AI3000787', store.ai),

        oPUMP_SO_LEFT: findPoint('BI3000818', store.bi),
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setTitle,
        setActiveArea,
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(HeatingRadiatorsPage);
