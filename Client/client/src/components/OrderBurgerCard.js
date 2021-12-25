import React from "react";
import './OrderBurgerCard.css';
import burger from "../images/burger.png";
import { useState } from "react";
import { GetBurgerDetails } from "../services/ConstructorService";

async function OpenForDetails(id){
    var result = await GetBurgerDetails(id)
    if(result){
      window.location.href='/details';
    }
}

export default function OrderBurgerCard(props){
    
    function removeBurger(){
        let res=[];
        res=JSON.parse(localStorage.getItem("burgersInCart"));
        res.splice(props.number,1);
        localStorage.setItem("burgersInCart",JSON.stringify(res));
        localStorage.setItem("itemsCount",localStorage.getItem("itemsCount")-1)
        window.location="/profile";
    }
    
    return(
        <div className="OrderCard">
            <span className="CloseIcon" onClick={removeBurger}>x</span>
            <img className="OrderBurgerImage" onClick={()=>OpenForDetails(props.id)} src={burger} alt="burger" />
            <div className="OrderBurgerName">
                <p>{props.name}</p>
            </div>
            <div className="OrderButtonWraper">
                <button className="OrderPriceButton" disabled >$ {props.price}</button>
            </div>
        </div>
    )
}