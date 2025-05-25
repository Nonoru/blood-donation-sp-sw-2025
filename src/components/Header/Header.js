import { Link } from 'react-router-dom';
import './Header.scss'

const items = [
  { class: 'blog', name:'Blog' , path: 'blog' },
  { class: 'doc', name:'Nghiên cứu', path: 'doc' },
  { class: 'feature', name:'Tính năng', path:'feature' },
  { class: 'signin', name:'Đăng nhập', path: 'login' },
]

function Header(){
    const itemMenu = (a,b) => {
        return(
            items.slice(a,b).map( i => (
                <div className={i.class} >
                    <Link to ={`/${i.path}`} className="link">
                        {i.name}
                    </Link>
                </div>
            ))
        )
    }
    return(
        <header className="header">
            <div className="menu">
                {itemMenu(0,2)}
                <div className="logo">
                    <Link to="/" className="link">
                        <img src="./img/logo.png" alt="Logo" />
                        <img src ="./img/title.png" alt="Logo Text" />
                    </Link>
                </div>
                {itemMenu(2,items.length)}
            </div>
        </header>
    )
}
export default Header