import axios from 'axios';

import { GET_AV, UPDATE_ANALOG_VALUE } from './actionsConstants';

export const getAVs = () => {
    return function(dispatch){
        axios.get('/av')
            .then((response) => {
                const avs = response.data;
                dispatch({
                    type: GET_AV,
                    payload: avs
                })
            })
            .catch((err) => {
                console.log("\nGET response ERROR\n", err);
                dispatch({
                    type:"GET_AV_REJECTED",
                    payload:"there was an error while getting analog values"
                    //payload:err
                })
            })
    }
};

export const updateAV = (point) => {
    return {
        type: UPDATE_ANALOG_VALUE,
        payload: point
    };
};