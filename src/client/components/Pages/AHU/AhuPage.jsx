import * as React from 'react';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';

import  AirUnit  from '../../Animated/Pages/AirUnit/AirUnit';
import { AnalogInputItem } from '../../AnalogInputItem/AnalogInputItem';

import styles from './AhuPage.css';

export class AhuPage extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.title}>
                    AHU page
                </div>
                <p style={{textAlign: "center"}}>{window.innerWidth} x {window.innerHeight}</p>
                <AirUnit />
                <List>
                    <AnalogInputItem {...this.props.tFor}/>
                    <AnalogInputItem {...this.props.tOut}/>
                    <AnalogInputItem {...this.props.tRet}/>
                    <AnalogInputItem {...this.props.tIsp}/>
                    <AnalogInputItem {...this.props.tComp}/>
                    <AnalogInputItem {...this.props.pFreon}/>
                </List>
            </div>
        );
    }
}

const findPoint = (point, pointsList) => {
    const index = pointsList.findIndex(item => item.title === point);
    if (index === -1) {
        return 99
    }
    return pointsList[index]
}

const mapStateToProps = (store) => {
    return {
        tFor: findPoint('AI3000308', store.ai),
        tOut: findPoint('AI3000307', store.ai),
        tRet: findPoint('AI3000309', store.ai),
        tIsp: findPoint('AI3000310', store.ai),
        tComp: findPoint('AI3000359', store.ai),
        pFreon: findPoint('AI3000312', store.ai),
    };
};

export default connect(mapStateToProps)(AhuPage);