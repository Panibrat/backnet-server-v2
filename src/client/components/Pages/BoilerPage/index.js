import BoilerPage from './BoilerPage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setTitle } from '../../../actions/menuActions';
import { findPoint } from'../../../common/helpers';

const pointsConfig = {
    ai: [
        3000174,
    ],
    ao: [
        3000209,
    ],
    bo: [
        3000266,
        3000265,
        3000264,
    ],
    bi: [
        3000254,
        3000255,
        3000253,
    ],
};

const mapStateToProps = (store) => {
    return {
        pointsConfig,

        iT_GVS_R: findPoint('AI3000174', store.ai),

        sT_GVS: findPoint('AO3000209', store.ao),

        sSTR_GVS: findPoint('BO3000266', store.bo),
        sS_GVS_R: findPoint('BO3000265', store.bo),
        sTMR_GVS: findPoint('BO3000264', store.bo),

        oPUMP_BOY: findPoint('BI3000254', store.bi),
        oPUMP_REC: findPoint('BI3000255', store.bi),
        oBOYLER: findPoint('BI3000253', store.bi),
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setTitle: setTitle
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(BoilerPage);
