import React, { Component } from "react";
import burger from "../images/burger.png";
import './BurgerCard.css';
import {AddToCart} from "../services/CartService";
import { Burger } from "../models/Burger";
import { Navigate } from "react-router";
class BurgerCard extends Component {
  
  constructor(props){ 
    super(props)      
    
  } 

  

  onTrigger = (event) => {
    if(AddToCart(new Burger(this.props.id, this.props.name, this.props.components, this.props.price))){
      window.location="/login";
      
    }
    this.props.handleCounterBack(1)
    event.preventDefault();
  }

  render() {
    return (
      <div className="Card">
        <img className="BurgerImage" onClick={()=>window.location.href='/details'} src={burger} alt="burger" />
        <div className="BurgerName">
          <p>{this.props.name}</p>
        </div>
        <div className="BurgerComponents">
          <p>
            {this.props.components}
          </p>
        </div>
        <div className="BurgerCalories">
          <p>{this.props.calories} calories</p>
        </div>
        <div className="ButtonWraper">
          <button onClick={this.onTrigger} className="PriceButton">$ {this.props.price}</button>
        </div>
      </div>
    );
  }
}

export default BurgerCard;