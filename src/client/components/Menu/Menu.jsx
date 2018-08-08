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
        <NavLink to="/hf-right">
            <Button variant="outlined">
                HF-R
            </Button>
        </NavLink>
        <NavLink to="/so-right">
            <Button variant="outlined">
                SO-R
            </Button>
        </NavLink>
        <NavLink to="/dampers">
            <Button variant="outlined">
                DAMPERS
            </Button>
        </NavLink>
        <NavLink to="/air-unit">
            <Button variant="outlined">
                AHU
            </Button>
        </NavLink>
        <NavLink to="/boiler">
            <Button variant="outlined">
                Boiler
            </Button>
        </NavLink>
        <NavLink to="/heat-station">
            <Button variant="outlined">
                Heat Station
            </Button>
        </NavLink>
    </div>
);