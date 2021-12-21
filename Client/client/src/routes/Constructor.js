import React from "react";
import './Constructor.css';
import Navbar from "../components/Navbar";
import { useState } from "react";


import Bun from '../images/burgerComponentsImg/bun.png'
import CheeseBun from '../images/burgerComponentsImg/cheese-bun.png'
import BunWithSesame from '../images/burgerComponentsImg/bun-with-sesame.png'
import BeefPatty from '../images/burgerComponentsImg/beef-patty.png'
import PorkPatty from '../images/burgerComponentsImg/pork-patty.png'
import ChickenPatty from '../images/burgerComponentsImg/chicken-patty.png'
import BaconStrips from '../images/burgerComponentsImg/bacon-strips.png'
import AmericanCheese from '../images/burgerComponentsImg/american-cheese.png'
import Cheddar from '../images/burgerComponentsImg/cheddar.png'
import Gouda from '../images/burgerComponentsImg/gouda.png'
import Swiss from '../images/burgerComponentsImg/swiss.png'
import Colby from '../images/burgerComponentsImg/colby.png'
import PickleSlices from '../images/burgerComponentsImg/pickle-slices.png'
import OnionSlices from '../images/burgerComponentsImg/onion-slices.png'
import TomatoSlices from '../images/burgerComponentsImg/tomato-slices.png'
import ShreddedLettuce from '../images/burgerComponentsImg/shredded-lettuce.png'
import CrispyOnionRings from '../images/burgerComponentsImg/crispy-onion-rings.png'
import Ketchup from '../images/burgerComponentsImg/ketchup.png'
import Mayonnaise from '../images/burgerComponentsImg/mayonnaise.png'
import Mustard from '../images/burgerComponentsImg/mustard.png'
import SpecialSauce from '../images/burgerComponentsImg/special-sauce.png'


