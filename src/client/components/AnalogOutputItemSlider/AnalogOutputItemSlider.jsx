import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slider from '@material-ui/lab/Slider';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import voltageImg from './voltage.svg';
import settingsImg from './settings.svg';

import styles from './AnalogOutputItemSlider.css';

import SocketIO from '../../services/SocketService';

export class AnalogOutputItemSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            value: 0
        };
    }

    handleClickOpen = () => {
        this.setState({
            open: true,
            value: this.props.value
        });
    };

    handleClose = () => {
        this.setState({open: false},
            () => {
                console.log('this.state.value', this.state.value);
                SocketIO.writeAO({
                    title: this.props.title,
                    value: this.state.value
                })
            }
        );
    };

    handleCancel= () => {
        this.setState({ open: false });
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        return (
            <React.Fragment>
                <ListItem className={styles.container}>
                    <Avatar
                        alt="term"
                        src={voltageImg}
                    />
                    <ListItemText
                        className={styles.item}
                        primary={this.props.name}
                        secondary={this.props.description}/>
                    <div className={styles.data}>
                        <div className={styles.value}>
                            {this.props.value}
                        </div>
                        <div className={styles.units}>
                            {this.props.units}
                        </div>
                    </div>
                    <div>
                        <Button onClick={this.handleClickOpen} color="primary">
                            <Avatar
                                alt="term"
                                src={settingsImg}
                            />
                        </Button>
                        <Dialog
                            disableBackdropClick
                            disableEscapeKeyDown
                            open={this.state.open}
                            onClose={this.handleClose}
                        >
                            <DialogTitle>Положение заслонки</DialogTitle>
                            <h1 className={styles.dialog_value}>{this.state.value.toFixed(1)}{this.props.units}</h1>
                            <DialogContent>
                                <Slider
                                    value={this.state.value}
                                    min={this.props.minValue}
                                    max={this.props.maxValue}
                                    step={this.props.stepValue}
                                    onChange={this.handleChange} />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleCancel} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={this.handleClose} color="primary">
                                    Ok
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </ListItem>
                <li>
                    <Divider inset/>
                </li>
            </React.Fragment>
        )
    }
}
