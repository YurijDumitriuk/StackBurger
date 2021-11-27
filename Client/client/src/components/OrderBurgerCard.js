import React from "react";
import './OrderBurgerCard.css';
import burger from "../images/burger.png";
import { useState } from "react";
export default function OrderBurgerCard(props){
    const [count, setCount] = useState(1);
    
    function changeCount(operation){
        if (operation==='+'){
            setCount(count+1);
        } else {
            if(count>1) {
                setCount(count-1);
            }
            else{
                // Тут зробіть видалення позиції при кількості 0
            }
        }
    }
    return(
        <div className="OrderCard">
            <img className="OrderBurgerImage" src={burger} alt="burger" />
            <div className="OrderBurgerName">
                <p>{props.name}</p>
            </div>
            <div className="ChangeCountWrapper">
                <button className="btn" onClick={()=>{changeCount('-')}}>-</button>
                <div className="count">{count}</div>
                <button className="btn" onClick={()=>{changeCount('+')}}>+</button>
            </div>
            <div className="OrderButtonWraper">
                <button className="OrderPriceButton" disabled >$ {props.price}</button>
            </div>
        </div>
    )
}