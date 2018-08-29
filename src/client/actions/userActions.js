import axios from 'axios';

export function login(email, password) {
    return function(dispatch){
        console.log('Login...');
        axios.post('/users/login', {
            email: email,
            password: password
        }).then((response) => {
            if (response.status === 200 && response.data) {
                const user = {
                    email: email,
                    token: response.data
                };
                localStorage.setItem('user', JSON.stringify(user));
                console.log('localStorage:', user);
                return user;
            }
        }).then((user) => {
            dispatch({
                type:'SET_USER',
                payload: user
            })
        })
            .catch((e) => {
            console.log('Error: cannot save to localstorage', e);
        });
    }
}

export function logout() {
    return function(dispatch){
        console.log('Logout...');
        localStorage.removeItem('user');
        dispatch({
            type:'CLEAR_USER'
        })
    }
}