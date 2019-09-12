import * as React from 'react';
import styles from './Pump.css';

export const Pump = (props) => (
    <g id='pumpGVS_Recirc' transform={`matrix(0 -.3621 -.3621 0 ${props.x} ${props.y})`}>
        <path
            fill='#34cdfa'
            fillOpacity='null'
            stroke='#000'
            strokeOpacity='null'
            strokeWidth='0.397'
            d='M162.859 338.851H172.592V344.899H162.859z'
        />
        <path
            fill='#34cdfa'
            fillOpacity='null'
            stroke='#000'
            strokeOpacity='null'
            strokeWidth='0.397'
            d='M156.906 304.739H167.3V310.881H156.906z'
        />
        <circle
            cx='164.945'
            cy='324.678'
            r='15.875'
            fill='#34cdfa'
            stroke='#000'
            strokeWidth='0.397'
        />
        <circle
            cx='164.712'
            cy='324.808'
            r='13.229'
            fill='#fff'
            stroke='#000'
            strokeWidth='0.397'
        />
        <circle
            cx='164.94'
            cy='324.722'
            r='13.229'
            fill='none'
            fillOpacity='null'
            stroke='#000'
            strokeOpacity='null'
            strokeWidth='0.397'
        />
        <g id='pumpMotor' transform='matrix(.05096 0 0 .05096 151.83 311.753)'>
            <circle cx='256' cy='256' r='234.667' fill='#e6f9fe' />
            <path
                fill='#34cdfa'
                d='M256 512C114.615 512 0 397.385 0 256S114.615 0 256 0s256 114.615 256 256c-.165 141.317-114.683 255.835-256 256zm0-469.333C138.179 42.667 42.667 138.179 42.667 256S138.179 469.333 256 469.333 469.333 373.821 469.333 256C469.204 138.233 373.767 42.796 256 42.667z'
            >
            </path>
            <circle id='zzz' cx='256' cy='256' r='50' fill='red' />
            <g fill='#99e6fd'>
                <path className={ props.isOn ? styles.rotating : null } d='M256 256s-6.613-149.333 100.053-149.333c85.333 0 85.333 149.333 42.667 149.333-36.053 0-78.72-64-121.387 0zM256 256s-125.973 80.469-179.307-11.904c-42.666-73.899 86.656-148.565 107.99-111.616 17.984 31.083-16.149 100.053 60.651 104.981zM256 256s132.672 68.864 79.339 161.237c-42.667 73.899-171.989-.768-150.656-37.717 17.984-31.061 94.784-36.053 60.651-104.981z' />
            </g>
            <linearGradient
                id='f'
                x1='-36.824'
                x2='-32.582'
                y1='632.363'
                y2='636.606'
                gradientTransform='matrix(21.3333 0 0 -21.3333 996.333 13791.667)'
                gradientUnits='userSpaceOnUse'
            >
                <stop offset='0' stopColor='#34CDFA' />
                <stop offset='1' stopColor='#E8D9F1' />
            </linearGradient>
            <circle cx='256' cy='256' r='64' fill='url(#f)' />
        </g>
    </g>

);
