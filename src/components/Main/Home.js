import { useState } from 'react'
import './Home.scss'
const imgSection1 = [
        {src: 'https://placehold.co/600x400/black/white'},
        {src: 'https://placehold.co/600x400/blue/white'},
        {src: 'https://placehold.co/600x400/green/white'},
        {src: './img/4.jpg'}
    ]
function Home(){
    const [imgIndex, setImgIndex] = useState(0)
    const changeImg = (index) => {
        const newImgIndex = ((index + imgSection1.length) % imgSection1.length);
        setImgIndex(newImgIndex);
    }
    const cal = (index) => {
        return index * 900
    }
    return(
        <main>
            <section id='section-1' className='m-0 p-0'>
                <div className='slider'>
                    <div className="list" style={{ left: `${cal(-imgIndex)}px` }}>
                        {imgSection1.map(i=>(
                            <div className='item'>
                                <img src={i.src}/>
                            </div>
                        ))}
                    </div>
                    <div class="buttons">
                        <button id="prev" onClick={()=> changeImg(imgIndex-1)}>{'<'}</button>
                        <button id="next" onClick={()=> changeImg(imgIndex+1)}>{'>'}</button>
                    </div>
                </div>
            </section>
            <section id='section-2'>
                Page 2
            </section>
            <section id='section-3'>
                Page 3
            </section>
        </main>
    )
}
export default Home