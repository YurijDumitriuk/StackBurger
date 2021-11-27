import React from "react";
import './Registration.css';
import Navbar from "../components/Navbar";
import {useNavigate } from "react-router-dom";
    



<<<<<<< Updated upstream
export default function Registration(){    
    const navigate = useNavigate();
    function handleClick() {
        /* тут до перехода можна вписати що треба зробити*/ 
        navigate('/login')
=======
    async function handleClick() {
        //var hashedPassword = await HashPassword(password)
        var user = new User(name, password, phone, address)
        //console.log(user);
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
            alert(data.title)
        }
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                            <input type="text" id="address" placeholder="Address" />
=======
                            <input onChange={event => phone = event.target.value} type="tel" id="mobilePhone" placeholder="+38XXXXXXXXXX" /*required pattern="+[0-9]{12}"*//>
>>>>>>> Stashed changes
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

