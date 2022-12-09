import { useContext } from "react";
import {useParams} from 'react-router-dom'
import Context from "../Contexts/Context";

function Inventory(){

    const {inventory} = useContext(Context);
    const {id} = useParams();
    console.log(id);
    console.log(inventory);
// an if statement to double check the inventory if is [] future
    return(
        <div>
            here is the product!!!!
             
            <h1>{inventory.itemName} <br/>
                {inventory.description} <br/>
                {inventory.quantity}</h1>
        </div>

    )


}

export default Inventory;