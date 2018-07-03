import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import { getAIs } from '../../actions/AnalogInputActions';

import AnalogInputItem from '../AnalogInputItem/AnalogInputItem';

import styles from './AnalogInputsPage.css';

export class AnalogInputsPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getAIs();
        console.log('this.props', this.props);
    }

    render() {
        return (
            <div className={styles.container}>
                <h1>Analog Inputs Page</h1>
                { this.props.ai.map((ai) =>
                    <AnalogInputItem
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
        ai: store.ai
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getAIs: getAIs
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(AnalogInputsPage);