import React, { useState } from "react";
//import bcrypt from "bcrypt"
import './Registration.css';
import Navbar from "../components/Navbar";
import {useNavigate } from "react-router-dom";
import { User } from "../models/User";
import { environment } from '../env'
    
var name, password, phone, address;

export default function Registration(){
    const [nameE, setNameE] = useState(false);
    const [passwordE, setPasswordE] = useState(false);
    const [phoneE, setPhoneE] = useState(false);
    const [addressE, setAddressE] = useState(false);
    const [existingUserE, setExistingUserE] = useState();    
    const navigate = useNavigate();

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
        if(errors.Phone === undefined){
            setPhoneE(false)
        }
        else{
            setPhoneE(true)
        }
        if(errors.Address === undefined){
            setAddressE(false)
            console.log("addres is correct")
        }
        else{
            setAddressE(true)
            console.log("addres is incorrect")
        }
    }

    async function handleClick() {
        //var hashedPassword = await HashPassword(password)
        var user = new User(name, password, phone, address)
        console.log(user);
        let data;
        try{ 
            data = await SendData(user);
        }
        catch{
            alert("Server does not respond");
        }
        if(data.status === 200){
            navigate('/login')
        }       
        else{
            console.log(data);
            if(data.errors !== undefined){
                setExistingUserE(null);
                HandleErrors(data.errors)
            }
            else{
                setNameE(false);
                setPasswordE(false);
                setPhoneE(false);
                setAddressE(false);
                setExistingUserE(data.message);
            }
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
                        {nameE === true && 
                            <p className="RegistrationFormError">Incorrect username</p>
                        }
                        <p className="RegistrationFormField">
                            <input onChange={event => password = event.target.value} type="password" id="password" placeholder="Password" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"/>
                        </p>
                        {passwordE === true && 
                            <p className="RegistrationFormError">Incorrect password</p>
                        }
                        <p className="RegistrationFormField">
                            <input onChange={event => phone = event.target.value} type="tel" id="mobilePhone" placeholder="Mobile Phone (0694201369)" /*required pattern="+[0-9]{12}"*//>
                        </p>
                        {phoneE === true && 
                            <p className="RegistrationFormError">Incorrect phone number</p>
                        }
                        <p className="RegistrationFormField">
                            <input onChange={event => address = event.target.value} type="text" id="address" placeholder="Address" />
                        </p>
                        {addressE === true && 
                            <p className="RegistrationFormError">Incorrect address</p>
                        }
                        {existingUserE !== null &&
                            <p className="RegistrationFormError">{existingUserE}</p>
                        }
                        <p className="RegistrationFormButton">
                            <button className="SubmitButton" onClick={()=>{handleClick()}} id="submitbutton" type="button">SIGN UP</button>
                        </p>
                    </form>    
                </div>
            </div>
        </div>
    );
}

