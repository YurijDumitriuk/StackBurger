import './App.css';
import BurgerCard from './components/BurgerCard.js'
import Navbar from './components/Navbar.js'
import { environment } from './env'
import { useState, useEffect } from 'react';
import { GetComponents } from './services/ComponentsService';


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

async function InitializeData(setDataLoaded, handleCounter) {
  itemList = [];
  let Data = null;
  try { Data = await Get() }
  catch {
    alert("Resource server doesn't respond")
    return
  }
  //console.log(Data)
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



export default function App() {
  if(sessionStorage.getItem("componentsList") === null){
    GetComponents();
  }
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
      <div className="App">
          <Navbar itemCounter={counter} />
          <div className="CardWrapper">
            {itemList}
          </div>

        </div>
    );    
  }
  else{
    return(
      <div className="App">
          <Navbar itemCounter={counter} />
          <div className="CardWrapper">
            {itemList}
          </div>

        </div>
    );    
  }
}


