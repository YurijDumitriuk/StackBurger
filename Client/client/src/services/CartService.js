import React from "react";
import {useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { CheckAuthorization } from "./AutorizationService";
import { useState } from "react";


export const ClearCart = () => {
    localStorage.removeItem("itemsCount");
    localStorage.removeItem("burgersInCart")
}

export const AddToCart = (burger) => {
    let burgers = [];
    if(!CheckAuthorization()){ 
        //alert("Please login!")
        return true
    }
    if(localStorage.getItem("itemsCount") === null){
        localStorage.setItem("itemsCount", "1");
        itemsC = 1
        burgers = [burger];
    }
    else{
        console.log(localStorage.getItem("itemsCount"))
        var itemsC = Number.parseInt(localStorage.getItem("itemsCount"))
        itemsC++
        localStorage.setItem("itemsCount", itemsC.toString())
        burgers = JSON.parse(localStorage.getItem("burgersInCart"));
        burgers.push(burger);
    }
    localStorage.setItem("burgersInCart", JSON.stringify(burgers))
    //console.log(localStorage.getItem("burgersInCart"));
}