import { environment } from "../env";
import { BurgerPostModel } from "../models/BurgerPostModel";
 

async function Post(burger){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(burger)
    }
    const response = await fetch(environment.GetResUrl("/burger"), requestOptions)
    const data =  await response.json();
    return data
}

export const PostBurger = async (name, userId, components) => {
    let componentsIds = [];
    components.forEach(c => {
        componentsIds.push(c.id);
    });
    componentsIds.reverse();
    let burger = new BurgerPostModel(name, userId, componentsIds);
    let result = await Post(burger);
    console.log("Try to post new burger: ", burger);
    console.log("Rsult: ", result)
    if(result.status === 200){
        console.log("Burger saved!");
        return true;
    }
    return false;
}