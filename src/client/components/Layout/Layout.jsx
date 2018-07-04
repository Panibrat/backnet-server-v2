import * as React from 'react';
import io from 'socket.io-client';

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: null,
        };
    }

    componentWillMount() {
        this.initSocket();
    }

    initSocket() {
        const socket = io();
        socket.on('connect', () => {
            console.log('Connnnnected');
        });
        this.setState({ socket });
    }

    emit() {
        const { socket } = this.state;
        socket.emit('test 1', {
            a: 1,
            b: 2,
            c: 234124
        });
        console.log('test 1 SEND');
    }

    componentDidMount() {
        this.emit();
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
