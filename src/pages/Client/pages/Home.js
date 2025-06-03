import { useState } from 'react'
import Footer from './Footer'

import '../styles/Home.scss'
const imgSection1 = [
    {src: 'https://images.pexels.com/photos/6753457/pexels-photo-6753457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
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
    const scrollToSection2 = () => {
        const section2 = document.getElementById('section-2');
        if (section2) {
            section2.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return(
        <>
        <main className='home-page'>
            <section className='section-1'>
                <div className="section-1-gray-overlay"></div>
                <div className='section-1-img-bg'>
                  <img className='single-bg-img' src={imgSection1[0].src} alt='img'/>
                </div>
                <div className='section-1-content'>
                  <div className='section-1-title'>
                      <p className='title-main'>Phần mềm Quản lý Y tế Học đường</p>
                      <div className='title-sub'>
                          <p>Giải pháp toàn diện giúp nhà trường quản lý sức khỏe học sinh hiệu quả, kết nối giữa nhà trường, phụ huynh và các đơn vị y tế.</p>
                      </div>
                      <div className='section-1-buttons'>
                        <button className='btn-outline' onClick={scrollToSection2}>Tìm hiểu thêm</button>
                      </div>
                  </div>
                </div>
            </section>
            <section className='section-2 row' id='section-2'>
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