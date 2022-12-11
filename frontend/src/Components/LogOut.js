function LogOut(){
    document.cookie = 'login=false';
    document.cookie = 'userId=null';
    document.cookie = 'userName=null';
    document.cookie = `user=null`;

    console.log(document.cookie);
}

export default LogOut;