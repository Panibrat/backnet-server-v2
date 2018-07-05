import axios from 'axios';

import { GET_AI, UPDATE_ANALOG_INPUT } from './actionsConstants';

export const getAIs = () => {
    return function(dispatch){
        axios.get('/ai')
            .then((response) => {
                const ais = response.data;
                dispatch({
                    type: GET_AI,
                    payload: ais
                })
            })
            .catch((err) => {
                console.log("\nGET response ERROR\n", err);
                dispatch({
                    type:"GET_AI_REJECTED",
                    payload:"there was an error while getting analog inputs"
                    //payload:err
                })
            })
    }
};

export const updateAI = (point) => {
    return {
        type: UPDATE_ANALOG_INPUT,
        payload: point
    };
};