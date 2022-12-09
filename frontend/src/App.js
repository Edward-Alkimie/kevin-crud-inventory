import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import Context from './Contexts/Context'
import HeaderBar from './Components/HeaderBar.js'
import AddInventory from './Components/AddInventory.js';
import Inventory from './Components/inventory.js'
import CreateAccount from './Components/CreateAccount.js';
import Login from './Components/Login.js'

// import './App.css';

function App() {
  const [totalInventory, setTotalInventory] = useState([]);
  const [totalUser, setTotalUser] = useState([]);
  const [selectUser, setSelectUser] = useState("all");
  const [inventory, setInventory] = useState([]);
  const [loginFlag, setLoginFlag] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const [userloading, setUserloading] =useState(true)

  useEffect (()=>{
    fetch('http://localhost:4001/inventory')
    .then(inventory=> inventory.json())
    .then(data => setTotalInventory(data))

  }, [totalInventory])

  useEffect(()=>{
    fetch('http://localhost:4001/user')
    .then(user=> user.json())
    .then(data => setTotalUser(data))
  }, [totalUser])
    
  return (
    <div className="App">

      <header className="App-header">
        hello inventory1
      </header>
      <Context.Provider value ={{totalInventory, setTotalInventory, 
                                  totalUser, selectUser, 
                                  setSelectUser, inventory, 
                                  setInventory, loginFlag ,setLoginFlag}}>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HeaderBar/>}/>
        <Route path='/add' element={<AddInventory/>}/>
        <Route path='/inventory/:id' element={<Inventory/>}/>
        <Route path='/createaccount' element={<CreateAccount/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>

      </BrowserRouter>
      </Context.Provider>
    </div>
  );
}

export default App;
