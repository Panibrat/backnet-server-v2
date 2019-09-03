import HeatingRadiatorsRightPage from './HeatingRadiatorsRightPage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setTitle } from '../../../actions/menuActions';
import { findPoint } from'../../../common/helpers';

const pointsConfig = {
    ai: [
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
        3000162,
    ],
    ao: [
        3000206,
    ],
    bo: [
        3000262,
        3000263,
    ],
    bi: [ 3000247 ],
};

const mapStateToProps = (store) => {
    return {
        pointsConfig,
        iT_SO_FO: findPoint('AI3000159', store.ai),
        oSP_SO: findPoint('AI3000169', store.ai),
        oHEAT_SO: findPoint('AI3000161', store.ai),
        iT_KITCHEN: findPoint('AI3000160', store.ai),
        iT_ZAL: findPoint('AI3000172', store.ai),
        iT_CABINET: findPoint('AI3000187', store.ai),
        iT_BEDROOM: findPoint('AI3000179', store.ai),
        oSO_ZAL: findPoint('AI3000164', store.ai),
        oSO_KITCH: findPoint('AI3000163', store.ai),
        oSO_BEDROOM: findPoint('AI3000165', store.ai),
        oSO_CABINET: findPoint('AI3000166', store.ai),
        oSO_BASE: findPoint('AI3000162', store.ai),

        sT_SO_FOR: findPoint('AO3000206', store.ao),

        oPUMP_SO: findPoint('BI3000247', store.bi),

        sSTR_SO: findPoint('BO3000262', store.bo),
        sSO_AUTO: findPoint('BO3000263', store.bo),
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setTitle: setTitle
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(HeatingRadiatorsRightPage);
