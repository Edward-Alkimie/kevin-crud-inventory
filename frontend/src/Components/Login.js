import Context from "../Contexts/Context"
import React, {useContext, useState, useRef, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import config from "../config";
import HeaderBar from "./HeaderBar.js"
import styled from "styled-components";

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
        <Form>
         <label >username:</label><br/>
         <Input type="text" id="uname" name="uname"/><br/>
         <label >password:</label><br/>
         <Input type="text" id="password" name="password"/><br/>
         <Submit type="submit" value="Submit" onClick={HandleLogin}>submit</Submit>
        </Form>
        </div>
    )

}

export default Login;