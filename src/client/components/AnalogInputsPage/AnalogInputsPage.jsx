import * as React from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';

import { AnalogInputItem } from '../AnalogInputItem/AnalogInputItem';

import styles from './AnalogInputsPage.css';

export class AnalogInputsPage extends React.Component {
    componentDidMount() {
        console.log('this.props', this.props);
    }

    render() {
        return (
            <List className={styles.container}>
                <div className={styles.title}>
                    Analog Inputs Page
                </div>
                { this.props.ai.map((ai) =>
                    <AnalogInputItem
                        key={ai.title}
                        title={ai.title}
                        name={ai.name}
                        description={ai.description}
                        value={ai.value}
                        units={ai.units}
                    />
                )}
            </List>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        ai: store.ai,
    };
};

export default connect(mapStateToProps)(AnalogInputsPage);
