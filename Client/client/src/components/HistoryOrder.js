import React from "react";
import './HistoryOrder.css';
import HistoryBurgerCard from "./HistoryBurgerCard";
import OrderBurgerCard from "./OrderBurgerCard";
import { GetOrders } from "../services/OrderService";
import BurgerCard from "./BurgerCard";

function Sort(a, b){
    if (a.name > b.name) {
    return 1;
    }
    if (a.name < b.name) {
    return -1;
    }
    return 0;
}

function AddBurgers(burgers){
    let burgersCards = [];
    burgers.sort(Sort);
    burgers.forEach(e => {
        burgersCards.push(<OrderBurgerCard name = {e.name} price = {e.price} />)
    });
    return burgersCards;
}
export default function HistoryOrder(props){
    console.log("Order page: ", props.burgers)
    let burgersList = AddBurgers(props.burgers);
    return (
        <div className="HistoryOrderWrapper">
            <div className="OrderTopBarWrapper">
                <ul className="TopItems">
                    <li className="OrderTopBarElement">
                        Date: {props.date}
                    </li>
                    <li className="OrderTopBarElement">
                        Total Count: {props.burgers.length}
                    </li>
                    <li className="OrderTopBarElement">
                        Total Price: {props.price}
                    </li>
                </ul>
            </div>
            <div className="OrderInfoWrapper">
                <div className="OrderCardWrapper">
                    {burgersList}
                </div>
            </div>
            <div className="BottomMargin"><p></p></div>
        </div>

    );
}