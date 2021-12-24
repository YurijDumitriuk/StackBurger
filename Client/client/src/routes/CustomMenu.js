import React from "react";
import './CustomMenu.css';
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import BurgerCard from "../components/BurgerCard";
import { GetCustomBurgers } from "../services/BurgerService";

let itemList = [];

function Sort(a, b){
    if (a.price < b.price) {
    return 1;
    }
    if (a.price > b.price) {
    return -1;
    }
    return 0;
}

async function InitializeData(setDataLoaded, handleCounter){
    itemList = [];
    let Data = null;
    let burgers = [];
    try { Data = await GetCustomBurgers(localStorage.getItem("userId")) }
    catch {
        alert("Resource server doesn't respond")
        return
    }
    console.log(Data)
    if (Data.status !== 200) {
    }
    else {
        burgers = Data.data
        //console.log(burgers);
        if (burgers === null) {
        itemList.push(<h1>No burgers received...</h1>)
        }
        else {
        burgers.sort(Sort);
        burgers.forEach((item, index) => {
            var componentsList = "";
            item.components.forEach((c, ind) => {
            componentsList += c;
            if (ind !== item.components.length - 1) {
                componentsList += ", ";
            }
            else {
                componentsList += ".";
            }
            })
            itemList.push(<BurgerCard handleCounterBack={handleCounter} id={item.id} name={item.name} components={componentsList} calories={item.calories} price={Number.parseFloat(item.price).toFixed(2)} />)
        })
        }
        setDataLoaded(true);
    }
}

export default function CostumMenu() {
    const [counter, setCounter] = useState(localStorage.getItem("itemsCount"))

    const handleCounter = () => {
        setCounter(Number(localStorage.getItem("itemsCount")));
    }

    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        InitializeData(setDataLoaded, handleCounter);
      }, []);


    if(dataLoaded){
        return(
            <div>
                <Navbar itemCounter={counter} />
                <div className="CustomCardWrapper">            
                {itemList}
              </div>
            </div>
        );
    }
    else{
        return(
            <div>
                <Navbar itemCounter={counter} />
                <div className="CustomCardWrapper">            
                <h1>Loading...</h1>
            </div>
            </div>
        );
    }
}