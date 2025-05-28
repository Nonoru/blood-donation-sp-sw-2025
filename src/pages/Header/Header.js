import { Link } from 'react-router-dom';
import {itemMenu, items} from '../../components/HeaderCall'
import './Header.scss'

function Header(){
    return(
        <header className="header">
            <div className="menu">
                {itemMenu(0,2)}
                <div className="logo">
                    <Link to="/" className="link">
                        <img src="./img/logo.png" alt="Logo"/>
                        <img src ="./img/title.png" alt="Blood Bridge"/>
                    </Link>
                </div>
                {itemMenu(2,items.length)}
            </div>
        </header>
    )
}
export default Header