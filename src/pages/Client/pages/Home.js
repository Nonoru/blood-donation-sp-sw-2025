import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Footer from './Footer'

import '../styles/Home.scss'
const imgSection1 = [
    {src: 'https://images.pexels.com/photos/6753457/pexels-photo-6753457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
    ]
function Home(){
    const navigate = useNavigate();
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
    
    const navigateToFeatures = () => {
        navigate('/feature');
    };

    return(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
        <main className='home-page'>
            <section className='section-1'>
                <div className="section-1-gray-overlay"></div>
                <div className='section-1-img-bg'>
                  <img className='single-bg-img' src={imgSection1[0].src} alt='img'/>
                </div>
                <div className='section-1-content'>
                    <div className='section-1-title'>
                      <p className='title-main'>Phần mềm hỗ trợ hiến máu học đường</p>
                      <div className='title-sub'>
                          <p>Giải pháp toàn diện giúp nhà trường quản lý sức khỏe học sinh hiệu quả, kết nối giữa nhà trường, phụ huynh và các đơn vị y tế.</p>
                      </div>                      <div className='section-1-buttons'>
                        <button className='btn-primary' onClick={navigateToFeatures}>Dịch vụ của chúng tôi</button>
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

            <section className='section-3'>
                <div className='section-3-container'>                    
                    <div className='process-section animate-appear'>
                        <div className='process-content'>
                            <div className='process-image'>
                                <img src="/img/background_page3.png" alt="Bác sĩ" className='doctor-image' />
                            </div>
                            
                            <div className='process-text'>                                
                                <div className='section-header'>
                                    <h2 className='section-title'>Quy trình thăm khám</h2>
                                    <h2 className='section-title-highlight'>và hiến máu</h2>
                                </div>
                                
                                <div className='mission-text'>
                                    <div className='process-steps'>
                                        <div className='step-item'>
                                            <div className='step-number'>1</div>
                                            <div className='step-content'>
                                                <h4>Đăng ký và tiếp nhận</h4>
                                                <p>Điền form đăng ký, xuất trình giấy tờ tùy thân. Nhân viên sẽ hướng dẫn quy trình chi tiết.</p>
                                            </div>
                                        </div>
                                        
                                        <div className='step-item'>
                                            <div className='step-number'>2</div>
                                            <div className='step-content'>
                                                <h4>Khám sàng lọc sơ bộ</h4>
                                                <p>Đo huyết áp, cân nặng, kiểm tra mạch. Tư vấn sức khỏe và điều kiện hiến máu phù hợp.</p>
                                            </div>
                                        </div>
                                        
                                        <div className='step-item'>
                                            <div className='step-number'>3</div>
                                            <div className='step-content'>
                                                <h4>Xét nghiệm máu</h4>
                                                <p>Lấy mẫu máu để kiểm tra nhóm máu, hemoglobin và các chỉ số y tế cần thiết.</p>
                                            </div>
                                        </div>
                                        
                                        <div className='step-item'>
                                            <div className='step-number'>4</div>
                                            <div className='step-content'>
                                                <h4>Hiến máu chính thức</h4>
                                                <p>Quá trình hiến máu diễn ra trong 10-15 phút. Y tá chuyên nghiệp hỗ trợ suốt quá trình.</p>
                                            </div>
                                        </div>
                                        
                                        <div className='step-item'>
                                            <div className='step-number'>5</div>
                                            <div className='step-content'>
                                                <h4>Nghỉ ngơi và nhận quà</h4>
                                                <p>Nghỉ ngơi 10-15 phút, được phục vụ đồ ăn nhẹ và nhận giấy chứng nhận hiến máu.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* After Donation Tips Section */}
                    <div className='tips-section animate-appear'>
                        <div className='section-header'>
                            <h2 className='section-title'>Lời khuyên sau khi</h2>
                            <h2 className='section-title-highlight'>hiến máu</h2>
                        </div>
                        
                        <div className='tips-content'>
                            <div className='tips-grid'>
                                <div className='tip-card immediate-tips' data-aos="fade-right" data-aos-delay="100">
                                    <div className='tip-header'>
                                        <div className='tip-icon'>
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                                                <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                        <h3>Ngay sau hiến máu</h3>
                                    </div>
                                    
                                    <div className='tip-list'>
                                        <div className='tip-item'>
                                            <span className='tip-bullet'>•</span>
                                            <p>Nghỉ ngơi tại điểm hiến máu tối thiểu 15 phút</p>
                                        </div>
                                        <div className='tip-item'>
                                            <span className='tip-bullet'>•</span>
                                            <p>Uống nhiều nước, đồ uống có đường</p>
                                        </div>
                                        <div className='tip-item'>
                                            <span className='tip-bullet'>•</span>
                                            <p>Ăn đồ ăn nhẹ ( bánh kẹo, trái cây,... ) </p>
                                        </div>
                                        <div className='tip-item'>
                                            <span className='tip-bullet'>•</span>
                                            <p>Hạn chế gập tay trong quá trình nghỉ sau hiến máu</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className='tip-card daily-tips' data-aos="fade-left" data-aos-delay="200">
                                    <div className='tip-header'>
                                        <div className='tip-icon'>
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                                                <path d="M12 2a10 10 0 0 0 0 20 10 10 0 0 0 0-20z" fill="currentColor" fillOpacity="0.1"/>
                                                <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                        <h3>48 tiếng sau hiến máu</h3>
                                    </div>
                                    <div className='tip-list'>
                                        <div className='tip-item'>
                                            <span className='tip-bullet'>•</span>
                                            <p>Uống nhiều nước, ăn uống đầy đủ, bổ sung sắt</p>
                                        </div>
                                        <div className='tip-item'>
                                            <span className='tip-bullet'>•</span>
                                            <p>Tránh nâng vật nặng bằng tay vừa hiến máu</p>
                                        </div>
                                        <div className='tip-item'>
                                            <span className='tip-bullet'>•</span>
                                            <p>Không uống rượu bia, không sử dụng chất kích thích</p>
                                        </div>
                                        <div className='tip-item'>
                                            <span className='tip-bullet'>•</span>
                                            <p>Tăng cường sử dụng các chất dinh dưỡng bổ máu (thịt, gan, trứng, sữa,...)
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className='tip-card warning-tips' data-aos="fade-up" data-aos-delay="300">
                                    <div className='tip-header'>
                                        <div className='tip-icon'>
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </div>

                                <h3>Dấu hiệu cần chú ý</h3>
                                </div>
                                    <div className='tip-list'>
                                        <div className='tip-item warning'>
                                            <span className='tip-bullet'>⚠</span>
                                            <p>Chảy máu vị trí lấy máu</p>
                                        </div>
                                        <div className='tip-item warning'>
                                            <span className='tip-bullet'>⚠</span>
                                            <p>Sưng tấy, đau nhức tay</p>
                                        </div>
                                        <div className='tip-item warning'>
                                            <span className='tip-bullet'>⚠</span>
                                            <p>Mệt, chóng mặt, vã mồ hôi liên tục</p>
                                        </div>
                                        <div className='tip-item contact'>
                                            <span className='tip-bullet'>📞</span>
                                            <p><strong>Liên hệ ngay:</strong> 0123.456.789</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='recovery-timeline' data-aos="fade-up" data-aos-delay="400">
                                <h3>Thời gian phục hồi cơ thể</h3>
                                <div className='recovery-items'>
                                    <div className='recovery-item'>
                                        <div className='recovery-icon'>🩸</div>
                                        <div className='recovery-info'>
                                            <h4>Huyết tương</h4>
                                            <p>24-48 giờ</p>
                                        </div>
                                    </div>
                                    <div className='recovery-item'>
                                        <div className='recovery-icon'>🔴</div>
                                        <div className='recovery-info'>
                                            <h4>Hồng cầu</h4>
                                            <p>4-6 tuần</p>
                                        </div>
                                    </div>
                                    <div className='recovery-item'>
                                        <div className='recovery-icon'>💊</div>
                                        <div className='recovery-info'>
                                            <h4>Mức sắt</h4>
                                            <p>6-8 tuần</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
        </main>
        <Footer/>
        </motion.div>
    )
}
export default Home