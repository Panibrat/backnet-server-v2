import * as React from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';

import { AnalogValueItem } from '../AnalogValueItem/AnalogValueItem';

import styles from './AnalogValuePage.css';

export class AnalogValuePage extends React.Component {

    componentDidMount() {
        console.log('this.props', this.props);
    }

    render() {
        return (
            <List className={styles.container}>
                <div className={styles.title}>
                    Analog Value Page
                </div>
                <p style={{textAlign: "center"}}>{window.innerWidth} x {window.innerHeight}</p>
                { this.props.av.map((av) =>
                    <AnalogValueItem
                        key={av.title}
                        title={av.title}
                        name={av.name}
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