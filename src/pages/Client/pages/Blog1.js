import { Link } from 'react-router-dom';
import '../styles/Blogx.scss';

function Blog1() {
  return (
    <div className="blog-detail">
      <div className='blog-color'></div>
      <h1 className="blog-detail-title">Những chia sẻ đáng yêu về hiến máu</h1>
      <p className="blog-meta"><em>Thứ 2, 3/3/2025, 16:15</em></p>
      <img src="/img/pics/blog11.jpg" alt="Hiến máu" className="detail-image" />

      <p className="blog-content">
        <strong>"Hiến máu không chỉ là một hành động thiện nguyện, mà còn là một câu chuyện tử tế lan tỏa từ trái tim đến trái tim."</strong>
      </p>

      <p className="blog-content">
        Mỗi ngày trôi qua, hàng nghìn bệnh nhân trên khắp đất nước đang mong mỏi từng giọt máu để duy trì sự sống. 
        Và giữa dòng đời vội vã ấy, có biết bao con người thầm lặng, nhẹ nhàng bước vào các điểm hiến máu, trao đi món quà vô giá – giọt máu của mình.
      </p>

      <p className="blog-content">
        Thật xúc động khi nghe những lời chia sẻ giản dị nhưng đầy yêu thương từ người hiến máu:
      </p>

      <blockquote className="blockquote">
        “Tôi chỉ nghĩ đơn giản, nếu hôm nay mình có thể giúp ai đó sống thêm một ngày thì đó đã là điều tuyệt vời rồi.” – Chị Linh, 26 tuổi.
      </blockquote>

      <p className="blog-content">
        Những hành động ấy có thể nhỏ, nhưng lại có ý nghĩa to lớn. Có người rủ bạn đi cùng, có người lần đầu còn run, nhưng sau khi thấy ánh mắt biết ơn của các nhân viên y tế, họ mỉm cười nhẹ nhõm.
      </p>

      <h3 className="blog-subtitle">🎈 Những lý do đáng yêu mà người ta đi hiến máu:</h3>
      <ul className="blog-reasons">
        <li>“Vì crush thích người tử tế.”</li>
        <li>“Vì máu O của mình quý, không đi thì tiếc.”</li>
        <li>“Vì muốn con mình sau này cũng biết giúp người.”</li>
        <li>“Vì lần trước được phát bánh mì ngon quá.” 😄</li>
      </ul>

      <p className="blog-content">
        Nếu bạn chưa từng hiến máu, hãy thử một lần. Và nếu bạn đã từng, xin cảm ơn bạn – vì đã là một phần của những điều đẹp đẽ nhất trong cuộc sống này.
      </p>

      <p><strong>🩷 Mỗi giọt máu cho đi – Một cuộc đời ở lại.</strong></p>

      <Link to="/blog" className="back-link">← Quay lại</Link>
    </div>
  );
}

export default Blog1;
