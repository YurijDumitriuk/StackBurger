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

function InitializeBurger(setLoading){
    Price = 0;
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
                            <div className="VertMenu">
                                {rightList}
                            </div>
                            <div className="RightBlockInfo">
                                <p className="InfoTitle">
                                    Total Price: $ {Number.parseFloat(Price).toFixed(2)}
                                </p>
                                <div className="InfoButtonWraper">
                                    <p className="InfoTitle">{Burger.name}</p>
                                </div>
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

