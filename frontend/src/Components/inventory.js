import { application } from "express";
import { useContext } from "react";
import {useParams} from 'react-router-dom'
import Context from "../Contexts/Context";
// import config from '../config';

// const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl


function Inventory(){
    // const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl
    const {inventory} = useContext(Context);
    const {id} = useParams();

    // function DeleteInventory(){
    //     if (true){
    //         fetch(ApiUrl + "/inventory" ,{
    //             method: 'DELETE',
    //             headers:{'Content-Type': 'application/json'},
    //             mode:'cors',
    //             body: JSON.stringify({"id":id})
    //         })
    //         .then(res => console.log(res.statusText))
    //     }

    // }
    // console.log(id);
    // console.log(inventory);
// an if statement to double check the inventory if is [] future
    return(
        <div>
            here is the product!!!!  
            <h1>{inventory.itemName} <br/>
                {inventory.description} <br/>
                {inventory.quantity}</h1>
            <button />
        </div>
    )
}

export default Inventory;