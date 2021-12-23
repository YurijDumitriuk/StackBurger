import { environment } from "../env";
async function Get(){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
      const response = await fetch(environment.GetResUrl("/component"), requestOptions)
      const data = await response.json()
      return data
}

export const GetComponents = async () => {
    let Data = null;
    try { Data = await Get() }
    catch {
        alert("Resource server doesn't respond")
        return
    }
    //console.log(Data)
    if (Data.status !== 200) {
        console.log("error");
    }
    else {
        sessionStorage.setItem("componentsList", JSON.stringify(Data.data));        
    }
}