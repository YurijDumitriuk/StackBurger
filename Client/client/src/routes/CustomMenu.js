import React from "react";
import './CustomMenu.css';
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import BurgerCard from "../components/BurgerCard";


export default function Constructor() {
    return(
        <div>
            <Navbar />
            <div className="CustomCardWrapper">
            <BurgerCard handleCounterBack={() => this.state.counter} id={1} name={1} components={1} calories={1} price={1} />
            <BurgerCard handleCounterBack={() => this.state.counter} id={1} name={1} components={1} calories={1} price={1} />
            <BurgerCard handleCounterBack={() => this.state.counter} id={1} name={1} components={1} calories={1} price={1} />
            <BurgerCard handleCounterBack={() => this.state.counter} id={1} name={1} components={1} calories={1} price={1} />
            <BurgerCard handleCounterBack={() => this.state.counter} id={1} name={1} components={1} calories={1} price={1} />
            <BurgerCard handleCounterBack={() => this.state.counter} id={1} name={1} components={1} calories={1} price={1} />
          </div>
        </div>
    );
}