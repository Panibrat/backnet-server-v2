import React from 'react';

const colors = ['grey', 'red'];

const Radiator = (props) => {
    const { isOn } = props;
    return (
        <g>
            <rect stroke="#666666" id="svg_600" height="8.007519" width="28.97022" y="0.464254" x="0.389572" fill="none"/>
            <rect stroke={ isOn ? colors[1] : colors[0] } id="svg_612" height="5.645543" width="1.131869" y="1.688269" x="1.565709" strokeWidth="1.5" fill="none"/>
            <rect stroke={ isOn ? colors[1] : colors[0] } id="svg_619" height="5.645543" width="1.131869" y="1.688269" x="5.889017" strokeWidth="1.5" fill="none"/>
            <rect stroke={ isOn ? colors[1] : colors[0] } id="svg_620" height="5.645543" width="1.131869" y="1.688269" x="10.11834" strokeWidth="1.5" fill="none"/>
            <rect stroke={ isOn ? colors[1] : colors[0] } id="svg_621" height="5.645543" width="1.131869" y="1.688269" x="14.347663" strokeWidth="1.5" fill="none"/>
            <rect stroke={ isOn ? colors[1] : colors[0] } id="svg_622" height="5.645543" width="1.131869" y="1.688269" x="18.670971" strokeWidth="1.5" fill="none"/>
            <rect stroke={ isOn ? colors[1] : colors[0] } id="svg_623" height="5.645543" width="1.131869" y="1.688269" x="22.900294" strokeWidth="1.5" fill="none"/>
            <rect stroke={ isOn ? colors[1] : colors[0] } id="svg_624" height="5.645543" width="1.131869" y="1.688269" x="27.035632" strokeWidth="1.5" fill="none"/>
        </g>
    )
};

export default Radiator;
