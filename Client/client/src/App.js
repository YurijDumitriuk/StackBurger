import logo from './images/logo.svg';
import './App.css';
import BurgerCard from './components/BurgerCard.js'
import Navbar from './components/Navbar.js'
import { environment } from './env'
import {Burger} from './models/Burger'
import { Suspense } from 'react';
import { useState } from 'react';
//import { BurgerService } from './services/BurgerService'
import { Link } from "react-router-dom";
let burgers = null;


async function Get() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
  const response = await fetch(environment.GetResUrl("/burger"), requestOptions)
  const data = await response.json()
  return data
}

async function GetBurgerComponents(id){
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
  const response = await fetch(environment.GetResUrl("/components/" + id), requestOptions)
  const data = await response.json()
  return data
}


let itemList=[];



async function InitializeData(setLoading) {
  let Data = null;
  try { Data = await Get() }
  catch {
    alert("Resource server doesn't respond")
    return
  }
  console.log(Data)
  if (Data.status !== 200) {
  }
  else {
    burgers = Data.data
    console.log(burgers);
    burgers.forEach((item,index)=>{
      var componentsList = "";
      item.components.forEach((c,ind)=>{
        componentsList += c;
        if(ind !== item.components.length - 1){        
          componentsList += ", ";
        }
        else{
          componentsList += ".";
        }
      })
      itemList.push(<BurgerCard name={item.name} components={componentsList} calories={item.calories} price={item.price} />)
    })
    setLoading(false)
  }

}



export default function App() {
  const [isLoading, setLoading] = useState(true);
  InitializeData(setLoading)
  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  return (
      <div className="App">
        <Navbar />
        <div className="CardWrapper">
          {itemList}
        </div>
      </div>
  );
}

