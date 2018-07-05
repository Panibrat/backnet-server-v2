import axios from 'axios';

import { GET_BO, UPDATE_BINARY_OUTPUT } from './actionsConstants';

export const getBOs = () => {
    return function(dispatch){
        axios.get('/bo')
            .then((response) => {
                const bis = response.data;
                dispatch({
                    type: GET_BO,
                    payload: bos
                })
            })
            .catch((err) => {
                console.log("\nGET response ERROR\n", err);
                dispatch({
                    type:"GET_BO_REJECTED",
                    payload:"there was an error while getting binary output"
                    //payload:err
                })
            })
    }
};

export const updateBO = (point) => {
    return {
        type: UPDATE_BINARY_OUTPUT,
        payload: point
    };
};