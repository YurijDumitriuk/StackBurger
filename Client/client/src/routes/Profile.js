import React from "react";
import './Profile.css';
import Navbar from "../components/Navbar";
import ProfileLeftNavbar from "../components/ProfileLeftNavbar";
import OrderBurgerCard from "../components/OrderBurgerCard";
import Order from "../components/Order";
export default function Profile(){
    
    return(
        <div>
            <Navbar/>
            <div className="MainRow">
                <ProfileLeftNavbar />
                <Order />
            </div>
            <div className="BottomMargin"><p></p></div>
        </div>
        
    );
}
    