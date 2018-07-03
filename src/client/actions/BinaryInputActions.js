import axios from 'axios';

import { GET_BI } from './actionsConstants';

export const getBIs = () => {
    return function(dispatch){
        axios.get('/bi')
            .then((response) => {
                const bis = response.data;
                dispatch({
                    type: GET_BI,
                    payload: bis
                })
            })
            .catch((err) => {
                console.log("\nGET response ERROR\n", err);
                dispatch({
                    type:"GET_BI_REJECTED",
                    payload:"there was an error while getting binary inputs"
                    //payload:err
                })
            })
    }
};