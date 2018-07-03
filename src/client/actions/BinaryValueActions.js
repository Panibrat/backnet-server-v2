import axios from 'axios';

import { GET_BV } from './actionsConstants';

export const getBVs = () => {
    return function(dispatch){
        axios.get('/bv')
            .then((response) => {
                const bvs = response.data;
                dispatch({
                    type: GET_BV,
                    payload: bvs
                })
            })
            .catch((err) => {
                console.log("\nGET response ERROR\n", err);
                dispatch({
                    type:"GET_BV_REJECTED",
                    payload:"there was an error while getting binary value"
                    //payload:err
                })
            })
    }
};