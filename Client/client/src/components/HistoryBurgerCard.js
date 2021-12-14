import React from "react";
import './HistoryBurgerCard.css';
import burger from "../images/burger.png";
export default function HistoryBurgerCard(props){
    
    return(
        <div className="HistoryCard">
            <img className="HistoryBurgerImage" src={burger} alt="burger" />
            <div className="HistoryBurgerName">
                <p>{props.name}</p>
            </div>
            <div className="HistoryButtonWraper">
                <button className="HistoryPriceButton" disabled >$ {props.price}</button>
            </div>
        </div>
    )
}