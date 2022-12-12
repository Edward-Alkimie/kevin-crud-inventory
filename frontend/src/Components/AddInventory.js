import config from '../config.js';
import HeaderBar from '../Components/HeaderBar.js'
import cookie from 'cookie';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import Context from '../Contexts/Context.js'
import styled from 'styled-components';

const Form = styled.form`
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
`

const Input =styled.input`
    width: 30%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;    
`
const Submit = styled.button`
    width: 30%;
    background-color: black;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl

function AddInventory() {

    const navigate = useNavigate();
    const {refreshInventory} = useContext(Context);

    async function handleSubmit(e) {
        e.preventDefault()
        let cookieInfo = cookie.parse(document.cookie)

        console.log(typeof (cookieInfo.login))
        console.log(cookieInfo.userId)

        if (cookieInfo.login !== "true") {
            alert("please login before you add an inventory")
        }

        let userID = cookieInfo.userId; //cookie 
        let productName = document.getElementById("itemNameID").value;
        let productDescription = document.getElementById("descriptionID").value;
        let quantity = document.getElementById("quantityID").value;

        console.log(userID, productName, productDescription, quantity);
        // document.cookie

        let data = {
            "user_id": userID,
            "itemName": productName,
            "description": productDescription,
            "quantity": quantity
        }

        
        fetch(ApiUrl + `/inventory`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify(data)
        })
            .then(res => console.log(res))
            .then(()=>refreshInventory())
            .then(()=>navigate('/'));

    }

    return (
        <div className="inventoryInput">
            <HeaderBar />
            <Form>
                <label htmlFor="addInventory">New Inventory</label>
                <Input type="text" id="itemNameID" placeholder="item name"></Input>
                <Input type="text" id="descriptionID" placeholder="description"></Input>
                <Input type="number" id="quantityID" placeholder="quantity"></Input>
                <Submit type="submit" value="Submit" onClick={handleSubmit}>submit</Submit>
            </Form>
        </div>
    )
}
export default AddInventory;