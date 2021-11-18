import React, { Component } from "react";
import burger from "../images/burger.png";
import './BurgerCard.css';
class BurgerCard extends Component {
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
          <button className="PriceButton">$ {this.props.price}</button>
        </div>
      </div>
    );
  }
}

export default BurgerCard;