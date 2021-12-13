import React from "react";
import './HistoryOrder.css';
import HistoryBurgerCard from "./HistoryBurgerCard";
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
                    <HistoryBurgerCard name='name1' price='price1'/>
                    <HistoryBurgerCard name='name2' price='price2'/>
                    <HistoryBurgerCard name='name3' price='price3'/>
                    <HistoryBurgerCard name='name4' price='price4'/>
                </div>
            </div>
            <div className="BottomMargin"><p></p></div>
        </div>

    );
}