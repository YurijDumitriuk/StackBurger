import React from "react";
//import bcrypt from "bcrypt"
import './Registration.css';
import Navbar from "../components/Navbar";
import {useNavigate } from "react-router-dom";
import { User } from "../models/User";
import { environment } from '../env'
    
var name, password, phone, address;
var bcrypt = require('bcryptjs');

export default function Registration(){    
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
        const response = await fetch(environment.GetResUrl("/user/register"), requestOptions)
        const data = await response.json()
        return data
    }

    async function handleClick() {
        //var hashedPassword = await HashPassword(password)
        var user = new User(name, password, phone, address)
        //console.log(user);
        let data;
        try{ 
            data = await SendData(user);
        }
        catch{
            alert("error");
            alert("Server does not respond");
        }
        if(data.status === 200){
            navigate('/login')
        }       
        else{
            alert(data.title)
        }
    }
    

    return(
        <div>
            <Navbar />
            <div className="FormWrapper">
                <div className="RegistrationFormWrapper">
                    <form className="RegistrationForm">
                        <p className="RegistrationFormTitle">
                            Create Account
                        </p>
                        <p className="RegistrationFormField">
                            <input onChange={event => name = event.target.value} type="text" id="username" placeholder="Username" required/>
                        </p>
                        <p className="RegistrationFormField">
                            <input onChange={event => password = event.target.value} type="password" id="password" placeholder="Password" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"/>
                        </p>
                        <p className="RegistrationFormField">
                            <input onChange={event => phone = event.target.value} type="tel" id="mobilePhone" placeholder="Mobile Phone (+380694201369)" /*required pattern="+[0-9]{12}"*//>
                        </p>
                        <p className="RegistrationFormField">
                            <input onChange={event => address = event.target.value} type="text" id="address" placeholder="Address" />
                        </p>                        
                        <p className="RegistrationFormButton">
                            <button className="SubmitButton" onClick={()=>{handleClick()}} id="submitbutton" type="button">SIGN UP</button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

