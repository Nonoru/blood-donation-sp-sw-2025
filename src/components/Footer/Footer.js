import { useState } from 'react'
import './Footer.scss'
function Footer(){
    const [state, setState] = useState(0);

    const scrollToFooter = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }
    const scrollToHeader = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    const changeState = (state) => {
        if(state === 0) {
            scrollToFooter();
        }else if(state === 1) {
            scrollToHeader();
        }
        return setState(state => 1 - state);
    }
    return(
        <footer onClick={() => changeState(state)}>
            Trang web được thiết kế bởi Nonoru
        </footer>
    )
}
export default Footer