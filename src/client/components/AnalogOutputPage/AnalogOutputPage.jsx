import * as React from 'react';
import SocketIO from '../../services/SocketService';
import { connect } from 'react-redux';

import AnalogOutputItem from '../AnalogOutputItem/AnalogOutputItem';

import styles from './AnalogOutputPage.css';

export class AnalogOutputPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('this.props', this.props);
        SocketIO.sendAO();
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

export default connect(mapStateToProps)(AnalogOutputPage);