import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { getAOs } from '../../actions/AnalogOutpuActions';

import AnalogOutputItem from '../AnalogOutputItem/AnalogOutputItem';

import styles from './AnalogOutputPage.css';

export class AnalogOutputPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getAOs();
        console.log('this.props', this.props);
    }

    render() {
        return (
            <div className={styles.container}>
                <h1>Analog Output Page</h1>
                { this.props.ao.map((ai) =>
                    <AnalogOutputItem
                        key={ai.title}
                        title={ai.title}
                        description={ai.description}
                        value={ai.value}
                        units={ai.units}
                    />
                )}
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        ao: store.ao
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getAOs: getAOs
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(AnalogOutputPage);