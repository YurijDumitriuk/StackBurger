import React,{Component} from "react";
import './RegistrationPopup.css';
import { useNavigate } from "react-router-dom";
import { User } from "../models/User";
import { environment } from "../env";
import { useState } from "react";

var name, password, phone, address;
var incPassword = false, incUsername = false, incPhone = false, incAddress = false;

export default function RegistrationPopup(props) {
    
    const [nameE, setNameE] = useState(false);
    const [passwordE, setPasswordE] = useState(false);
    const [phoneE, setPhoneE] = useState(false);
    const [addressE, setAddressE] = useState(false);    
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
        console.log(incUsername, incPassword, incPhone, incAddress)
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
            console.log(data.errors)
            HandleErrors(data.errors)
            //alert(data.title)
        }
    }
    
    return(
        <div className="FormWrapperRegistration">
            <div className="PopupRegistrationFormWrapper">
                <span className="CloseIcon" onClick={props.handleClose}>x</span>
                <form className="PopupRegistrationForm">
                    <p className="PopupRegistrationFormTitle">
                        Create Account
                    </p>
                    <p className="PopupRegistrationFormField">
                        <input onChange={event => name = event.target.value} type="text" id="username" placeholder="Username" required/>
                    </p>
                    {nameE === true && 
                        <p className="PopupRegistrationFormError">Incorrect username</p>
                    }
                    <p className="PopupRegistrationFormField">
                        <input onChange={event => password = event.target.value} type="password" id="password" placeholder="Password" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"/>
                    </p>
                    {passwordE === true && 
                        <p className="PopupRegistrationFormError">Incorrect password</p>
                    }
                    <p className="PopupRegistrationFormField">
                        <input onChange={event => phone = event.target.value} type="tel" id="mobilePhone" placeholder="Mobile Phone (+380694201369)" /*required pattern="+[0-9]{12}"*//>
                    </p>
                    {phoneE === true && 
                        <p className="PopupRegistrationFormError">Incorrect phone number</p>
                    }
                    <p className="PopupRegistrationFormField">
                        <input onChange={event => address = event.target.value} type="text" id="address" placeholder="Address" />
                    </p>
                    {addressE === true && 
                        <p className="PopupRegistrationFormError">Incorrect address</p>
                    }                        
                    <p className="PopupRegistrationFormButton">
                        <button className="PopupSubmitButton" onClick={()=>{handleClick()}} id="submitbutton" type="button">SIGN UP</button>
                    </p>
                </form>
            </div>
        </div>
    );
}