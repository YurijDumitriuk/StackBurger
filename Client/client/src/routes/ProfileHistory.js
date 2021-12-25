import React from "react";
import './ProfileHistory.css';
import Navbar from "../components/Navbar";
import ProfileLeftNavbar from "../components/ProfileLeftNavbar";
import HistoryOrder from "../components/HistoryOrder";
import { GetOrders } from "../services/OrderService";
import { useState } from 'react';

let Data;
let ordersList = [];

async function InitializeOrders(setLoading){
    ordersList = [];
    Data = await GetOrders(localStorage.getItem("userId"));
    if(Data !== null){
        Data.data.forEach((e, index) => {
            ordersList.push(<HistoryOrder date = {e.date} burgers = {e.burgers} price = {e.price} />)
        });
    }
    setLoading(false);
}

export default function ProfileHistory(){
    const [isLoading, setLoading] = useState(true);
    if(isLoading){
        InitializeOrders(setLoading);
    }
    if (isLoading) {
        return <div className="App">Loading...</div>;
    }
    return(
        <div>
            <Navbar/>
            <div className="MainRow">
                <ProfileLeftNavbar />
                {isLoading === true &&
                    <h1>Loading...</h1>
                }
                {isLoading === false &&
                    <div className="Right">
                        <p className="HistoryTitle">
                            Order History
                        </p>
                        {ordersList}
                    </div>
                }
            </div>
            <div className="BottomMargin"><p></p></div>
        </div>
    );
}