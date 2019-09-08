import * as React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FirstFloorItem  from '../../FirstFloorItem';
import SecondFloorItem  from '../../SecondFloorItem';
import ControlContainer  from '../../ControlContainer';
import { setTitle } from '../../../actions/menuActions';
import styles from './PlansPage.css';

class PlansPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFirstFloorShown: true
        };

        this.toggleFloor = this.toggleFloor.bind(this);
    }

    componentDidMount() {
        this.props.setTitle('Планы этажей');
    }

    toggleFloor() {
        const title = this.state.isFirstFloorShown ? 'Второй этаж' : 'Первый этаж';
        this.props.setTitle(title);
        this.setState({
            isFirstFloorShown: !this.state.isFirstFloorShown
        })
    }

    render() {
        return (
            <div className={styles.container}>
                {this.state.isFirstFloorShown ? <FirstFloorItem /> : <SecondFloorItem />}
                <Button variant="contained" color="primary" onClick={this.toggleFloor}>
                    {this.state.isFirstFloorShown ? 'На Второй этаж' : 'На Первый этаж'}
                </Button>
                <ControlContainer />
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