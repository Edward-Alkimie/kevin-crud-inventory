// import { application } from "express";
import { useContext, useEffect, useState } from "react";
import {useNavigate, useParams} from 'react-router-dom'
import Context from "../Contexts/Context";
import config from '../config';
import cookie from 'cookie'

// const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl

function Inventory(){
    const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl
    const {inventory} = useContext(Context);
    const {returnValue, setReturnValue} = useState(null);
    const navigate = useNavigate();
    const {id} = useParams();
    let cookiesLogin = cookie.parse(document.cookie);

    function DeleteInventory(){
        if (cookiesLogin.login==="true" && parseInt(cookiesLogin.userId) === inventory.user_id ){
            fetch(ApiUrl + "/inventory" ,{
                method: 'DELETE',
                headers:{'Content-Type': 'application/json'},
                mode:'cors',
                body: JSON.stringify({"id":id})
            })
            .then(res => setReturnValue(res.statusText))
            alert("inventory has been deleted");
            navigate('/');
            window.location.reload();
        }
        else{
            alert("you do not have the permission to delete")
        }
    }

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