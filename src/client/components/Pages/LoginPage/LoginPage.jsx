import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import ErrorMessagesPage from '../../ErrorMessagesPage/ErrorMessagesPage';

import { login, logout } from '../../../actions/userActions';
import styles from './LoginPage.css';

import { setTitle } from '../../../actions/menuActions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        // reset login status
        this.props.logout();
        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.setTitle('Авторизация');
    }


    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        console.log('submit');
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password);
        }
    }

    render() {
        const { username, password, submitted } = this.state;
        return (
            <div className={styles.container}>
                <TextField
                    error = { submitted && !username }
                    id="name"
                    name="username"
                    label="Name / Email"
                    className={styles.textField}
                    value={username}
                    onChange={this.handleChange}
                    margin="normal"
                />
                <TextField
                    error = { submitted && !password }
                    id="password-input"
                    label="Password"
                    name="password"
                    className={styles.textField}
                    type="password"
                    autoComplete="current-password"
                    onChange={this.handleChange}
                    margin="normal"
                />
                <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={this.handleSubmit}
                    className={styles.button}>
                    Login
                </Button>
                <ErrorMessagesPage />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        login: login,
        logout: logout,
        setTitle: setTitle
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
