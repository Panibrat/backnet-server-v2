import AhuPage from './AhuPage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setTitle } from '../../../actions/menuActions';

const pointsConfig = {
    ai: [
        3001122,
        3000156,
        3001123,
        3001124,
        3001154,
        3001126,
    ],
    ao: [
        3001137,
        3001138,
        3001139,
        3001140,
        3001142,
        3001143,
        3001136,
    ],
    bo: [
        3001224,
        3001226,
        3001233,
        3001236,
    ],
    bi: [
        3001200,
        3001199,
        3001202,
        3001208,
        3001209,
        3001232,
        3001213,
        3001232,
        3001218,
    ],
    bv: [1,2,3,4],
};

const findPoint = (point, pointsList) => {
    const index = pointsList.findIndex(item => item.title === point);
    if (index === -1) {
        return 98;
    }
    return pointsList[index];
};

const mapStateToProps = (store) => {
    return {
        pointsConfig,
        tFor: findPoint('AI3001122', store.ai),
        tOut: findPoint('AI3000156', store.ai),
        tRet: findPoint('AI3001123', store.ai),
        tIsp: findPoint('AI3001124', store.ai),
        tComp: findPoint('AI3001154', store.ai),
        pFreon: findPoint('AI3001126', store.ai),
        setTemperatureDayHeat: findPoint('AO3001137', store.ao),
        setTemperatureNightHeat: findPoint('AO3001138', store.ao),
        setTemperatureDayCool: findPoint('AO3001139', store.ao),
        setTemperatureNightCool: findPoint('AO3001140', store.ao),
        setDamperMinWinter: findPoint('AO3001142', store.ao),
        setDamperMinSummer: findPoint('AO3001143', store.ao),
        sVSD: findPoint('AO3001136', store.ao),
        sSTART: findPoint('BO3001224', store.bo),
        sSEASON: findPoint('BO3001226', store.bo),
        sLOCAL: findPoint('BO3001233', store.bo),
        sALWAYS: findPoint('BO3001236', store.bo),
        oKKB: findPoint('BI3001200', store.bi),
        oFan: findPoint('BI3001199', store.bi),
        oHeat: findPoint('BI3001202', store.bi),
        oDamperTop: findPoint('BI3001208', store.bi),
        oDamperButtom: findPoint('BI3001209', store.bi),
        aFaza: findPoint('BI3001232', store.bi),
        aPV: findPoint('BI3001213', store.bi),
        aKKB: findPoint('BI3001218', store.bi)
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setTitle: setTitle
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(AhuPage);
