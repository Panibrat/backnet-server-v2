import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import voltageImg from './voltage.svg';
import settingsImg from './settings.svg';

import styles from './AnalogValueItem.css';

import SocketIO from '../../services/SocketService';

export class AnalogValueItem extends React.Component {
    state = {
        open: false,
    };

    handleChange = () => event => {
        this.setState(
            {value: Number(event.target.value)},
            () => {
                console.log('this.state.value', this.state.value);
                SocketIO.writeAV({
                    title: this.props.title,
                    value: this.state.value
                })
            }
        );
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.value !== nextProps.value) || (this.state !== nextState);
    }

    componentDidMount() {
        this.setState({ value: this.props.value });
    }

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
                        secondary={this.props.description}
                    />
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
                            <DialogTitle>Уставка температуры</DialogTitle>
                            <DialogContent>
                                <form >
                                    <FormControl >

                                        <Select
                                            native
                                            value={this.state.value}
                                            onChange={this.handleChange()}
                                            input={<Input id="value-native-simple" />}
                                        >
                                            <option value={16}>16.0 C</option>
                                            <option value={16.5}>16.5 C</option>
                                            <option value={17}>17.0 C</option>
                                            <option value={17.5}>17.5 C</option>
                                            <option value={18}>18.0 C</option>
                                            <option value={18.5}>18.5 C</option>
                                            <option value={19}>19.0 C</option>
                                            <option value={19.5}>19.5 C</option>
                                            <option value={20}>20.0 C</option>
                                            <option value={20.5}>20.5 C</option>
                                            <option value={21}>21.0 C</option>
                                            <option value={21.5}>21.5 C</option>
                                            <option value={22}>22.0 C</option>
                                            <option value={22.5}>22.5 C</option>
                                            <option value={23}>23.0 C</option>
                                            <option value={23.5}>23.5 C</option>
                                            <option value={24}>24.0 C</option>
                                            <option value={24.5}>24.5 C</option>
                                            <option value={25}>25.0 C</option>
                                            <option value={25.5}>25.5 C</option>
                                            <option value={26}>26.0 C</option>
                                            <option value={26.5}>26.5 C</option>
                                            <option value={27}>27.0 C</option>
                                            <option value={27.5}>27.5 C</option>
                                            <option value={28}>28.0 C</option>
                                        </Select>
                                    </FormControl>
                                </form>
                            </DialogContent>
                            <DialogActions>
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

