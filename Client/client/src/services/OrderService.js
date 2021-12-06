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