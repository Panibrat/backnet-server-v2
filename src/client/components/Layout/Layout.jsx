import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import TemporaryDrawer from '../Menu/TemporaryDrawer';

import { openMenu } from '../../actions/menuActions';

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

export class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isMenuOpen: false };
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            onClick={this.props.openMenu}
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            {this.props.menu.title}
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <TemporaryDrawer />
                {this.props.children}
            </div>
        )
    }

}

const mapStateToProps = (store) => {
    return {
        menu: store.menu
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        openMenu: openMenu
    }, dispatch)
};

Layout.propTypes = {
    classes: PropTypes.object.isRequired,
};

Layout = connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout);

export default withStyles(styles)(Layout);