export default function Constructor() {
    const [componentsArray, setComponentsArray] = useState([]);
    const [weightArray, setWeightArray]=useState([]);
    const [priceArray, setPriceArray]=useState([]);
    let images=[];
    let rightList=[];
    let i=0;
    let lineInRightList;

    const updateArrays=(name,weight,price)=>{
        const componentsarray=[...componentsArray];
        const weightarray=[...weightArray];
        const pricearray=[...priceArray]
        
        componentsarray.push(name);
        weightarray.push(weight);
        pricearray.push(price);
        
        setComponentsArray(componentsarray);
        setWeightArray(weightarray);
        setPriceArray(pricearray);
        
    };
    
    

    return(
        
        <div>
            <Navbar />
            <div className="Box">
                <div className="LeftBlock">
                    <div className="VerticalMenu">
                        <a className="Category" href="#">Buns</a>
                        <a className="Element" onClick={()=>updateArrays(Bun,40,0.35)} href="#">Bun <br/>
                            $ 0.35 | 108 kcal | 40 g</a>
                        <a className="Element" onClick={()=>updateArrays(CheeseBun,50,0.55)} href="#">Cheese bun <br/>
                            $ 0.55 | 160 kcal | 50 g</a>
                        <a className="Element" onClick={()=>updateArrays(BunWithSesame,45,0.40)} href="#">Bun with sesame <br/>
                            $ 0.40 | 120 kcal | 45 g</a>
                        <a className="Category" href="#">Meat</a>
                        <a className="Element" onClick={()=>updateArrays(BeefPatty,70,0.56)} href="#">Beef patty <br/>
                            $ 0.56 | 173 kcal | 70 g</a>
                        <a className="Element" onClick={()=>updateArrays(BeefPatty,100,0.80)} href="#">Beef patty <br/>
                            $ 0.80 | 247 kcal | 100 g</a>
                        <a className="Element" onClick={()=>updateArrays(PorkPatty,70,0.49)} href="#">Pork patty <br/>
                            $ 0.49 | 201 kcal | 70 g</a>
                        <a className="Element" onClick={()=>updateArrays(PorkPatty,100,0.70)} href="#">Pork patty <br/>
                            $ 0.70 | 287 kcal | 100 g</a>
                        <a className="Element" onClick={()=>updateArrays(ChickenPatty,70,0.35)} href="#">Chicken patty <br/>
                            $ 0.35 | 126 kcal | 70 g</a>
                        <a className="Element" onClick={()=>updateArrays(ChickenPatty,100,0.50)} href="#">Chicken patty <br/>
                            $ 0.50 | 180 kcal | 100 g</a>
                        <a className="Element" onClick={()=>updateArrays(BaconStrips,20,0.20)} href="#">Bacon strips x2 <br/>
                            $ 0.20 | 94 kcal | 20 g</a>
                        <a className="Element" onClick={()=>updateArrays(BaconStrips,40,0.35)} href="#">Bacon strips x4 <br/>
                            $ 0.35 | 188 kcal | 40 g</a>
                        <a className="Category" href="#">Cheese</a>
                        <a className="Element" onClick={()=>updateArrays(AmericanCheese,25,0.23)} href="#">American cheese <br/>
                            $ 0.23 | 110 kcal | 25 g</a>
                        <a className="Element" onClick={()=>updateArrays(Cheddar,25,0.25)} href="#">Cheddar <br/>
                            $ 0.25 | 113 kcal | 25 g</a>
                        <a className="Element" onClick={()=>updateArrays(Gouda,25,0.25)} href="#">Gouda <br/>
                            $ 0.25 | 108 kcal | 25 g</a>
                        <a className="Element" onClick={()=>updateArrays(Swiss,25,0.27)} href="#">Swiss <br/>
                            $ 0.27 | 100 kcal | 25 g</a>
                        <a className="Element" onClick={()=>updateArrays(Colby,25,0.24)} href="#">Colby <br/>
                            $ 0.24 | 91 kcal | 25 g</a>
                        <a className="Category" href="#">Vegetables </a>
                        <a className="Element" onClick={()=>updateArrays(PickleSlices,20,0.08)} href="#">Pickle slices <br/>
                            $ 0.08 | 7 kcal | 20 g</a>
                        <a className="Element" onClick={()=>updateArrays(OnionSlices,10,0.05)} href="#">Onion slices <br/>
                            $ 0.05 | 15 kcal | 10 g</a>
                        <a className="Element" onClick={()=>updateArrays(TomatoSlices,40,0.07)} href="#">Tomato slices <br/>
                            $ 0.07 | 8 kcal | 40 g</a>
                        <a className="Element" onClick={()=>updateArrays(ShreddedLettuce,10,0.04)} href="#">Shredded lettuce <br/>
                            $ 0.04 | 10 kcal | 10 g</a>
                        <a className="Element" onClick={()=>updateArrays(CrispyOnionRings,20,0.10)} href="#">Crispy onion rings <br/>
                            $ 0.10 | 40 kcal | 20 g</a>
                        <a className="Category" href="#">Sauces</a>
                        <a className="Element" onClick={()=>updateArrays(Ketchup,50,0.10)} href="#">Ketchup <br/>
                            $ 0.10 | 60 kcal | 50 g</a>
                        <a className="Element" onClick={()=>updateArrays(Mayonnaise,50,0.15)} href="#">Mayonnaise <br/>
                            $ 0.15 | 300 kcal | 50 g</a>
                        <a className="Element" onClick={()=>updateArrays(Mustard,50,0.12)} href="#">Mustard <br/>
                            $ 0.12 | 30 kcal | 50 g</a>
                        <a className="Element" onClick={()=>updateArrays(SpecialSauce,50,0.20)} href="#">Special sauce <br/>
                            $ 0.20 | 180 kcal | 50 g</a>
                    </div>
                </div>
                <div className="CenterBlock">
                    <div className="ComponentImage">

                        {componentsArray.forEach(name=>
                        images.push(<img src={name} alt={name}/>)    
                        )}
                        {images}
                    </div>
                </div>
                <div className="RightBlock">
                    <div className="VerticalMenu">
                        <div className="VertMenu">
                            <a className="El" href="#">1 <br/>
                            $ price | num g</a>
                            <a className="El" href="#">2 <br/>
                            $ price | num g</a>
                            <a className="El" href="#">3 <br/>
                            $ price | num g</a>
                            <a className="El" href="#">4 <br/>
                            $ price | num g</a>
                            <a className="El" href="#">5 <br/>
                            $ price | num g</a>
                            <a className="El" href="#">6 <br/>
                            $ price | num g</a>
                            <a className="El" href="#">7 <br/>
                            $ price | num g</a>
                            <a className="El" href="#">8 <br/>
                            $ price | num g</a>

                        </div>
                        <div className="RightBlockInfo">
                            <p className="InfoTitle">
                                Total Price: $ num
                            </p>
                            <div className="InfoButtonWraper">
                                <button className="InfoPriceButton">$ price</button>
                            </div>
                        </div>        
                    </div>            
                </div>
            </div>
        </div>
    );
}