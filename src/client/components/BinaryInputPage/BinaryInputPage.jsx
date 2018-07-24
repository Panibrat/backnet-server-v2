import * as React from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';

import { BinaryInputItem } from '../BinaryInputItem/BinaryInputItem';

import styles from './BinaryInputPage.css';

export class BinaryInputPage extends React.Component {
    componentDidMount() {
        console.log('this.props', this.props);
    }

    render() {
        return (
            <List className={styles.container}>
                <div className={styles.title}>
                    Binary Inputs Page
                </div>
                { this.props.bi.map((bi) =>
                    <BinaryInputItem
                        key={bi.title}
                        title={bi.title}
                        name={bi.name}
                        description={bi.description}
                        value={bi.value}
                        units={bi.units}
                    />
                )}
            </List>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        bi: store.bi,
    };
};

export default connect(mapStateToProps)(BinaryInputPage);