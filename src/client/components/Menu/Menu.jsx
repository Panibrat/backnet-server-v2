import React from 'react';
import {
    NavLink,
} from 'react-router-dom';

import Button from '@material-ui/core/Button';

export const Menu = () => (
    <div>
        <NavLink to="analogInputs">
            <Button variant="outlined">
                Analog Inputs
            </Button>
        </NavLink>
        <NavLink to="/analogOutputs">
            <Button variant="outlined">
                Analog Outputs
            </Button>
        </NavLink>
        <NavLink to="/analogValues">
            <Button variant="outlined">
                Analog Value
            </Button>
        </NavLink>
        <NavLink to="/binaryInputs">
            <Button variant="outlined">
                Binary Inputs
            </Button>
        </NavLink>
        <NavLink to="/binaryOutputs">
            <Button variant="outlined">
                Binary Outputs
            </Button>
        </NavLink>
        <NavLink to="/binaryValues">
            <Button variant="outlined">
                Binary Value
            </Button>
        </NavLink>
        <NavLink to="/allPoints">
            <Button variant="outlined">
                All Points
            </Button>
        </NavLink>
        <NavLink to="/kkb">
            <Button variant="outlined">
                KKB
            </Button>
        </NavLink>
        <NavLink to="/supply-fan">
            <Button variant="outlined">
                S.FAN
            </Button>
        </NavLink>
        <NavLink to="/air-unit">
            <Button variant="outlined">
                AHU
            </Button>
        </NavLink>
    </div>
);