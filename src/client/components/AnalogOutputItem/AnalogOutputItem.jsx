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

import styles from './AnalogOutputItem.css';


export class AnalogOutputItem extends React.Component {
    state = {
        open: false,
        age: '',
    };

    handleChange = name => event => {
        this.setState({ [name]: Number(event.target.value) });
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <React.Fragment>
                <ListItem className={styles.container}>
                    <Avatar
                        alt="term"
                        src={voltageImg}
                    />
                    <ListItemText primary={this.props.title} secondary={this.props.description}/>
                    <div className={styles.data}>
                        <div className={styles.value}>
                            {this.props.value}
                        </div>
                        <div className={styles.units}>
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
                                                value={this.state.age}
                                                onChange={this.handleChange('age')}
                                                input={<Input id="age-native-simple" />}
                                            >
                                                <option value={16}>+16.0 deg C</option>
                                                <option value={17}>+17.0 deg C</option>
                                                <option value={18}>+18.0 deg C</option>
                                                <option value={19}>+19.0 deg C</option>
                                                <option value={20}>+20.0 deg C</option>
                                                <option value={21}>+21.0 deg C</option>
                                                <option value={22}>+22.0 deg C</option>
                                                <option value={23}>+23.0 deg C</option>
                                                <option value={24}>+24.0 deg C</option>
                                                <option value={25}>+25.0 deg C</option>
                                                <option value={26}>+26.0 deg C</option>
                                                <option value={27}>+27.0 deg C</option>
                                                <option value={28}>+28.0 deg C</option>
                                            </Select>
                                        </FormControl>
                                    </form>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={this.handleClose} color="primary">
                                        Ok
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>


                    </div>
                </ListItem>
                <li>
                    <Divider inset/>
                </li>
            </React.Fragment>
        )
    }
}

