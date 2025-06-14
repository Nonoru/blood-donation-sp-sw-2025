import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {itemMenu, items} from '../components/HeaderForm'
import logo from '../../../assets/logo/logo.png'
import title from '../../../assets/logo/title.png'
import '../styles/Header.scss'

function Header({userInfo, setUserInfo}){    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {        
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setHasScrolled(currentScrollY > 50);
            
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                // Cuộn xuống hơn 200px -> ẩn navbar
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY) {
                setIsVisible(true);
            }
            
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        if(userInfo.isAuthenticated === true)
            setUserInfo(prev => ({...prev, isAuthenticated:false}))
    }
    return(
        <header className={`header ${isVisible ? 'header-visible' : 'header-hidden'} ${hasScrolled ? 'header-scrolled' : ''}`}>
            <div className="other"></div>
            <div className="overlay-header"></div>
            <div className="menu">
                {itemMenu(0,2)}
                <div className="logo">
                    <Link to="/" className="link">
                        <img src={logo} alt="Logo"/>
                        <img src ={title} alt="Blood Bridge"/>
                    </Link>
                </div>
                {itemMenu(2,items.length)}
                {userInfo.isAuthenticated === false && 
                    <div className="login">
                        <Link to ={`/login`} className="link">
                            <img src={`/img/icons/login.svg`} style={{ transform: 'rotate(180deg)'}} className ='icon'/>
                            <span>Đăng nhập</span>
                        </Link>
                    </div>
                }
                {userInfo.isAuthenticated === true && 
                    <div className="logout" onClick={handleLogout} style={{cursor: "pointer"}}>
                        <div className='user-info link'>
                            <img src={`/img/icons/user.svg`}  className ='icon'/>
                            {userInfo.username}
                        </div>
                        <div className="link" onClick={handleLogout} style={{cursor: "pointer"}}>
                            <img src={`/img/icons/login.svg`}  className ='icon'/>
                            <span>Đăng xuất</span>
                        </div>
                    </div>
                }
            </div>
        </header>
    )
}
export default Header