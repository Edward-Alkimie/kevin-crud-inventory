// import Search from './Search.js'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import LogOut from './LogOut'

const Div1 = styled.div`
    // z-index: 10000;
    // position: fixed;
    top: 0px;
    width: 100%;
    background-color: #333;
    overflow: hidden;
`
const H2 = styled.h2`
    //  position: fixed;
    // position:absolute;
    down:300px;
    // top: 100px;
    display:flex;
    float: left;
    color: #f2f2f2;
    text-align: center;
    padding-top: 5px;
    padding-bottom: 0px;
    padding-right: 30px;
    padding-left:30px;
    text-decoration: none;
    font-size: 25px;
    &:hover,
    &:focus{
        color:palevioletred;
    }
    &:active{
        color:red;
    }
`

function HeaderBar() {

    const navigate = useNavigate();
    function nav() {
        navigate('/login')
    }
    function nav2() {
        navigate('/createaccount')
    }
    function nav3() {
        navigate('/')
    }
    function nav4() {
        navigate('/Add')
    }
    return (
        <div>
            <Div1>
                <H2 className="active" onClick={nav3} >home</H2>
                {/* <h2 onClick={nav3}>home</h2> */}
                <H2 onClick={nav}>login</H2>
                <H2 onClick={nav2}>register</H2>
                <H2 onClick={nav4}>Add New Inventory</H2>
                <H2 onClick={LogOut}>Logout</H2>

            </Div1>
            <div>
                {/* <Search /> */}
            </div>
        </div>
    )
}

export default HeaderBar;
