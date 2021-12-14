import { Order } from "../models/Order"
import { environment } from "../env";
import { ClearCart } from "./CartService";
 

async function Post(order){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
    }
    const response = await fetch(environment.GetResUrl("/order"), requestOptions)
    const data =  await response.json();
    return data
}

export const PostOrder = async (time, userId, burgers) => {
    let burgersIds = [];
    burgers.forEach(b => {
        burgersIds.push(b.id);
    });
    let order = new Order(time, userId, burgersIds);
    let result = await Post(order);
    if(result.status === 200){
        console.log("Orders saved!");
        ClearCart();
        return true;
    }
}

async function Get(userId){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
      const response = await fetch(environment.GetResUrl("/order/user/" + userId), requestOptions)
      const data = await response.json()
      return data
}

export const GetOrders = async (userId) => {
    let Data = null;
    try { Data = await Get(userId) }
    catch {
        alert("Resource server doesn't respond")
        return
    }
    //console.log(Data)
    if (Data.status !== 200) {
        console.log("error");
    }
    else {
        console.log(Data);
        return Data;        
    }
}