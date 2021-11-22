import React, { Profiler } from "react";
import './Profile.css';
import Navbar from "../components/Navbar";
import {useNavigate } from "react-router-dom";

export default function Profile(){
    
    return(
        <div>
            <Navbar/>
            <h1>You enter a profile</h1>
        </div>
    );
}
    