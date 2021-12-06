import React from "react";
import './Order.css';
import OrderBurgerCard from "../components/OrderBurgerCard";

let orderItemList=[]//Ось тобі масив куда піхати
let totalPrice;


function CreateCartList(){
    let burgers = [];
    let result = localStorage.getItem("burgersInCart");
    if(result !== null){
        burgers = JSON.parse(result);
        orderItemList = [];
        totalPrice = 0;
        burgers.forEach(b => {
            console.log(b.name);
            totalPrice += Number.parseFloat(b.price);
            orderItemList.push(<OrderBurgerCard name={b.name} price={b.price}/>)
        });
    }
}

export default function Order(){
    CreateCartList();
    return(
        <div className="Right">
            <p className="OrderTitle">My order</p>
                    
                <div className="OrderCardWrapper">
                    {orderItemList}
                </div>

                <p className="PriceText">Total price : ${totalPrice}</p>
                <div className="SubmitOrderButtonWraper">
                    <button className="SubmitOrderButton">Submit</button>
                </div>
            </div>
    );
}