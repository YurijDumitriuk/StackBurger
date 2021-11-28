import React from "react";
import './ProfileHistory.css';
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import ProfileLeftNavbar from "../components/ProfileLeftNavbar";

export default function ProfileHistory(){
    return(
        <div>
            <Navbar/>
            <ProfileLeftNavbar />
                
                
                
                
                <div className="Column Right">
                    <h1>You enter Profile History</h1>
                    
                </div>
            </div>
    );
}