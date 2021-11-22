import React, { Component } from "react";
import './Login.css';
import Navbar from "../components/Navbar";
class Login extends Component{
    render(){
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
                                <button className="SubmitButton" id="submitbutton" type="button">ENTER</button>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
    
}

export default Login;