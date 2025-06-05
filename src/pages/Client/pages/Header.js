import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {itemMenu, items} from '../components/HeaderForm'
import '../styles/Header.scss'

function Header(){    const [isVisible, setIsVisible] = useState(true);
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

    return(
        <header className={`header ${isVisible ? 'header-visible' : 'header-hidden'} ${hasScrolled ? 'header-scrolled' : ''}`}>
            <div className="other"></div>
            <div className="overlay-header"></div>
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