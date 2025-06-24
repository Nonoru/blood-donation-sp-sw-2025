import { Link } from 'react-router-dom';
import '../styles/Blogx.scss';

function Blog4() {
  return (
    <div className="blog-detail">
      <h1 className="blog-detail-title">Thông Tin Chương Trình Hiến Máu</h1>
      <p className="blog-meta"><em>Ngày 01/06/2025 đến 30/06/2025</em></p>
      <img src="/img/pics/blog44.jpg" alt="Hiến máu" className="detail-image" />

      <div className="donation-info">
        <h3>🎁 Món quà lưu niệm cho người tham gia hiến máu:</h3>
        <p>
          Từ ngày 01/06/2025 đến 30/06/2025, Trung tâm trân trọng gởi tặng đến tất cả quý anh/chị tham gia hiến máu tình nguyện một món quà lưu niệm (móc khoá nhóm máu) TẠI 02 ĐIỂM HIẾN MÁU CỐ ĐỊNH:
        </p>
        <ul>
          <li><strong>1️⃣ 106 THIÊN PHƯỚC, PHƯỜNG 9, QUẬN TÂN BÌNH</strong></li>
          <li><strong>2️⃣ 466 NGUYỄN THỊ MINH KHAI, PHƯỜNG 2, QUẬN 3</strong></li>
        </ul>
        <p>
          <strong>💛 Đăng ký hiến máu:</strong> <a href="https://giotmauvang.org.vn" target="_blank" rel="noopener noreferrer">giotmauvang.org.vn</a>
        </p>
        <p>
          <strong>🏥 106 THIÊN PHƯỚC, PHƯỜNG 9, QUẬN TÂN BÌNH</strong>
        </p>
        <p>
          <strong>⏰ Thời gian làm việc:</strong> Từ thứ hai đến thứ sáu: Buổi sáng từ 7g00 đến 11g00, Buổi chiều từ 13g00 đến 16g00. Thứ bảy, chủ nhật: Buổi sáng từ 7g00 đến 11g00.
        </p>
        <p>
          <strong>🏥 466 NGUYỄN THỊ MINH KHAI, PHƯỜNG 2, QUẬN 3</strong>
        </p>
        <p>
          <strong>⏰ Thời gian làm việc:</strong> Từ thứ hai đến chủ nhật: Buổi sáng từ 7g00 đến 11g00.
        </p>
      </div>

      <p><strong>🩷 Mỗi giọt máu cho đi – Một cuộc đời ở lại.</strong></p>

      <Link to="/blog" className="back-link">← Quay lại</Link>
    </div>
  );
}

export default Blog4;
