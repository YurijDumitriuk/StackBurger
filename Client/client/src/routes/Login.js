import React from "react";
import './Login.css';
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { UserCredentials } from "../models/UserCredentials";
import { environment } from "../env";

var name, password;
var bcrypt = require('bcryptjs');

export default function Login() {
    
    const navigate = useNavigate();

    async function HashPassword(password){
        const salt = await bcrypt.genSalt(6);
        const hashed = await bcrypt.hash(password, salt);
        return hashed;
    }

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

    async function handleClick() {
        //var hashedPassword = HashPassword(password)
        var user = new UserCredentials(name, password)
        let data;
        //console.log(user);
        try{ 
            data = await SendData(user);
        }
        catch{
            alert("error");
            alert("Server does not respond");
        }
        if(data.status === 200){
            localStorage.setItem("userId", data.data.id)
            navigate('/profile')
        }       
        else{
            alert(data.title)
        }
    }

    return(
        <div>
            <Navbar />
            <div className="FormWrapperLogin">
                <div className="LoginFormWrapper">
                    <form className="LoginForm">
                        <p className="LoginFormTitle">
                            Welcome back
                        </p>
                        <p className="LoginFormField">
                            <input onChange={event => name = event.target.value} type="text" id="username" placeholder="Username" /*required pattern="+[0-9]{12}"*//>
                        </p>
                        <p className="LoginFormField">
                            <input onChange={event => password = event.target.value} type="password" id="password" placeholder="Password" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"/>
                        </p>
                        <p className="LoginFormButton">
                            <button className="SubmitButton" onClick={()=>{handleClick()}} id="submitbutton" type="button">ENTER</button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
