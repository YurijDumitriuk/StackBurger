import React from 'react'
import Navbar from '../components/Navbar'
import './Details.css'




export default function Details(){
    return (
        <div>
            <Navbar/>
            <div className="Box">
                <div className="CenterBlock">
                    <div className="ComponentImage">
                        {}
                    </div>
                </div>
                <div className="RightBlock">
                    <div className="RightBlockInside">
                        <div className="VertMenu">
                            {}
                        </div>
                        <div className="RightBlockInfo">
                            <p className="InfoTitle">
                                Total Price: $ {}
                            </p>
                            <input  type="text" className="BurgerNameInput" placeholder="Enter your burger name..."></input>
                            <div className="InfoButtonWraper">
                                <button  className="InfoPriceButton">Create</button>
                            </div>
                        </div>        
                    </div>            
                </div>
            </div>
        </div>
    );
}

