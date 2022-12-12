import { useContext, useRef, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router';
import Context from '../Contexts/Context';
import config from '../config';
import HeaderBar from './HeaderBar';
import styled from 'styled-components';

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


function CreateAccount() {
    const {refreshInventory} = useContext(Context);

    const navigate = useNavigate();
    const returnInfo = null;


    async function HandleSubmit(e) {
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

        const res = await fetch(ApiUrl + `/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify(data)
        }).then(res => res.statusText)
        console.log('res:', res)

            if (res) {
                await refreshInventory();
                // await refreshInventory();
                alert("account create successfully");

                navigate('/');
            }else{
                console.log("something is wrong")
            }
    }


return (
    <div>
    <HeaderBar/>
    <Form>
        <label >First name:</label><br />
        <Input type="text" id="fname" name="fname" /><br />
        <label >Last name:</label><br />
        <Input type="text" id="lname" name="lname" /><br />
        <label >userName:</label><br />
        <Input type="text" id="uname" name="uname" /><br />
        <label >password:</label><br />
        <Input type="text" id="pass" name="pass" /><br />
        <Submit type="submit" value="Submit" onClick={HandleSubmit}>submit</Submit>
    </Form>
    </div>

)
}

export default CreateAccount;