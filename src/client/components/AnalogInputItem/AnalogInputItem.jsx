import * as React from 'react';

export default class AnalogInputsItem extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('this.props', this.props);
    }

    render() {
        return (
            <div >
                <h5>AI:{this.props.title}/{this.props.description}--->{this.props.value}{this.props.units}</h5>
            </div>
        )
    }
}
