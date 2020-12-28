import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { NavLink } from 'react-router-dom';

import { openMenu, closeMenu } from '../../store/actions/menuActions';

import styles from './TemporaryDrawer.css';

export class TemporaryDrawer extends React.Component {

    render() {
        const sideList = (
            <div>
                <List className={styles.container}>
                    <NavLink to="analogInputs">
                            Analog Inputs
                    </NavLink>
                    <NavLink to="/analogOutputs">
                        <Button variant="outlined">
                            Analog Outputs
                        </Button>
                    </NavLink>
                    <NavLink to="/analogValues">
                        <Button variant="outlined">
                            Analog Value
                        </Button>
                    </NavLink>
                    <NavLink to="/binaryInputs">
                        <Button variant="outlined">
                            Binary Inputs
                        </Button>
                    </NavLink>
                    <NavLink to="/binaryOutputs">
                        <Button variant="outlined">
                            Binary Outputs
                        </Button>
                    </NavLink>
                    <NavLink to="/binaryValues">
                        <Button variant="outlined">
                            Binary Value
                        </Button>
                    </NavLink>
                    <NavLink to="/allPoints">
                        <Button variant="outlined">
                            All Points
                        </Button>
                    </NavLink>
                </List>
                <Divider />
                <List className={styles.container}>
                    <NavLink to="/hf-right">
                        <Button variant="outlined">
                            HF-R
                        </Button>
                    </NavLink>
                    <NavLink to="/so-right">
                        <Button variant="outlined">
                            SO-R
                        </Button>
                    </NavLink>
                    <NavLink to="/dampers">
                        <Button variant="outlined">
                            DAMPERS
                        </Button>
                    </NavLink>
                    <NavLink to="/air-unit">
                        <Button variant="outlined">
                            AHU
                        </Button>
                    </NavLink>
                    <NavLink to="/boiler">
                        <Button variant="outlined">
                            Boiler
                        </Button>
                    </NavLink>
                    <NavLink to="/heat-station">
                        <Button variant="outlined">
                            Heat Station
                        </Button>
                    </NavLink>
                    <NavLink to="/consumption">
                        <Button variant="outlined">
                            Consumption
                        </Button>
                    </NavLink>
                </List>
            </div>
        );
        return (
            <div>
                <Drawer open={this.props.menu.isMenuOpen} onClose={this.props.closeMenu}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.props.closeMenu}
                        onKeyDown={this.props.closeMenu}
                    >
                        {sideList}
                    </div>
                </Drawer>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        menu: store.menu
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        openMenu: openMenu,
        closeMenu: closeMenu
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(TemporaryDrawer);
