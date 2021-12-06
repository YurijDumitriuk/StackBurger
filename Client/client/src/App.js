import './App.css';
import BurgerCard from './components/BurgerCard.js'
import Navbar from './components/Navbar.js'
import { environment } from './env'
import { useState, Component } from 'react';


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



async function InitializeData(handleCounter) {
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
        itemList.push(<BurgerCard handleCounterBack={handleCounter} id={item.id} name={item.name} components={componentsList} calories={item.calories} price={item.price} />)
      })
    }
    //state({isLoading: false});
  }

}



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      counter: localStorage.getItem("itemsCount")
    }
  }

  handleCounterBack = (childCount) => {
    setTimeout(() => { 
      this.setState({counter: Number(this.state.counter) + Number(1)});
    }, 100);
    
    //console.log("Counter in app: ", this.state.counter);
  }

  render() {
    console.log("Render menu")
    const isLoading = this.state.isLoading;
    const counter = this.state.counter;
    if(this.state.isLoading){
    InitializeData(this.handleCounterBack).then(() => {
      //console.log("Data initialized: ", this.state.isLoading)
      this.setState({ isLoading: false });
      //console.log("Data initialized: ", this.state.isLoading)      
    });
  }
    if(this.state.isLoading === true){
      return (<h1>Loading data</h1>); 
    }
    //console.log("waiting for data to be initialized") 
    return(
      <div className="App">
          <Navbar itemCounter={this.state.counter} />
          <div className="CardWrapper">
          {<BurgerCard handleCounterBack={() => this.state.counter} id={1} name={1} components={1} calories={1} price={1} />}
            {itemList}
          </div>
        </div>
    );    
  }
}


