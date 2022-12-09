import config from '../config.js';

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl

function AddInventory(){

    return (
        <div className="inventoryInput">
            <form>
                <label htmlFor="addInventory"> add a new Inventory</label>
                <input type="text" id ="itemNameID" placeholder="item name"></input>
                <input type="text" id = "descriptionID" placeholder="description"></input>
                <input type="number" id ="quantityID" placeholder="quantity"></input>
                <input type="submit" value="Submit" onClick={handleSubmit}></input>
            </form>
        </div>
    )
function handleSubmit(e) {
    e.preventDefault()

    let userID = 2; //cookie 
    let productName = document.getElementById("itemNameID").value;
    let productDescription = document.getElementById("descriptionID").value;
    let quantity = document.getElementById("quantityID").value;

    console.log(userID,productName,productDescription,quantity);

    let data = {
        "user_id": userID,
        "itemName": productName,
        "description": productDescription,
        "quantity": quantity
    }

    fetch(ApiUrl +`/inventory`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify(data)
    })
        .then(res => console.log(res));
        window.location.reload();
}
}
export default AddInventory;