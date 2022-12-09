import Search from './Search.js'
import {useNavigate} from 'react-router-dom'
function HeaderBar(){

    const navigate = useNavigate();
    function nav(){
        navigate('/login')
    }
    return (
        <div>
            <h2 onClick={nav}>login</h2>
            <h2>home</h2>
            <Search />
        </div>
    )
}

export default HeaderBar;
