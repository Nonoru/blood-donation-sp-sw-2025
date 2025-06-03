import './Blog.css'
function Blog(){
    return(
          <div className="blog-page">
            <section className="card-block">
                <img src="/img/pics/blog1.jpg" alt="Những chia sẻ đáng yêu"/>
                <div className="card-content">
                    <h3><strong>Những chia sẻ đáng yêu về hiến máu</strong></h3>
                    <p>Mỗi ngày luôn có hàng nghìn người bệnh đang cần máu, và may mắn rằng cũng có hàng ngàn người sẵn lòng hiến máu, hàng trăm tình nguyện viên dốc sức cho hoạt động của hội máu, tham gia vận động, chăm sóc người hiến máu ...</p>
                </div>
            </section>

            <section className="card-block">
                <img src="/img/pics/blog2.jpg" alt="Tình nguyện viên"/>
                <div className="card-content">
                    <h3><strong>Tình nguyện viên đang góp sức cứu người qua từng đơn vị máu</strong></h3>
                    <p>Những hành động thiết thực như hiến máu tình nguyện tại các sự kiện y tế đã và đang mang lại cơ hội sống cho hàng ngàn bệnh nhân, thể hiện tinh thần nhân ái và trách nhiệm cộng đồng.</p>
                </div>
            </section>

            <section className="card-block">
                <img src="/img/pics/blog3.jpg" alt="Chiến sĩ công an"/>
                <div className="card-content">
                    <h3><strong>Chiến sĩ công an – những người hùng thầm lặng trong hành trình hiến máu cứu người</strong></h3>
                    <p>Không chỉ giữ gìn an ninh trật tự, các chiến sĩ công an còn tích cực tham gia các hoạt động nhân đạo như hiến máu tình nguyện. Họ chính là biểu tượng của sự dũng cảm và lòng nhân ái trong đời sống thường nhật.</p>
                </div>
            </section>
        </div>
    )
}
export default Blog