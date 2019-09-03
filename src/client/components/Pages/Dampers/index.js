import DampersPage from './DampersPage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setTitle } from '../../../actions/menuActions';
import { findPoint } from'../../../common/helpers';

const pointsConfig = {
    ai: [
        3001125,
    ],
    ao: [
        3001146,
        3001147,
        3001148,
        3001149,
        3001150,
    ],
    bo: [],
    bi: [],
};

const mapStateToProps = (store) => {
    return {
        pointsConfig,
        dpFan: findPoint('AI3001125', store.ai),
        sD_L_K_B: findPoint('AO3001146', store.ao),
        sD_D1_D2: findPoint('AO3001147', store.ao),
        sD_R_K_B: findPoint('AO3001148', store.ao),
        sD_R_ZAL: findPoint('AO3001149', store.ao),
        sD_L_ZAL: findPoint('AO3001150', store.ao)
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setTitle: setTitle
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(DampersPage);
