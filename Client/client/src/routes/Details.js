import React from 'react'
import Navbar from '../components/Navbar'
import './Details.css'
import { GetImages } from "../services/ImageService";
import { useEffect, useState } from "react";


const Images = GetImages();

let Burger;
let componentsImages = [];
let rightList = [];
let Price;
let Weight;
let Calories;

function InitializeBurger(setLoading){
    Price = 0;
    Weight = 0;
    Calories = 0;
    componentsImages = [];
    rightList = [];
    Burger = JSON.parse(sessionStorage.getItem("burgerDetails"));
    if(Burger !== null){
        var Components = [];
        Components = Burger.components;
        Components.reverse();
        Components.forEach((component, ind) => {
            componentsImages.push(<img src={Images[component.url].default} alt={component.name}/>)
            rightList.push(<a className="El" href="#">{ind + 1}. {component.name} <br/>
            $ {component.price} | {component.weight} g</a>)
            Price = Price + component.price;
            Weight = Weight + component.weight;
            Calories = Calories + component.calories;
        });
        setLoading(true);
    }
}

export default function Details(){
    const [counter, setCounter] = useState();
    const [isLoaded, setLoading ] = useState(false);

    useEffect(() => {
        setCounter(localStorage.getItem("itemsCount"));
        InitializeBurger(setLoading);
        console.log("Initializing new burger");
    }, []);
    
    if(isLoaded){
        return (
            <div>
                <Navbar itemCounter={counter} />
                <div className="Box">
                    <div className="CenterBlock">
                        <div className="ComponentImage">
                            {componentsImages}
                        </div>
                    </div>
                    <div className="RightBlock">
                        <div className="RightBlockInside">
                            <p className="DetailsBurgerName">{Burger.name}</p>
                            <div className="VertMenu">
                                {rightList}
                            </div>
                            <div className="RightBlockInfo">
                                <p className="DetailsTitle">
                                    Total Price: $ {Number.parseFloat(Price).toFixed(2)}
                                </p>
                                <p className="DetailsTitle">
                                    Total Weight: {Number.parseFloat(Weight).toFixed(2)} g
                                </p>
                                <p className="DetailsTitle">
                                    Total Calories: {Number.parseFloat(Calories).toFixed(2)} kcal
                                </p>
                            </div>        
                        </div>            
                    </div>
                </div>
            </div>
        );
    }
    else{
        return (
            <div>
                <Navbar itemCounter={counter} />
                <p className="InfoTitle">Loading...</p>
            </div>
        );
    }
}

