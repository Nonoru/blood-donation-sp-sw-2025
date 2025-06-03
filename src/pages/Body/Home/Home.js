import { useState } from 'react'
import Footer from '../../Footer/Footer'

import './Home.scss'
const imgSection1 = [
        {src: '/img/pics/homebanner1.jpg'},
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
    const scrollMore = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        })
    }
    return(
        <>
        <main className='home-page'>
            <section className='section-1'>
                <div className='section-1-title'>
                    <p className='title-main'>Hiến máu <span>an toàn đơn giản</span></p>
                    <div className='title-sub'>
                        <p>
                            Thăm khám, kiểm tra sức khỏe, tư vấn lộ trình hiến máu
                        </p>
                        <div onClick={scrollMore}>Xem thêm</div>
                    </div>
                </div>
                <div className='section-1-img'> 
                    <div className='slider animate-appear'>
                        <div className="list" style={{ left: `${-(imgIndex) * 600 * 1.2 }px` }}>
                            {imgSection1.map(i=>(
                                <div className='item-img'>
                                    <img src={i.src} alt='img'/>
                                </div>
                            ))}
                        </div>
                        <div class="buttons">
                            <button id="prev" onClick={()=> changeImg(imgIndex-1)}>{'<'}</button>
                            <button id="next" onClick={()=> changeImg(imgIndex+1)}>{'>'}</button>
                        </div>
                    </div>
                </div>
            </section>
            <section className='section-2 row'  >
                <div className='section-2-benefits col'>
                    <div className='box animate-appear'>
                        <div className='box-title'>
                            <h2>Lợi ích của hiến máu tại</h2>
                            <h2>Blood Bridge</h2>
                        </div>
                        <div className='box-row row'>
                            <div className='box-row-element col' id='ben-1'>
                                <p>1. Kiểm tra và tư vấn sức khỏe miễn phí</p>
                                <p>Khám sức khỏe tại phòng khám Blood Bride và tư vấn lộ trình hiến máu</p>
                            </div>
                            <div className='box-row-element col' id='ben-2'>
                                <p>2. Nhận ưu đãi và giấy chứng nhận</p>
                                <p>Trao tặng giấy chứng nhận và hỗ trợ nhiều ưu đãi</p>
                            </div>
                        </div>
                        <div className='box-row row'>
                            <div className='box-row-element col' id='ben-3'>
                                <p>3. Cứu người - Chia sẽ máu</p> 
                                <p>Hành động nhân văn - hiến máu giúp người</p>
                            </div>
                            <div className='box-row-element col' id='ben-4'>
                                <p>4.Nâng cao sức khỏe</p> 
                                <p>Hiến máu định kỳ giúp kích thích sản sinh máu mới,
                                     tăng tuần hoàn máu và giúp cơ thể khỏe mạnh.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
               
                <div className='section-2-requirements col'>
                    <div className='box animate-appear'>
                        <div className='box-title'>
                            <h1>Các yêu cầu khi hiến máu</h1>
                        </div>
                        <div className='block-1'>
                            <div className='block-1-main'>
                                A
                            </div>
                            <div className='block-1-ele'>
                                <div className='block-1-ele-child'>
                                    <div>
                                        <div className='icon-block'></div>
                                        <p>Người khỏe mạnh từ 18 cho đến 60  tuổi</p>
                                    </div>
                                    <div>
                                        <div className='icon-block'></div>
                                        <p>Không mắc các bệnh HIV/AIDS, viêm gan B, C, giang mai.</p>
                                    </div>
                                </div>
                                <div className='block-1-ele-child'>
                                    <div>
                                        <div className='icon-block'></div>
                                        <p>Không sử dụng các chất kích thích, ma túy.</p>
                                    </div>
                                    <div>
                                        <div className='icon-block'></div>
                                        <p>Không xăm hình dưới 6 tháng</p>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                        <div className='block-2'>
                            <div className='block-2-ele'>
                                <div className='icon-block'></div>
                                <p>Độ tuổi hợp lệ từ 18 - 60</p>
                            </div>
                            <div className='block-2-ele'>
                                <div className='icon-block'></div>
                                <p>Độ tuổi hợp lệ từ 18 - 60</p>
                            </div>
                            <div className='block-2-ele'>
                                <div className='icon-block'></div>
                                <p>Độ tuổi hợp lệ từ 18 - 60</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='section-3 flex justify-center'>
            </section>
            
        </main>
        <Footer/>
        </>
    )
}
export default Home