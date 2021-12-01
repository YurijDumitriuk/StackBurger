import React, { Component } from "react";
import burger from "../images/burger.png";
import './BurgerCard.css';
import {AddToCart} from "../services/CartService";
import { Burger } from "../models/Burger";
class BurgerCard extends Component {
  onTrigger = (event) => {
    AddToCart(new Burger(this.props.id, this.props.name, this.props.components, this.props.price));
    this.props.handleCounterBack(1)
    event.preventDefault();
  }

  render() {
    return (
      <div className="Card">
        <img className="BurgerImage" src={burger} alt="burger" />
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