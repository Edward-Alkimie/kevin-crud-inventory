// import { application } from "express";
import { useContext, useEffect, useState } from "react";
import {useNavigate, useParams} from 'react-router-dom'
import Context from "../Contexts/Context";
import config from '../config';

// const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl

function Inventory(){
    const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl
    const {inventory} = useContext(Context);
    const {returnValue, setReturnValue} = useState(null);
    const navigate = useNavigate();
    const {id} = useParams();

    function DeleteInventory(){
        if (true){
            fetch(ApiUrl + "/inventory" ,{
                method: 'DELETE',
                headers:{'Content-Type': 'application/json'},
                mode:'cors',
                body: JSON.stringify({"id":id})
            })
            .then(res => setReturnValue(res.statusText))
        }
        else{
            alert("you do not have the permission to delete")
        }
    }

    useEffect(()=>{
        if (returnValue){
            alert("inventory has been deleted");
            navigate('/');
        }
    }, [returnValue])
    console.log(id);
    console.log(inventory);
    return(
        <div>
            here is the product!!!!  
            <h1>{inventory.itemName} <br/>
                {inventory.description} <br/>
                {inventory.quantity}</h1>
            <button onClick={DeleteInventory}>Delete</button>
        </div>
    )
}

export default Inventory;