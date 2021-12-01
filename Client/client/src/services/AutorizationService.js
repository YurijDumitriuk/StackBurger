export const CheckAuthorization = () => {
    if(localStorage.getItem("userId") === null){
        return false;
    }
    return true;
}
