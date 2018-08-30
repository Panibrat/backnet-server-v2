import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

import { clearError } from '../../actions/errorsActions';
import styles from './ErrorMessagesPage.css';

export const ErrorMessagesPage = (props) => (
    <div className={styles.container}>
        { props.errors.map((error, i) =>
            <Snackbar
                open={true}
                message={<span>{ `${i + 1}: ${error}`}</span>}
                action={
                    <Button color="inherit" size="small" onClick={props.clearError}>
                        Принято
                    </Button>
                }
                className={styles.snackbar}
            />
        )}
    </div>
);

function mapStateToProps(state) {
    return {
        errors: state.errors,
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        clearError: clearError,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessagesPage);
