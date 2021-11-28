import React from "react";
import './Order.css';
import OrderBurgerCard from "../components/OrderBurgerCard";

let orderItemList=[]//Ось тобі масив куда піхати

export default function Order(){
    return(
        <div className="Right">
            <p className="OrderTitle">My order</p>
                    
                <div className="OrderCardWrapper">
                    {orderItemList}
                    <OrderBurgerCard name="Name" price="12.00"/>
                    <OrderBurgerCard name="Name" price="12.00"/>
                    <OrderBurgerCard name="Name" price="12.00"/>
                    <OrderBurgerCard name="Name" price="12.00"/>
                </div>

                <p className="PriceText">Total price : $36.00</p>
                <div className="SubmitOrderButtonWraper">
                    <button className="SubmitOrderButton">Submit</button>
                </div>
            </div>
    );
}