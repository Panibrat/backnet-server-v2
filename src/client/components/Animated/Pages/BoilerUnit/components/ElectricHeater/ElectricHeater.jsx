import * as React from 'react';

export const ElectricHeater = (props) => (
    <g
        fill={props.isOn ? '#b71c1c' : '#212121'}
        stroke='#000'
        transform='matrix(.3071 0 0 .3038 50.057 258.775)'
    >
        <path d='M0.522 69.159H19.453999999999997V79.833H0.522z' />
        <path d='M6.577 1.092H13.399000000000001V69.15899999999999H6.577z' />
    </g>
);
