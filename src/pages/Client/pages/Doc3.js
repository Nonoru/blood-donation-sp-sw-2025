import { Link } from 'react-router-dom'; 
import '../styles/Docx.scss';

function Doc3() {
  return (
    <div className="doc-container">
      <div className='blog-color'></div>
      <h1 className="doc-title">Nghiên cứu mới nhất về việc phát hiện các nhóm máu hiếm và nhu cầu hiến máu</h1>
      <img src="/img/pics/doc3.jpg" alt="Hiến máu" className="detail-image" />

      <p className="doc-intro">
        Hiến máu là một hành động vô cùng quan trọng, không chỉ giúp cứu sống người khác mà còn góp phần duy trì sự cân bằng trong hệ thống y tế, đặc biệt là trong các tình huống khẩn cấp. Nhóm máu không chỉ đóng vai trò sinh học quan trọng, mà còn là yếu tố quyết định sự thành công của việc truyền máu trong điều trị bệnh tật.
      </p>

      {/* Các section có sẵn giữ nguyên như cũ */}

      <section className="doc-section">
        <h2> Phát hiện nhóm máu mới tại Pháp – “Gwada âm tính”</h2>
        <p>
          Vào tháng 6 năm 2025, <strong>Cơ quan cung ứng máu quốc gia Pháp (EFS)</strong> đã công bố phát hiện một hệ nhóm máu mới – hệ thứ 48 được ghi nhận trên thế giới. Nhóm máu này có tên gọi <strong>“Gwada âm tính”</strong>, và chỉ mới được xác nhận ở một người phụ nữ 54 tuổi sống tại Paris, sau khi được xét nghiệm trong quá trình chuẩn bị phẫu thuật từ năm 2011.
        </p>
        <p>
          Ban đầu, do hạn chế kỹ thuật và nguồn lực, quá trình nghiên cứu bị gián đoạn cho đến năm 2019, khi công nghệ giải trình tự gen tốc độ cao cho phép các nhà khoa học phát hiện đột biến di truyền gây ra nhóm máu hiếm này. Bệnh nhân là người duy nhất được biết đến trên thế giới mang nhóm máu này và cũng là người duy nhất có thể truyền máu cho chính mình.
        </p>
        <p>
          Phát hiện này đã được <strong>Hiệp hội Truyền máu Quốc tế (ISBT)</strong> công nhận trong hội nghị tại Milan. Việc đặt tên “Gwada âm tính” xuất phát từ biệt danh của đảo Guadeloupe – quê gốc của người phụ nữ, và tên gọi này được đánh giá là dễ phát âm trong nhiều ngôn ngữ.
        </p>
        <p>
          Ông Thierry Peyrard, chuyên gia của EFS, nhấn mạnh rằng: <em>“Việc phát hiện các nhóm máu mới sẽ giúp nâng cao tính an toàn và hiệu quả trong công tác truyền máu, đặc biệt cho các bệnh nhân có nhóm máu hiếm.”</em> Các nhà khoa học hy vọng sẽ tìm thấy thêm người có nhóm máu tương tự để cải thiện khả năng chăm sóc y tế trong tương lai.
        </p>
      </section>

      <section className="doc-section">
        <h2>📚 Tài liệu tham khảo</h2>
        <ul className="doc-list">
          <li><a href="#">WHO Blood Type Compatibility Chart (PDF)</a></li>
          <li><a href="#">Báo cáo nhóm máu tại Việt Nam – Viện Huyết học</a></li>
          <li><a href="#">NCBI: ABO Blood Group and Disease Association</a></li>
          <li><a href="#">EFS – Phát hiện nhóm máu mới “Gwada âm tính” (France Info)</a></li>
        </ul>
      </section>

      <div className="doc-card">
        <h3>Bạn đã biết nhóm máu của mình chưa?</h3>
        <p>Hãy đăng ký tham gia hiến máu để được xét nghiệm miễn phí và hỗ trợ cộng đồng!</p>
        <a href="/feature/donate-blood" className="doc-btn">→ Đăng ký hiến máu</a>
      </div>
    </div>
  );
}

export default Doc3;
