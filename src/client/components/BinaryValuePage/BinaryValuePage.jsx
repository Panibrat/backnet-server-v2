import * as React from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';

import BinaryValueItem from '../BinaryValueItem/BinaryValueItem';

import styles from './BinaryValuePage.css';

export class BinaryValuePage extends React.Component {
    componentDidMount() {
        console.log('this.props', this.props);
    }

    render() {
        return (
            <List className={styles.container}>
                <div className={styles.title}>
                    Binary Value Page
                </div>
                { this.props.bv.map((bv) =>
                    <BinaryValueItem
                        key={bv.title}
                        title={bv.title}
                        name={bv.name}
                        description={bv.description}
                        value={bv.value}
                        units={bv.units}
                    />
                )}
            </List>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        bv: store.bv,
    };
};

export default connect(mapStateToProps)(BinaryValuePage);
