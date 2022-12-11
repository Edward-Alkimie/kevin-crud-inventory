import { useContext, useRef, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router';
import Context from '../Contexts/Context';
import config from '../config';

const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl


function CreateAccount() {

    const navigate = useNavigate();
    const returnInfo = useRef(null);


    function handleSubmit(e) {
        e.preventDefault()
        let firstN = document.getElementById("fname").value;
        let lastN = document.getElementById("lname").value;
        let userN = document.getElementById("uname").value;
        let password = document.getElementById("pass").value;

        console.log(firstN, lastN, userN, password);

        let data = {
            "firstName": firstN,
            "lastName": lastN,
            "userName": userN,
            "password": password
        }
        console.log(data);

        fetch(ApiUrl + `/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify(data)
        })
            .then(res => returnInfo.current = res.statusText);
        // window.location.reload();
        // console.log("log out returninfo:",returnInfo.current);
    }

    useEffect(() => {
        console.log(returnInfo.current === "Created")
        if (returnInfo.current) {
            alert("account create successfully");
            navigate('/');

        }}, [returnInfo.current])

return (
    <form>
        <label >First name:</label><br />
        <input type="text" id="fname" name="fname" /><br />
        <label >Last name:</label><br />
        <input type="text" id="lname" name="lname" /><br />
        <label >userName:</label><br />
        <input type="text" id="uname" name="uname" /><br />
        <label >password:</label><br />
        <input type="text" id="pass" name="pass" /><br />
        <input type="submit" value="Submit" onClick={handleSubmit}></input>
    </form>

)
}

export default CreateAccount;