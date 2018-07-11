import * as React from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';

import SocketService from '../../services/SocketService';

import { AnalogOutputItem } from '../AnalogOutputItem/AnalogOutputItem';

import styles from './AnalogValuePage.css';

export class AnalogValuePage extends React.Component {

    componentDidMount() {
        console.log('this.props', this.props);
        this.writeValue({ title: 'AV3000130', value: 777 });
    }

    writeValue(point) {
        SocketService.writeAV(point);
    }

    render() {
        return (
            <List className={styles.container}>
                <div className={styles.title}>
                    Analog Value Page
                </div>
                { this.props.av.map((av) =>
                    <AnalogOutputItem
                        key={av.title}
                        title={av.title}
                        description={av.description}
                        value={av.value}
                        units={av.units}
                    />
                )}
            </List>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        av: store.av
    }
};

export default connect(mapStateToProps)(AnalogValuePage);