import BoilerPage from './BoilerPage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setTitle } from '../../../actions/menuActions';
import { setActiveArea } from '../../../actions/plansViewActions';
import { findPoint } from'../../../common/helpers';

const pointsConfig = {
    ai: [
        3000174,
        3000777,
        3000781,
    ],
    ao: [
        3000209,
        3000805,
    ],
    bo: [
        3000266,
        3000265,
        3000264,
        3000826,
        3000825,
        3000824,
    ],
    bi: [
        3000254,
        3000255,
        3000253,
        3000819,
        3000807,
    ],
};

const mapStateToProps = (store) => {
    return {
        pointsConfig,

        iT_GVS_R: findPoint('AI3000174', store.ai),
        iT_GVS_L: findPoint('AI3000777', store.ai),

        oPUMP_REC_L: (findPoint('AI3000781', store.ai)),

        sT_GVS_R: findPoint('AO3000209', store.ao),
        sT_GVS_L: findPoint('AO3000805', store.ao),

        sSTR_GVS_R: findPoint('BO3000266', store.bo),
        sSTR_GVS_L: findPoint('BO3000826', store.bo),
        sS_GVS_R: findPoint('BO3000265', store.bo),
        sS_GVS_L: findPoint('BO3000825', store.bo),
        sTMR_GVS_R: findPoint('BO3000264', store.bo),
        sTMR_GVS_L: findPoint('BO3000824', store.bo),

        oPUMP_BOY_R: findPoint('BI3000254', store.bi),
        oPUMP_BOY_L: findPoint('BI3000819', store.bi),
        oPUMP_REC_R: findPoint('BI3000255', store.bi),
        oBOYLER_R: findPoint('BI3000253', store.bi),
        oBOYLER_L: findPoint('BI3000807', store.bi),
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setTitle,
        setActiveArea,
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(BoilerPage);
