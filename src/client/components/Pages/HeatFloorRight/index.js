import HeatFloorRightPage from './HeatFloorRight';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setTitle } from '../../../actions/menuActions';
import { findPoint } from'../../../common/helpers';

const pointsConfig = {
    ai: [
        3000178,
        3000181,
        3000182,
        3000177,
        3000160,
        3001404,
    ],
    ao: [
        3000219,
        3000234,
        3000235,
    ],
    bo: [
        3000267,
        3000882,
        3000283,
    ],
    bi: [ 3000261 ],
};

const mapStateToProps = (store) => {
    return {
        pointsConfig,
        iT_HF_FO: findPoint('AI3000178', store.ai),
        oSP_HF: findPoint('AI3000181', store.ai),
        oHEAT_HF: findPoint('AI3000182', store.ai),
        iT_HF_KITCH: findPoint('AI3000177', store.ai),
        iT_KITCHEN: findPoint('AI3000160', store.ai),
        oHF_WC1: { value: 0 },
        oHF_WC2: { value: 0 },
        oHF_KITCH: findPoint('AI3001404', store.ai),
        oHF_HALL: { value: 0 },

        sT_HF_FOR: findPoint('AO3000219', store.ao),
        sT_K_MIN: findPoint('AO3000234', store.ao),
        sT_K_MAX: findPoint('AO3000235', store.ao),

        oPUMP_HF: findPoint('BI3000261', store.bi),

        sHF_AUTO: findPoint('BO3000267', store.bo),
        sSTR_KITCHEN: findPoint('BO3000882', store.bo),
        sHF_TCNT: findPoint('BO3000283', store.bo),
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setTitle: setTitle
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(HeatFloorRightPage);
