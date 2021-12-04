import React,{Component} from "react";
import './Popup.css';
import { useNavigate } from "react-router-dom";
import { UserCredentials } from "../models/UserCredentials";
import { environment } from "../env";
import { useState } from "react";
import RegistrationPopup from "./RegistrationPopup"

var name, password;

export default function Popup(props) {
    const [nameE, setNameE] = useState(false);
    const [passwordE, setPasswordE] = useState(false);
    const [isRegistrationOpen,setIsRegistrationOpen] = useState(false);
    
    const navigate = useNavigate();

    const togglePopup = () => {
        setIsRegistrationOpen(!isRegistrationOpen);
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
        <div className="PopupFormWrapperLogin">
            <div className="PopupLoginFormWrapper">
                <span className="CloseIcon" onClick={props.handleClose}>x</span>
                <form className="PopupLoginForm">
                
                    <p className="PopupLoginFormTitle">
                        Please Login
                    </p>
                    <p className="PopupLoginFormField">
                        <input onChange={event => name = event.target.value} type="text" id="username" placeholder="Username" /*required pattern="+[0-9]{12}"*//>
                    </p>
                    {nameE === true && 
                        <p className="PopupLoginFormError">Incorrect username</p>
                    }
                    <p className="PopupLoginFormField">
                        <input onChange={event => password = event.target.value} type="password" id="password" placeholder="Password" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"/>
                    </p>
                    {passwordE === true && 
                        <p className="PopupLoginFormError">Incorrect password</p>
                    }
                    <p className="PopupLoginFormButton">
                        <button className="PopupSubmitButton" onClick={()=>{handleClick()}} id="submitbutton" type="button">SIGN IN</button>
                    </p>
                    <p className="PopupLoginToRegister">
                        Don't have an account? <a href="#" onClick={togglePopup} className="PopupLoginToRegisterLink">Register</a>
                    </p>
                    {isRegistrationOpen && <RegistrationPopup handleClose={togglePopup} />}
                </form>
            </div>
        </div>            
            
            
            /*<div className="popup-box">
                <div className="box">
                    <span className="close-icon" onClick={this.props.handleClose}>x</span>
                    {this.props.content}
                </div>
            </div>*/
        );
    }


