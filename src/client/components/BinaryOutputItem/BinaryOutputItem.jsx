import React from 'react';
import Switch from '@material-ui/core/Switch';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import buttonImg from './power.svg';

import styles from './BinaryOutputItem.css';

export default class BinaryOutputItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOn: false };
        this.toggleOutput = this.toggleOutput.bind(this);
    }

    toggleOutput() {
        this.setState({ isOn: !this.state.isOn });
    }

    render() {
        return (
            <React.Fragment>
                <ListItem className={styles.container}>
                    <Avatar
                        alt="button"
                        src={buttonImg}
                    />
                    <ListItemText primary={this.props.title} secondary={this.props.description}/>
                    <div className={styles.data}>
                        <Switch
                            checked={this.state.isOn}
                            onChange={this.toggleOutput}
                        />
                    </div>
                </ListItem>
                <li>
                    <Divider inset />
                </li>
            </React.Fragment>
        )
    }
}

