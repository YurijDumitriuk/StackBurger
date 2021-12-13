import React from "react";
import './HistoryOrder.css';
import OrderBurgerCard from "./OrderBurgerCard";
export default function HistoryOrder(props){
    return (
        <div className="HistoryOrderWrapper">
            <div className="OrderTopBarWrapper">
                <ul className="TopItems">
                    <li className="OrderTopBarElement">
                        Order Date And Hour
                    </li>
                    <li className="OrderTopBarElement">
                        Total Count
                    </li>
                    <li className="OrderTopBarElement">
                        Total Price
                    </li>
                </ul>
            </div>
            <div className="OrderInfoWrapper">
                <div className="OrderCardWrapper">
                    <OrderBurgerCard name='name1' price='price1'/>
                    <OrderBurgerCard name='name2' price='price2'/>
                    <OrderBurgerCard name='name3' price='price3'/>
                    <OrderBurgerCard name='name4' price='price4'/>
                </div>
            </div>
            <div className="BottomMargin"><p></p></div>
        </div>

    );
}