import React from "react";
import './Registration.css';
import Navbar from "../components/Navbar";
import {useNavigate } from "react-router-dom";
    



export default function Registration(){    
    const navigate = useNavigate();
    function handleClick() {
        /* тут до перехода можна вписати що треба зробити*/ 
        navigate('/login')
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
                            <input type="text" id="username" placeholder="Name" required/>
                        </p>
                        <p className="RegistrationFormField">
                            <input type="tel" id="mobilePhone" placeholder="Mobile Phone (+380694201369)" required pattern="+[0-9]{12}"/>
                        </p>
                        <p className="RegistrationFormField">
                            <input type="text" id="address" placeholder="Address" />
                        </p>
                        <p className="RegistrationFormField">
                            <input type="password" id="password" placeholder="Password" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"/>
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

