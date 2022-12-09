import Context from "../Contexts/Context"
import React, {useContext, useState, useRef} from 'react'

function Login(){
     const {totalUser, setLoginFlag} = useContext(Context);
     const loadingUser = useRef(0);
     
     function handleLogin(e){
        e.preventDefault();
        let uname = document.getElementById("uname").value;
        // loadingUser.current = uname;
        loadingUser.current =totalUser.filter(user => user.userName===uname);
        console.log(loadingUser.current.length)

        if (loadingUser.current.length === 0){
            console.log("loadingUser is not defined")

        }else{
            console.log("user is here")
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