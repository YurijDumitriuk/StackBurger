import React from "react";
import './Login.css';
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
export default function Login() {
    
    const navigate = useNavigate();
    function handleClick() {
        /* тут до перехода можна вписати що треба зробити*/ 
        navigate('/profile');
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
                            <input type="tel" id="mobilePhone" placeholder="Mobile Phone (+380694201369)" required pattern="+[0-9]{12}"/>
                        </p>
                        <p className="LoginFormField">
                            <input type="password" id="password" placeholder="Password" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"/>
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
