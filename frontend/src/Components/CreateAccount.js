import { useContext } from 'react'
import Context from '../Contexts/Context';

function CreateAccount(){
    const {totalUser} = useContext(Context);

    function handleSubmit(e) {
        e.preventDefault()
        let firstN = document.getElementById("fname").value;
        let lastN = document.getElementById("lname").value;
        let userN = document.getElementById("uname").value;
        let password = document.getElementById("pass").value;

        // fetch('http://localhost:4001/user/auc')
        // .then(user=>)

        // console.log("total user:",totalUser)
        // if (totalUser.map(item =>{
        //     item.userName === userN;
        // })){
        //     alert("there is already a duplicated username please try again")
        //     return false;
        // }
        // totalUser.map(user => {if (user.userName === userN){
        //     alert("there is already a duplicated username please try again");
        //     return false;

        // }});
        // if (console.log("this is typeof",typeof(totalUser.filter(item => item.userName===userN)))){
        //     alert("there is already a duplicated username please try again");
        //     return false;
        // }
    
        console.log(firstN,lastN,userN, password);
    
        let data = {
            "firstName": firstN,
            "lastName": lastN,
            "userName": userN,
            "password": password
        }
        console.log(data);
    
        fetch(`http://localhost:4001/user`, {  
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify(data)
        })
            .then(res => console.log(res));
            // window.location.reload();
    }



    return(
        <form>
         <label >First name:</label><br/>
         <input type="text" id="fname" name="fname"/><br/>
         <label >Last name:</label><br/>
         <input type="text" id="lname" name="lname"/><br/>
         <label >userName:</label><br/>
         <input type="text" id="uname" name="uname"/><br/>
         <label >password:</label><br/>
         <input type="text" id="pass" name="pass"/><br/>
         <input type="submit" value="Submit" onClick={handleSubmit}></input>
        </form>

    )
}

export default CreateAccount;