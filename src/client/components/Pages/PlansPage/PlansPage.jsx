import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FirstFloorItem  from '../../FirstFloorItem';
import { setTitle } from '../../../actions/menuActions';
import styles from './PlansPage.css';

class PlansPage extends React.Component {
    componentDidMount() {
        this.props.setTitle('Планы этажей');
    }
    render() {
        return (
            <div className={styles.container}>
                <FirstFloorItem />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setTitle: setTitle
    }, dispatch)
};

export default connect(null, mapDispatchToProps)(PlansPage);