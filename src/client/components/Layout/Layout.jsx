import * as React from 'react';

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: null,
            count: 123456
        };
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
