import Context from "../Contexts/Context"
import React, {useContext, useState, useRef, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import config from "../config";
import HeaderBar from "./HeaderBar.js"


const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl

function Login(){
     const {totalUser, setLoginFlag, loginFlag} = useContext(Context);
     const navigate = useNavigate();
     const loadingUser = useRef(0);   
     async function HandleLogin(e){
        e.preventDefault();
        let uname = document.getElementById("uname").value;
        let password = document.getElementById("password").value;
        loadingUser.current =uname;

        let data ={
            "userName": uname,
            "pass": password
        }
        console.log(data);

        const res = await fetch(ApiUrl+`/user/login`, {  
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify(data)
        }).then(res => res.json())
        // console.log(res)
        if ( res === "PASSWORDS MATCH"){

            let userLoginCurrent = totalUser.filter(user => user.userName === loadingUser.current)
            // console.log(userLoginCurrent);

            document.cookie = 'login=true'
            document.cookie = `userId=${userLoginCurrent[0].id}`
            document.cookie = `userName=${userLoginCurrent[0].userName}`
            // console.log(document.cookie)
            alert("login successfully");
            navigate('/');
        }else(
            console.log("Something wrong with PASSWORDS")
        )
    }





    return(
        <div>
            <HeaderBar/>
        <form>
         <label >username:</label><br/>
         <input type="text" id="uname" name="uname"/><br/>
         <label >password:</label><br/>
         <input type="text" id="password" name="password"/><br/>
         <input type="submit" value="Submit" onClick={HandleLogin}></input>
        </form>
        </div>
    )

}

export default Login;