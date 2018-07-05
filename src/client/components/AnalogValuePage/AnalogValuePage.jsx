import * as React from 'react';
import { connect } from 'react-redux';

import AnalogOutputItem from '../AnalogOutputItem/AnalogOutputItem';

import styles from './AnalogValuePage.css';

export class AnalogValuePage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('this.props', this.props);
    }

    render() {
        return (
            <div className={styles.container}>
                <h1>Analog Value Page</h1>
                { this.props.av.map((av) =>
                    <AnalogOutputItem
                        key={av.title}
                        title={av.title}
                        description={av.description}
                        value={av.value}
                        units={av.units}
                    />
                )}
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        av: store.av
    }
};

export default connect(mapStateToProps)(AnalogValuePage);