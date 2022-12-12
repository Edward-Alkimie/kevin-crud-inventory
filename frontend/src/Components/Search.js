import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Context from '../Contexts/Context';
import cookie from 'cookie';
import styled from 'styled-components';

const Div1 = styled.div`
    // grid-template-columns: 0fr 1fr 0fr; 
`
const Body = styled.h2`
    background-color:#eee;
    color:#444;
    font-family:sans-serif;    
  `
const Manager = styled.label`
    font-size: 25px;
    font-family: sans-serif;
`

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



function Search() {
    const { totalInventory, totalUser,setSelectUser,selectUser, setInventory, inventory} = useContext(Context);
    const [inventoryList, setInventoryList] = useState(totalInventory);
    const cookieInfo = cookie.parse(document.cookie);

    function userFilter(e){
        let userFilterId = e.currentTarget.value;

        console.log("this is userFitler", userFilterId);
        setSelectUser(userFilterId);
        console.log('this is ', selectUser)

    }

    function searchAll(e) {
        const searchString = e.currentTarget.value;
        console.log("here is the search string", searchString);
        // let newArray = totalInventory;
        if (!searchString){
            console.log("this is searchstring:",typeof(searchString))
            setInventoryList(totalInventory);

        }else{
            let newArray = inventoryList.filter(item => item.itemName.toLowerCase().includes(searchString))
            setInventoryList(newArray)
        }
        console.log("inside the searchall", inventoryList)
    }

    function CheckLogin(){
            return (
                <option value="current manager" key={cookieInfo.userId}> Current:{cookieInfo.userName} </option>
            )
        // console.log(cookieInfo.login)
        // if (true){
            // setInventoryList(totalInventory.filter(item =>item.user_id === parseInt(cookie.userId)));

        // }
    }
    useEffect(()=>{
        CheckLogin();
    },[])

 
    return (
        <div>
            {/* <HeaderBar/> */}
            <Form>
                {/* <input type="submit" value="Submit"></input> */}
                <Manager htmlFor="managerSelect">Select Manager:</Manager>&emsp;
                <select className="managerSelect" onClick={userFilter} defaultValue= {cookieInfo?.userId?.toString()}>
                {/* <select className="managerSelect" onClick={userFilter}> */}

                    <option value="all">All</option>
                    {totalUser.map(user => {
                        return (
                            <option key={user.id} value={user.id} onClick={userFilter}> {user.firstName} {user.lastName}</option>
                        )
                    })}
                    
                </select>
                <input id="searchbar" onChange={searchAll} type="text"
                    name="search" placeholder="Search inventory.."></input>
                <submit type="submit" value="Submit" />
            </Form>


            
            {/* <h3>InventoryId</h3>
            <h3>Item Name</h3>
            <h3>description</h3>
            <h3>quantity</h3> */}

            <div className="inventoryInfo">{inventoryList?.filter(item =>item.user_id.toString() === selectUser).map(individualInventory => {
                return (
                <Body className='listofinventory' key={"class"+individualInventory.id}>

                    <Link to={`/inventory/${individualInventory.id}`} style={{textDecoration: 'none'}} onClick={()=>setInventory(individualInventory)}>
                        <div className="content" key={individualInventory.id} >
                            <a data-label="InventoryId">{individualInventory.id} </a>
                            <a data-label="Item Name">{individualInventory.itemName} </a>
                            <a data-label="description">{individualInventory.description} </a>
                            <a data-label="quantity">{individualInventory.quantity} </a>
                        </div>
                    </Link>
                </Body>
                )
            })}</div>

        </div>


    )
}
export default Search;