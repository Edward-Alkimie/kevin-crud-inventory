// import { application } from "express";
import { useContext, useEffect, useState } from "react";
import {useNavigate, useParams} from 'react-router-dom'
import Context from "../Contexts/Context";
import HeaderBar from './HeaderBar.js';
import config from '../config';
import cookie from 'cookie'

// const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl

function Inventory(){
    const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl
    const {inventory, refreshInventory} = useContext(Context);
    const {returnValue, setReturnValue} = useState(null);
    const navigate = useNavigate();
    const {id} = useParams();
    let cookiesLogin = cookie.parse(document.cookie);

    async function DeleteInventory(){
        if (cookiesLogin.login==="true" && parseInt(cookiesLogin.userId) === inventory.user_id ){
            fetch(ApiUrl + "/inventory" ,{
                method: 'DELETE',
                headers:{'Content-Type': 'application/json'},
                mode:'cors',
                body: JSON.stringify({"id":id})
            })
            .then(res => setReturnValue(res.statusText))
            .then(()=>console.log(returnValue))

            await refreshInventory();
            await refreshInventory();
            alert("inventory has been deleted");
            // refreshInventory();
            navigate('/');
            // window.location.reload();
        }
        else{
            alert("you are not login to the proper manager to delete this data")
        }
    }

    console.log(id);
    console.log(inventory);
    return(
        <div>
            <HeaderBar/>
            here is the product!!!!  
            <h1>{inventory.itemName} <br/>
                {inventory.description} <br/>
                {inventory.quantity}</h1>
            <button onClick={DeleteInventory}>Delete</button>
        </div>
    )
}

export default Inventory;