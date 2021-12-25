import { GetBurgerById } from "./BurgerService"

export const GetBurgerDetails = async (id) => {
    var Burger = await GetBurgerById(id);
    if(Burger !== null) {
        sessionStorage.setItem("burgerDetails", JSON.stringify(Burger.data));
        console.log("Burger details added to storage: ", Burger);
        return true;
    }
    else{
        console.log("Something goes wrong");
        return false;
    }
}