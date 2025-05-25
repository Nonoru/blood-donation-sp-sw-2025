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
    return(
        <main className='home-page'>
            <section className='section-1 row'>
                <div className='section-1-img col-7'> 
                    <div className='slider'>
                        <div className="list" style={{ left: `${-(imgIndex) * 600 * 1.3 }px` }}>
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
                </div>
                <div className='section-1-text col-5'>
                    <div className='text'>
                        <h1>Lời mở đầu</h1>
                        <p>
                            Chào mừng mọi người đến với nền tảng kết nối những tấm lòng nhân ái lại với nhau.Giống như các vì sao lấp lánh trên bầu trời liên kết lại thành từng nhánh, mỗi người hiến máu là một tia sáng mang lại hy vọng và sự sống cho những người đang cần.Hãy cùng nhau lan tỏa và kết nối sự sống dù chỉ một giọt máu cũng có thể cứu lấy một mạng người. Mỗi hành động sẻ chia hôm nay là một tia hy vọng cho ngày mai. Trên hành trình ấy, bạn không đơn độc – vì luôn có những trái tim cùng chung nhịp đập, sẵn sàng dang tay giúp đỡ.Hãy để lòng nhân ái của bạn trở thành một phần trong mạng lưới sự sống này cùng nhau, chúng ta không chỉ trao đi máu, mà còn trao đi yêu thương, niềm tin và cơ hội sống cho những người đang chiến đấu từng ngày.
                        </p>
                    </div>
                </div>
            </section>
            <section className='section-2 row' >
                <div className='section-2-benefits col'>
                    <div className='box'>
                        <div className='box-title'>
                            <h2>Lợi ích của hiến máu tại</h2>
                            <h2>Blood Bridge</h2>
                        </div>
                        <div className='box-row row'>
                            <div className='box-row-element col' id='ben-1'>
                                <p>1. Kiểm tra và tư vấn sức khỏe miễn phí</p>
                                <p>Bạn sẽ được kiểm tra sức khỏe 🩺 cẩn thận đầy đủ các bước trước khi hiến máu🩸, 
                                    giúp phát hiện sớm các vấn đề bệnh tiềm ẩn và kiểm tra các chỉ số quan trọng như huyết áp, nhịp tim, 
                                    hemoglobin… và nhận tư vấn sức khỏe từ đội ngũ chuyên môn🤝.</p>
                            </div>
                            <div className='box-row-element col' id='ben-2'>
                                <p>2. Nhận ưu đãi và giấy chứng nhận</p>
                                <p>Sau khi hiến máu tại Blood Bridge với tấm lòng cao đẹp, bạn sẽ được tặng quà🎁cảm ơn và nhận giấy chứng nhận🧾hiến máu:
                                     Xác nhận chính thức từ tổ chức, có thể dùng để:Tích lũy cho các chương trình hiến máu  thường xuyên🏅,Hưởng ưu đãi y tế 
                                     theo chính sách nhà nước,Là minh chứng cho một hành động nhân đạo cao đẹp🤝</p>
                            </div>
                        </div>
                        <div className='box-row row'>
                            <div className='box-row-element col' id='ben-3'>
                                <p>3. Cứu người - Chia sẽ máu</p> 
                                <p>Hiến máu là một hành động tốt đẹp 💖 mà còn là cách đơn để cứu sống người khác.
                                    🩸Nguồn máu có thể đến từ những người hiến tặng.🚑Cứu người ngay lập tức: được sử dụng cho các ca cấp cứu điều 
                                    trị các bệnh ung thư, tai nạn giao thông...👶Giúp đỡ những sinh linh bé nhỏ sinh thiếu máu nặng hoặc sinh non cần đến máu để sống sót..</p>
                            </div>
                            <div className='box-row-element col' id='ben-4'>
                                Ben2
                            </div>
                        </div>
                    </div>
                </div>
                <div className='section-2-requirements col' data-aos="fade-up">
                    <div className='box'>
                        <div className='box-title'>
                            <h2>Yêu cầu</h2>
                        </div>
                    </div>
                </div>
            </section>
            <section id='section-3'>
                <h1 >Những người đã hiến máu</h1>

            </section>
        </main>
    )
}
export default Home