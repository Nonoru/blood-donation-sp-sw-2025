import { Link } from 'react-router-dom'; 
import '../styles/Docx.scss';

function Doc1() {
  return (
    <div className="doc-container">
      <h1 className="doc-title">Nghiên cứu khoa học về nhóm máu</h1>

      <p className="doc-intro">
        Nhóm máu không chỉ đóng vai trò sinh học quan trọng, mà còn là yếu tố quyết định sự thành công của việc truyền máu. 
        Hiểu rõ về các nhóm máu giúp cộng đồng nhận thức được tầm quan trọng của hiến máu theo định hướng khoa học.
      </p>

      <section className="doc-section">
        <h2>🧬 Nhóm máu là gì?</h2>
        <p>
          Nhóm máu được phân loại dựa trên sự hiện diện hoặc không có của các kháng nguyên trên bề mặt hồng cầu. 
          Hệ thống phổ biến nhất là hệ ABO và yếu tố Rh, tạo nên 8 nhóm máu chính như: O+, A-, AB-, v.v.
        </p>
      </section>

      <section className="doc-section">
        <h2>🌍 Tỷ lệ nhóm máu tại Việt Nam và thế giới</h2>
        <p>
          Nhóm máu O+ là phổ biến nhất trên toàn cầu và tại Việt Nam. Trong khi đó, các nhóm máu hiếm như O- hay AB- rất cần được hiến định kỳ để bảo đảm cứu người trong các tình huống khẩn cấp.
        </p>
      </section>

      <section className="doc-section">
        <h2>🔁 Khả năng truyền máu giữa các nhóm</h2>
        <p>
          Nhóm máu O- được gọi là người cho phổ thông vì có thể truyền cho tất cả các nhóm khác, trong khi AB+ là người nhận phổ thông. 
          Việc hiểu rõ tương thích máu giúp tránh các phản ứng miễn dịch nguy hiểm.
        </p>
      </section>

      <section className="doc-section">
        <h2>📊 Bảng tương thích truyền máu giữa các nhóm</h2>
        <img src="/img/pics/doc1.jpg" alt="Hiến máu" className="detail-image" />
      </section>

      <section className="doc-section">
        <h2>💉 Huyết tương và tiểu cầu</h2>
        <p>
          Trong hiến huyết tương, nhóm AB là người cho huyết tương phổ thông. Khi hiến tiểu cầu, yếu tố Rh và kháng nguyên phụ cần được xét nghiệm kỹ để đảm bảo an toàn tuyệt đối.
        </p>
      </section>

      <section className="doc-section">
        <h2>📚 Tài liệu tham khảo</h2>
        <ul className="doc-list">
          <li><a href="#">WHO Blood Type Compatibility Chart (PDF)</a></li>
          <li><a href="#">Báo cáo nhóm máu tại Việt Nam – Viện Huyết học</a></li>
          <li><a href="#">NCBI: ABO Blood Group and Disease Association</a></li>
        </ul>
      </section>

      <div className="doc-cta">
        <h3>Bạn đã biết nhóm máu của mình chưa?</h3>
        <p>Hãy đăng ký tham gia hiến máu để được xét nghiệm miễn phí và hỗ trợ cộng đồng!</p>
        <a href="/feature/donate-blood" className="doc-btn">→ Đăng ký hiến máu</a>
      </div>
    </div>
  );
}

export default Doc1;
