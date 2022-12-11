import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Context from '../Contexts/Context';
import Inventory from './inventory';

function Search() {
    const { totalInventory, totalUser,setSelectUser,selectUser, setInventory, inventory} = useContext(Context);
    // console.log("inside the search page return total Inventory", totalInventory);
    // console.log("inside the search page return total user", totalUser);
    const [inventoryList, setInventoryList] = useState(totalInventory);
    // const [userList, setUserList] = useState([]);
    // console.log("inside the search page return inventoryList", inventoryList);

    function userFilter(e){
        let userFilterId = e.currentTarget.value;
        console.log("this is userFitler", userFilterId);
        setSelectUser(userFilterId);
        console.log('this is ', selectUser)

        if (userFilterId === "all"){
            setInventoryList(totalInventory);
        }
        else{
            console.log('userFilter->',selectUser)
            setInventoryList(totalInventory.filter(item =>item.user_id === parseInt(userFilterId)))
        }
    }

    function searchAll(e) {
        const searchString = e.currentTarget.value;
        console.log("here is the search string", searchString);
        // let newArray = totalInventory;
        if (searchString){
            console.log("this is searchstring:",typeof(searchString))
            setInventoryList(inventoryList);

        }else{
            let newArray = inventoryList.filter(item => item.itemName.toLowerCase().includes(searchString))
            setInventoryList(newArray)
        }
        console.log("inside the searchall", inventoryList)
    }

    // function AssignInventory(individualInventory){
    //     useEffect(()=>{
    //         setInventory(individualInventory)
    //     }, [inventory])
    // }
 
    return (
        <div>
            <form>
                {/* <input type="submit" value="Submit"></input> */}
                <label htmlFor="managerSelect">Select Manager:</label>&emsp;
                
                
                <select className="managerSelect" onChange={userFilter}>
                    <option value="all">All</option>
                    {totalUser.map(user => {
                        return (
                            <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
                        )
                    })}
                    
                </select>
            
             
                <input id="searchbar" onChange={searchAll} type="text"
                    name="search" placeholder="Search inventory.."></input>
                <input type="submit" value="Submit" />
            </form>
            <h2 className="inventoryInfo">{inventoryList?.map(individualInventory => {
                return (
                <ul className='listofinventory' key={"class"+individualInventory.id}>
                    <Link to={`/inventory/${individualInventory.id}`} onClick={()=>setInventory(individualInventory)}>
                        <li key={individualInventory.id} >
                            {/* {inventory.itemName}| */}
                            {individualInventory.id}|
                            {individualInventory.itemName}|
                            {individualInventory.description} |
                            {individualInventory.quantity}</li>
                    </Link>
                </ul>
                )
            })}</h2>

        </div>


    )
}
export default Search;