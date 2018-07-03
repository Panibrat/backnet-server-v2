import axios from 'axios';

import { GET_AO } from './actionsConstants';

export const getAOs = () => {
    return function(dispatch){
        axios.get('/ao')
            .then((response) => {
                const aos = response.data;
                dispatch({
                    type: GET_AO,
                    payload: aos
                })
            })
            .catch((err) => {
                console.log("\nGET response ERROR\n", err);
                dispatch({
                    type:"GET_AO_REJECTED",
                    payload:"there was an error while getting analog outputs"
                    //payload:err
                })
            })
    }
};