import React from "react";
import {useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { CheckAuthorization } from "./AutorizationService";
import { useState } from "react";


export const AddToCart = (burger) => {
    //const [items, setItemsCount] = useState(0);
    if(!CheckAuthorization()){ 
        //alert("Please login!")
        return true
    }
    if(localStorage.getItem("itemsCount") === null){
        localStorage.setItem("itemsCount", "1");
        itemsC = 1
    }
    else{
        console.log(localStorage.getItem("itemsCount"))
        var itemsC = Number.parseInt(localStorage.getItem("itemsCount"))
        itemsC++
        localStorage.setItem("itemsCount", itemsC.toString())
    }
    var burgers = [burger]
    localStorage.setItem("burgersInCart", JSON.stringify(burger))
    //itemsCount.setItemsCount(itemsC);
    console.log("Item added: ", burger);
    //Navbar.forceUpdate()
}