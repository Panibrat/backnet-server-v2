import * as React from 'react';

export const WaterHeater = (props) => (
    <g
        fill='none'
        fillOpacity='null'
        stroke={ props.isOn ? '#b71c1c' : '#212121' }
        strokeDasharray='none'
        strokeMiterlimit='4'
        strokeWidth='7'
    >
        <path
            d='M2.747 8.642S57.685 4.63 59.846 18.21c2.16 13.58-57.1 10.185-57.377 10.185'
            opacity='0.5'
            transform='matrix(.34254 0 0 .26458 36.129 247.523) translate(206.071 -32.325) translate(-206.576 32.325)'
        />
        <path
            d='M3.056 28.704s54.938-4.013 57.098 9.568c2.16 13.58-57.098 10.185-57.376 10.185'
            opacity='0.5'
            transform='matrix(.34254 0 0 .26458 36.129 247.523) translate(206.071 -32.325) translate(-206.576 32.325)'
        />
        <path
            d='M3.364 48.765s54.938-4.012 57.099 9.568C62.623 71.913 3.364 68.52 3.086 68.52'
            opacity='0.5'
            transform='matrix(.34254 0 0 .26458 36.129 247.523) translate(206.071 -32.325) translate(-206.576 32.325)'
        />
        <path
            d='M3.673 69.444s54.938-4.012 57.099 9.568c2.16 13.58-57.1 10.186-57.377 10.186'
            opacity='0.5'
            transform='matrix(.34254 0 0 .26458 36.129 247.523) translate(206.071 -32.325) translate(-206.576 32.325)'
        />
    </g>
);
