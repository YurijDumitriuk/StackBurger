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

async function GetCustom(userId){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
      const response = await fetch(environment.GetResUrl("/burger/custom/" + userId), requestOptions)
      const data = await response.json()
      return data
}

export const GetCustomBurgers = async (userId) => {
    let Data = null;
    try { Data = await GetCustom(userId) }
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