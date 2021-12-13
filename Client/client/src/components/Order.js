import React from "react";
import './Order.css';
import OrderBurgerCard from "../components/OrderBurgerCard";
import { PostOrder } from "../services/OrderService";

let orderItemList=[];
let totalPrice = 0;


async function ConfirmOrder(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    //var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date.toString();//+' '+time;
    var userId = localStorage.getItem("userId");
    var burgers = JSON.parse(localStorage.getItem("burgersInCart"));
    console.log("Order confirmed: ", dateTime);
    var result = await PostOrder(dateTime, userId, burgers);
    if(result === true){
        console.log("Redirecting to history...")
        window.location="/profile_history";
    }
}

function Sort(a, b){
    if (a.name > b.name) {
    return 1;
    }
    if (a.name < b.name) {
    return -1;
    }
    return 0;
}

function CreateCartList(){
    let burgers = [];
    let result = localStorage.getItem("burgersInCart");
    if(result !== null){
        burgers = JSON.parse(result);
        burgers.sort(Sort);
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

                <p className="PriceText">Total price : ${totalPrice.toFixed(2)}</p>
                <div className="SubmitOrderButtonWraper">
                    <button className="SubmitOrderButton" onClick={() => ConfirmOrder()}>Submit</button>
                </div>
        </div>
    );
}