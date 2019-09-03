import HeatStationPage from './HeatStationPage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setTitle } from '../../../actions/menuActions';
import { findPoint } from'../../../common/helpers';

const pointsConfig = {
    ai: [
        3000157,
        3000158,
        3000171,
    ],
    ao: [],
    bo: [
        3000248,
    ],
    bi: [
        3000279,
        3000249,
        3000278,
        3000277,
    ],
};

const mapStateToProps = (store) => {
    return {
        pointsConfig,
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

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setTitle: setTitle
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(HeatStationPage);
