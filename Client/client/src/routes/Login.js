import React from "react";
import './Login.css';
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { UserCredentials } from "../models/UserCredentials";
import { environment } from "../env";
import { useState } from "react";

var name, password;

export default function Login() {

    const [nameE, setNameE] = useState(false);
    const [passwordE, setPasswordE] = useState(false);
    
    const navigate = useNavigate();

    async function SendData(user){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }
        const response = await fetch(environment.GetResUrl("/user/login"), requestOptions)
        const data = await response.json()
        return data
    }

    function HandleErrors(errors){
        if(errors.Name === undefined){
            setNameE(false)
        }
        else{
            setNameE(true)
        }
        if(errors.Password === undefined){
            setPasswordE(false)
        }
        else{
            setPasswordE(true)
        }
    }

    async function handleClick() {
        var user = new UserCredentials(name, password)
        let data;
        console.log(user);
        try{ 
            data = await SendData(user);
        }
        catch{
            alert("error");
            alert("Server does not respond");
        }
        if(data.status === 200){
            console.log("User: ", data.data)
            localStorage.setItem("userId", data.data)
            navigate('/profile')
        }       
        else{
            HandleErrors(data.errors)
            console.log(data)
        }
    }

    return(
        <div>
            <Navbar />
            <div className="FormWrapperLogin">
                <div className="LoginFormWrapper">
                    <form className="LoginForm">
                        <p className="LoginFormTitle">
                            Please Login
                        </p>
                        <p className="LoginFormField">
                            <input onChange={event => name = event.target.value} type="text" id="username" placeholder="Username" /*required pattern="+[0-9]{12}"*//>
                        </p>
                        {nameE === true && 
                            <p className="LoginFormError">Incorrect username</p>
                        }
                        <p className="LoginFormField">
                            <input onChange={event => password = event.target.value} type="password" id="password" placeholder="Password" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"/>
                        </p>
                        {passwordE === true && 
                            <p className="LoginFormError">Incorrect password</p>
                        }
                        <p className="LoginFormButton">
                            <button className="SubmitButton" onClick={()=>{handleClick()}} id="submitbutton" type="button">SIGN IN</button>
                        </p>
                        <p className="LoginToRegister">
                            Don't have an account? <a href="/registration" className="LoginToRegisterLink">Register</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
