import * as React from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';

import BinaryOutputItem from '../BinaryOutputItem/BinaryOutputItem';

import styles from './BinaryOutputPage.css';

export class BinaryOutputPage extends React.Component {
    componentDidMount() {
        console.log('this.props', this.props);
    }

    render() {
        return (
            <List className={styles.container}>
                <div className={styles.title}>
                    Binary Outputs Page
                </div>
                { this.props.bo.map((bo) =>
                    <BinaryOutputItem
                        key={bo.title}
                        title={bo.title}
                        name={bo.name}
                        description={bo.description}
                        value={bo.value}
                        units={bo.units}
                    />
                )}
            </List>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        bo: store.bo,
    };
};

export default connect(mapStateToProps)(BinaryOutputPage);