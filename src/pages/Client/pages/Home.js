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
            <section className='section-2' id='section-2'>
                <div className='section-2-container'>
                    {/* Benefits Section */}
                    <div className='benefits-section animate-appear'>                        
                        <div className='section-header'>
                            <h2 className='section-title'>Lợi ích của hiến máu tại</h2>
                            <h2 className='section-title-highlight'>Blood Bridge</h2>
                        </div>
                        
                        <div className='benefits-grid'>
                            <div className='benefit-card' data-aos="fade-up" data-aos-delay="100">
                                <div className='benefit-icon'>
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                                    </svg>
                                </div>
                                <h3>Kiểm tra sức khỏe miễn phí</h3>
                                <p>Khám sức khỏe tại phòng khám Blood Bridge và tư vấn lộ trình hiến máu phù hợp</p>
                            </div>
                            
                            <div className='benefit-card' data-aos="fade-up" data-aos-delay="200">
                                <div className='benefit-icon'>
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                                    </svg>
                                </div>
                                <h3>Nhận ưu đãi & chứng nhận</h3>
                                <p>Trao tặng giấy chứng nhận và hỗ trợ nhiều ưu đãi hấp dẫn</p>
                            </div>
                            
                            <div className='benefit-card' data-aos="fade-up" data-aos-delay="300">
                                <div className='benefit-icon'>
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
                                    </svg>
                                </div>
                                <h3>Cứu người - Chia sẻ máu</h3>
                                <p>Hành động nhân văn, hiến máu giúp người - mang lại ý nghĩa sâu sắc</p>
                            </div>
                            
                            <div className='benefit-card' data-aos="fade-up" data-aos-delay="400">
                                <div className='benefit-icon'>
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16 6.5 6.5 0 0 1 3 9.5 6.5 6.5 0 0 1 9.5 3m0 2C7.01 5 5 7.01 5 9.5S7.01 14 9.5 14 14 11.99 14 9.5 11.99 5 9.5 5z" fill="currentColor"/>
                                    </svg>
                                </div>
                                <h3>Nâng cao sức khỏe</h3>
                                <p>Hiến máu định kỳ giúp kích thích sản sinh máu mới, tăng tuần hoàn và giúp cơ thể khỏe mạnh</p>
                            </div>
                        </div>
                    </div>

                    {/* Requirements Section */}
                    <div className='requirements-section animate-appear'>                        
                        <div className='section-header'>
                            <h2 className='section-title'>Điều kiện hiến máu</h2>
                        </div>
                        
                        <div className='requirements-content'>
                            <div className='requirements-main'>                                
                                <div className='requirements-visual'>
                                    <div className='blood-drop'>
                                        <img src="/img/blood.png" alt="Blood Drop" className='blood-drop-img' />
                                    </div>
                                </div>
                                
                                <div className='requirements-list'>
                                    <div className='requirement-item' data-aos="fade-left" data-aos-delay="100">
                                        <div className='requirement-icon'>
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                                            </svg>
                                        </div>
                                        <div className='requirement-text'>
                                            <h4>Độ tuổi phù hợp</h4>
                                            <p>Từ 18 đến 60 tuổi, sức khỏe tốt</p>
                                        </div>
                                    </div>
                                    
                                    <div className='requirement-item' data-aos="fade-left" data-aos-delay="200">
                                        <div className='requirement-icon'>
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                                            </svg>
                                        </div>
                                        <div className='requirement-text'>
                                            <h4>Không mắc bệnh truyền nhiễm</h4>
                                            <p>HIV/AIDS, viêm gan B, C, giang mai</p>
                                        </div>
                                    </div>
                                    
                                    <div className='requirement-item' data-aos="fade-left" data-aos-delay="300">
                                        <div className='requirement-icon'>
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                                            </svg>
                                        </div>
                                        <div className='requirement-text'>
                                            <h4>Không sử dụng chất kích thích</h4>
                                            <p>Ma túy, các chất có hại</p>
                                        </div>
                                    </div>
                                    
                                    <div className='requirement-item' data-aos="fade-left" data-aos-delay="400">
                                        <div className='requirement-icon'>
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                                            </svg>
                                        </div>
                                        <div className='requirement-text'>
                                            <h4>Không xăm hình gần đây</h4>
                                            <p>Dưới 6 tháng</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='additional-info'>
                                <div className='info-card' data-aos="fade-up" data-aos-delay="500">
                                    <div className='info-icon'>💉</div>
                                    <p>Cân nặng tối thiểu 45kg</p>
                                </div>
                                <div className='info-card' data-aos="fade-up" data-aos-delay="600">
                                    <div className='info-icon'>❤️</div>
                                    <p>Huyết áp bình thường</p>
                                </div>
                                <div className='info-card' data-aos="fade-up" data-aos-delay="700">
                                    <div className='info-icon'>🩺</div>
                                    <p>Không có tiền sử bệnh lý nghiêm trọng</p>
                                </div>
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