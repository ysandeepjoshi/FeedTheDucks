import {useState} from 'react';

export default function useToken(){
    let isAdmin = false;
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        if(userToken?.admin){isAdmin=true;}
        return userToken?.token
    };
    const [token,setToken] = useState(getToken());

    const saveToken = userToken =>{
        sessionStorage.setItem('token',JSON.stringify(userToken));
        setToken(userToken.token);
    }
    
    return {
        setToken: saveToken,
        token,
        isAdmin
    }
}