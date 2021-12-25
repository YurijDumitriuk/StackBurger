import React from "react";
import './Constructor.css';
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

import { GetComponents } from "../services/ComponentsService";
import { PostBurger } from "../services/BurgerService";
import { CheckAuthorization } from "../services/AutorizationService";

let componentsLoaded = false;
let componentsList = [];
let existingBurgerField = 0;
let Name;
let componentsToSend = [];
let iterations = 0;


function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  
const Images = importAll(require.context('../images/burgerComponentsImg', false, /\.(png|jpe?g|svg)$/));

function Sort(a, b){
    if (a > b) {
    return 1;
    }
    if (a < b) {
    return -1;
    }
    return 0;
}

export default function Constructor() {
    console.log("Starting render!");

    const [counter, setCounter] = useState();

    const [componentsListS, setComponentsListS] = useState([]);

    const [componentsArray, setComponentsArray] = useState([]);
    
    const [rightList, setRightList] = useState([]);

    const [totalPrice, setTotalPrice] = useState(0);

    let imgList = [];

    function DeleteComponent(ind){
        console.log("Try to delete component: ", ind)
        var componentslistS = [];
        var componentsarray = [];
        var rightlist = [];

        componentslistS = componentsListS;
        componentsarray = componentsArray;
        rightlist = rightList;

        componentslistS.splice(ind, 1);
        componentsarray.splice(ind, 1);
        rightlist.splice(ind, 1);
        componentsToSend.splice(ind, 1);

        setRightList(rightlist);
        setComponentsListS(componentslistS);
        setComponentsArray(componentslistS);

        localStorage.setItem("constructorBurger", JSON.stringify(componentsToSend));
        document.location.reload();
    }

    const updateArrays = (component) => {
        console.log("Update with component: ", component);
        componentsToSend.push(component);
        const componentsarray = componentsArray;
        const rightlist = rightList;
        
        componentsarray.push(<img src={Images[component.url].default} alt={component.name}/>);
        var i = rightlist.length;
        rightList.push(<a className="El" href="#">{rightList.length + 1}. {component.name} 
        <span id={rightList.length} className="RemoveIcon" onClick={() => DeleteComponent(i)} >x</span> <br/>
        $ {component.price} | {component.weight} g</a>);
        
        setComponentsArray(componentsarray);
        setRightList(rightlist);
        
        console.log("Show array: ", componentsArray);

        let tp = 0;
        componentsToSend.forEach(e => 
            tp = tp + e.price);
        setTotalPrice(tp);
        localStorage.setItem("constructorBurger", JSON.stringify(componentsToSend));
    };
    
    async function FillComponentsList(){
        let components = [];
        let compList = [];
        components = await JSON.parse(sessionStorage.getItem("componentsList"));
        let categories = Object.keys(components);
        categories.sort(Sort);
        if(components !== null){
            for(let category of categories){
                compList.push(<a className="Category" href="#">{category}</a>);
                components[category].forEach(e => {
                    compList.push(<a className="Element" onClick={()=>updateArrays(e)} href="#">{e.name} <br/>
                    $ {e.price} | {e.calories} kcal | {e.weight} g</a>)
                })
            }
            componentsList = compList;
            componentsLoaded = true;
            setComponentsListS(componentsList);
        }
    }

    function FillExistingBurger(){
        var comp = JSON.parse(localStorage.getItem("constructorBurger"));
        componentsToSend = [];
        console.log(componentsArray, rightList);
        if(comp !== null)
        comp.forEach(e => {
            updateArrays(e);
            console.log("Update with element: ", e)
        });
    }

    async function CreateBurger(){
        if(CheckAuthorization()){
            console.log("Creating burger: ", componentsToSend)
            var result = await PostBurger(Name, localStorage.getItem("userId"), componentsToSend);
            if(result === true){
                localStorage.removeItem("constructorBurger");
                console.log("Redirecting to history...")
                window.location="/custom_menu";
            }
        }
        else{
            window.location="/login";
        }
    }

    useEffect(() => {
        setCounter(localStorage.getItem("itemsCount"));
        FillComponentsList();
        FillExistingBurger();
      }, []);
    
    return(
        <div>
            <Navbar itemCounter={counter} />
            <div className="Box">
                <div className="LeftBlock">
                    <div className="VerticalMenu">
                        {componentsListS}
                    </div>
                </div>
                <div className="CenterBlock">
                    <div className="ComponentImage">
                        {componentsArray}
                    </div>
                </div>
                <div className="RightBlock">
                    <div className="RightBlockInside">
                        <div className="VertMenu">
                            {rightList}
                        </div>
                        <div className="RightBlockInfo">
                            <p className="InfoTitle">
                                Total Price: $ {Number.parseFloat(totalPrice).toFixed(2)}
                            </p>
                            <input onChange={event => Name = event.target.value} type="text" className="BurgerNameInput" placeholder="Enter your burger name..."></input>
                            <div className="InfoButtonWraper">
                                <button onClick={() => CreateBurger()} className="InfoPriceButton">Create</button>
                            </div>
                        </div>        
                    </div>            
                </div>
            </div>
        </div>
    );
}