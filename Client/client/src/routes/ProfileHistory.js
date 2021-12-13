import React from "react";
import './ProfileHistory.css';
import Navbar from "../components/Navbar";
import ProfileLeftNavbar from "../components/ProfileLeftNavbar";
import HistoryOrder from "../components/HistoryOrder";

export default function ProfileHistory(){
    return(
        <div>
            <Navbar/>
            <div className="MainRow">
                <ProfileLeftNavbar />
                <div className="Right">
                    <p className="HistoryTitle">
                        Order History
                    </p>
                    <HistoryOrder />
                    <HistoryOrder />
                    
                </div>
            </div>
            <div className="BottomMargin"><p></p></div>
        </div>
    );
}