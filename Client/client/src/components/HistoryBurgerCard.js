import React from "react";
import './HistoryBurgerCard.css';
import burger from "../images/burger.png";
import { GetBurgerDetails } from "../services/ConstructorService";

async function OpenForDetails(id){
    var result = await GetBurgerDetails(id)
    if(result){
      window.location.href='/details';
    }
  }

export default function HistoryBurgerCard(props){
    
    return(
        <div className="HistoryCard">
            <img className="HistoryBurgerImage" onClick={()=>OpenForDetails(props.id)} src={burger} alt="burger" />
            <div className="HistoryBurgerName">
                <p>{props.name}</p>
            </div>
            <div className="HistoryButtonWraper">
                <button className="HistoryPriceButton" disabled >$ {props.price}</button>
            </div>
        </div>
    )
}