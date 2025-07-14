import { Link } from 'react-router-dom';
import '../styles/Blogx.scss';

function Blog1() {
  return (
    <div className="blog-detail">
      <div className='blog-color'></div>
      <h1 className="blog-detail-title">Chiến sĩ công an – người hùng thầm lặng</h1>
      <p className="blog-meta"><em>Chủ nhật, 22/6/2025, 14:00</em></p>
      <img src="/img/pics/blog33.jpg" alt="Hiến máu" className="detail-image" />

      <p className="blog-content">
        <strong>"Hiến máu không chỉ là một hành động thiện nguyện, mà còn là một câu chuyện tử tế lan tỏa từ trái tim đến trái tim."</strong>
      </p>

      <p className="blog-content">
        Trong khi mọi người còn mải miết với những lo toan thường nhật, có những con người vẫn lặng lẽ làm nhiệm vụ – không chỉ giữ gìn an ninh trật tự cho xã hội, mà còn sẵn sàng hiến dâng những giọt máu quý giá của mình để cứu giúp đồng bào. Họ chính là những **chiến sĩ công an**, những người hùng thầm lặng giữa đời thường.
      </p>

      <p className="blog-content">
        **Trung úy Nguyễn Văn Nam** – một trong những chiến sĩ có mặt tại buổi hiến máu chia sẻ:  
        *“Tôi từng chứng kiến một sản phụ cần truyền gấp máu để cứu cả mẹ và con. Khi ấy, tôi đã nghĩ: nếu mình có thể làm điều gì đó để cứu người, thì tại sao lại không?”*
      </p>

      <p className="blog-content">
        Nhiều chiến sĩ công an đã tham gia hiến máu nhiều lần trong năm. Họ không phải bác sĩ, không làm trong ngành y, nhưng lại là nguồn máu sống động giúp cứu người trong những tình huống khẩn cấp.
      </p>

      <h3 className="blog-subtitle">💉 Khi chiến sĩ không chỉ cầm súng, mà còn dang tay vì sự sống</h3>
      <p className="blog-content">
        Hình ảnh các chiến sĩ công an trong sắc phục xanh nằm hiến máu tại một điểm tổ chức hiến máu tình nguyện khiến nhiều người xúc động. Bỏ lại sau lưng những nhiệm vụ gian nan, nguy hiểm, họ ngồi xuống những chiếc ghế đơn giản để trao đi sự sống – thông qua từng đơn vị máu.
      </p>

      <p className="blog-content">
        Họ không ồn ào, không đòi hỏi sự công nhận. Những hành động ấy như lời nhắc nhở chân thực rằng: *người công an nhân dân không chỉ là người bảo vệ nhân dân mà còn là người luôn sẵn sàng sẻ chia với cộng đồng bằng chính sức khỏe và trái tim của mình.*
      </p>

      <h3 className="blog-subtitle">❤️ Máu nóng chảy từ trái tim đầy nhiệt huyết</h3>
      <p className="blog-content">
        Nhiều chiến sĩ công an đã tham gia hiến máu nhiều lần trong năm. Họ không phải bác sĩ, không làm trong ngành y, nhưng lại là nguồn máu sống động giúp cứu người trong những tình huống khẩn cấp.
      </p>

      <h3 className="blog-subtitle">🤝 Lan tỏa tinh thần nhân ái trong toàn lực lượng</h3>
      <p className="blog-content">
        Không dừng lại ở cá nhân, các đơn vị công an trên cả nước hiện nay đang phát động mạnh mẽ phong trào hiến máu tình nguyện. Nhiều chiến dịch được tổ chức định kỳ, thu hút sự tham gia của hàng trăm, hàng ngàn cán bộ, chiến sĩ. Điều này không chỉ góp phần khắc phục tình trạng thiếu máu trong cấp cứu và điều trị, mà còn xây dựng hình ảnh đẹp về người công an gần dân, vì dân.
      </p>

      <h3 className="blog-subtitle">🫀 Một giọt máu cho đi, một cuộc đời ở lại</h3>
      <p className="blog-content">
        Trong bối cảnh ngành y tế nhiều nơi vẫn còn gặp khó khăn về nguồn máu, đặc biệt trong cấp cứu tai nạn, phẫu thuật, sản khoa, ung thư… thì từng đơn vị máu được hiến tặng là vô cùng quý giá. Sự tham gia tích cực của lực lượng công an như một liều thuốc tinh thần mạnh mẽ, truyền cảm hứng cho toàn xã hội cùng hành động vì cộng đồng.
      </p>

      <p><strong>🩷 Một giọt máu cho đi – Một cuộc đời ở lại.</strong></p>

      <Link to="/blog" className="back-link">← Quay lại</Link>
    </div>
  );
}

export default Blog1;
