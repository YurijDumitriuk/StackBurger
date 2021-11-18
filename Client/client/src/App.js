import logo from './images/logo.svg';
import './App.css';
import BurgerCard from './components/BurgerCard.js'
import Navbar from './components/Navbar.js'
import { environment } from './env'
import {Burger} from './models/Burger'
import { Suspense } from 'react';
import { useState } from 'react';

/*const Burger={
  name:,
  components[]:,
  calories:,
  price:,
};*/

let burgers = null;


async function Get() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
  const response = await fetch(environment.GetResUrl("/burgers"), requestOptions)
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
    burgers.forEach((item,index)=>{
      let comp
      let componentsString="Condiments and toppings as desired, such as mayonnaise, mustard, shredded lettuce, onions, tomatoes, and pickles 4 ounces freshly ground beef chuck, divided into two 2-ounce balls";
      try{
        comp = GetBurgerComponents(item.id);
      }
      catch{
        console.log("error")
      }
      console.log(comp)
      itemList.push(<BurgerCard name={item.name} components={componentsString} calories={567} price={"12.00"} />)
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

