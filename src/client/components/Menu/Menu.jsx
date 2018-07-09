import React from 'react';
import {
    NavLink,
} from 'react-router-dom';

export const Menu = () => (
    <div>
        <NavLink to="analogInputs">Analog Inputs</NavLink>
        <NavLink to="/analogOutputs">Analog Outputs</NavLink>
        <NavLink to="/analogValues">Analog Value</NavLink>
        <NavLink to="/binaryInputs">Binary Inputs</NavLink>
        <NavLink to="/binaryOutputs">Binary Outputs</NavLink>
        <NavLink to="/binaryValues">Binary Value</NavLink>
        <NavLink to="/AnalogInputsFolderList">Material UI</NavLink>
    </div>
);