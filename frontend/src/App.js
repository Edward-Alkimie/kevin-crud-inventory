import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import Context from './Contexts/Context'
import HeaderBar from './Components/HeaderBar.js'
import AddInventory from './Components/AddInventory.js';
import Inventory from './Components/inventory.js'
import CreateAccount from './Components/CreateAccount.js';
import Login from './Components/Login.js';
import config from '../src/config.js';
import Search from './Components/Search';
import Home from './Components/Home';

// import './App.css';

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl
console.log(ApiUrl);

function App() {
  const [totalInventory, setTotalInventory] = useState([]);
  const [totalUser, setTotalUser] = useState([]);
  const [selectUser, setSelectUser] = useState("all");
  const [inventory, setInventory] = useState([]);
  const [loginFlag, setLoginFlag] = useState(false);
  
  // const [loading, setLoading] = useState(true);
  // const [userloading, setUserloading] =useState(true)

 async function refreshInventory(){
    return fetch(ApiUrl+'/inventory')
    .then(inventory=> inventory.json())
    .then(data => setTotalInventory(data))
  }

  useEffect (()=>{
    refreshInventory();
  }, [])

  async function refreshUserlist() {
    return fetch(ApiUrl + '/user')
      .then(user => user.json())
      .then(data => setTotalUser(data))
  }

  useEffect(()=>{
    refreshUserlist();
  }, [])
    
  return (
    <div className="App">

      <header className="App-header">
      </header>
      <Context.Provider value ={{totalInventory, setTotalInventory, 
                                  totalUser, selectUser, 
                                  setSelectUser, inventory, 
                                  setInventory, loginFlag ,
                                  setLoginFlag, refreshInventory, 
                                  refreshUserlist}}>
      <BrowserRouter>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add' element={<AddInventory/>}/>
        <Route path='/inventory/:id' element={<Inventory/>}/>
        <Route path='/createaccount' element={<CreateAccount/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/search' element={<Search/>}/>
      </Routes>

      </BrowserRouter>
      </Context.Provider>
    </div>
  );
}

export default App;
