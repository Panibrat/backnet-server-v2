import { connect } from 'react-redux';
import ControlContainer from './ControlContainer';
import { findPoint } from '../../common/helpers';

const mapStateToProps = (store) => {
    return {
        ais: store.ai,
        bis: store.bi,
        aos: store.ao,
        bos: store.bo,
        activeArea: store.plans.activeArea,
        findAi: (title) => findPoint(title, store.ai),
        findBi: (title) => findPoint(title, store.bi),
        findAo: (title) => findPoint(title, store.ao),
        findBo: (title) => findPoint(title, store.bo),
    };
};

export default connect(mapStateToProps)(ControlContainer);