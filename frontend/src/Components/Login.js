import Context from "../Contexts/Context"
import React, {useContext, useState, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import config from "../config";

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl

function Login(){
     const {totalUser, setLoginFlag, loginFlag} = useContext(Context);
     const navigate = useNavigate();
     const result = useRef(0);
    //  const loadingUser = useRef(0);
        // const {loginStatus, setLoginStatus} =use
     
     function handleLogin(e){
        e.preventDefault();
        let uname = document.getElementById("uname").value;
        let password = document.getElementById("password").value;

        let data ={
            "userName": uname,
            "pass": password
        }

        fetch(ApiUrl+`/user/login`, {  
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => result.current = data)

        if ( result.current === "PASSWORDS MATCH"){

            console.log("login in yes")
            navigate('/');
        }
    }



    return(
        <form>
         <label >username:</label><br/>
         <input type="text" id="uname" name="uname"/><br/>
         <label >password:</label><br/>
         <input type="text" id="password" name="password"/><br/>
         <input type="submit" value="Submit" onClick={handleLogin}></input>
        </form>
    )

}

export default Login;