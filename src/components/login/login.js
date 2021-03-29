import React, {useState} from "react";
import PropTypes from 'prop-types';
import "./Login.css";

async function loginUser(credentials){
    return fetch('https://duck-feed-be.herokuapp.com/login',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(credentials)
    })
    .then(data => data.json())
}






export default function Login({setToken}){
    const [username,setUserName] = useState();
    const [password,setPassword] = useState();    
    const handleSubmit = async e=> {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
       if(typeof token==='string' && token.toLowerCase().includes('error')){
        alert(token);
       }
       else{
        setToken(token);
       }
    }
    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
            <label>
                <p>Username</p>
                <input type="text" onChange = { e => { setUserName(e.target.value)}} />
            </label></div>
            
            <div className="form-group">
                <label>
                <p>Password</p>
                <input type="password" onChange = { e => {setPassword(e.target.value)}} />
            </label></div>
            <div>
                <button type="submit">Login</button>
            </div>
            <div className="form-group" ></div>
            
        </form>
        </div>
    )
}

Login.propTypes = {
    setToken : PropTypes.func.isRequired
}