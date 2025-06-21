import { Link } from 'react-router-dom'; 
import '../styles/Docx.scss';

function Doc3() {
  return (
    <div className="doc-container">
      <h1 className="doc-title">Nghiên cứu mới nhất về việc phát hiện các nhóm máu hiếm và nhu cầu hiến máu</h1>

      <p className="doc-intro">
        Hiến máu là một hành động vô cùng quan trọng, không chỉ giúp cứu sống người khác mà còn góp phần duy trì sự cân bằng trong hệ thống y tế, đặc biệt là trong các tình huống khẩn cấp. Nhóm máu không chỉ đóng vai trò sinh học quan trọng, mà còn là yếu tố quyết định sự thành công của việc truyền máu trong điều trị bệnh tật.
      </p>

      <section className="doc-section">
        <h2>🧬 Nhóm máu và sự phân loại</h2>
        <p>
          Nhóm máu được phân loại chủ yếu dựa trên sự hiện diện hoặc không có của các kháng nguyên trên bề mặt hồng cầu. Hệ thống phổ biến nhất là hệ ABO và yếu tố Rh, tạo nên 8 nhóm máu chính: O+, O-, A+, A-, B+, B-, AB+, AB-. Sự hiểu biết về các nhóm máu này là cơ sở để cứu sống người bệnh, đặc biệt là trong các tình huống cần truyền máu khẩn cấp.
        </p>
      </section>

      <section className="doc-section">
        <h2>🌍 Tầm quan trọng của nhóm máu trong việc truyền máu</h2>
        <p>
          Nhóm máu O-: Đây là nhóm máu hiếm và có thể truyền cho tất cả các nhóm máu khác, khiến người có nhóm máu O- trở thành "người cho phổ thông". Việc duy trì nguồn máu O- là rất quan trọng trong các bệnh viện để ứng phó với các tình huống khẩn cấp.
        </p>
        <p>
          Nhóm máu AB+: Đây là nhóm máu nhận được máu từ tất cả các nhóm khác, giúp đảm bảo sự cung cấp máu khi người bệnh cần điều trị gấp.
        </p>
      </section>

      <section className="doc-section">
        <h2>🔁 Lý do tại sao hiến máu lại quan trọng</h2>
        <p>
          Hiến máu không chỉ giúp cứu sống người khác mà còn mang lại nhiều lợi ích cho người hiến, bao gồm:
        </p>
        <ul className="doc-reasons">
          <li><strong>Cải thiện sức khỏe tim mạch:</strong> Nghiên cứu đã chỉ ra rằng việc hiến máu thường xuyên có thể giúp giảm nguy cơ mắc bệnh tim mạch.</li>
          <li><strong>Tái tạo máu:</strong> Khi bạn hiến máu, cơ thể sẽ tạo ra lượng máu mới, giúp cơ thể duy trì sức khỏe tốt hơn.</li>
          <li><strong>Giảm mức độ sắt trong cơ thể:</strong> Việc giảm mức độ sắt giúp giảm nguy cơ mắc bệnh tim mạch, và người hiến máu sẽ được kiểm tra sức khỏe trước khi hiến, đảm bảo an toàn.</li>
        </ul>
      </section>

      <section className="doc-section">
        <h2>🏥 Thực trạng hiến máu ở Việt Nam</h2>
        <p>
          Việt Nam đang đối mặt với tình trạng thiếu máu trầm trọng, đặc biệt là các nhóm máu hiếm. Sự thiếu hụt này gây khó khăn trong việc cấp cứu và điều trị cho bệnh nhân cần truyền máu. Hệ thống y tế quốc gia cần có chiến lược khuyến khích người dân tham gia hiến máu định kỳ để cung cấp nguồn máu ổn định.
        </p>
      </section>

      <section className="doc-section">
        <h2>📝 Làm thế nào để tham gia hiến máu?</h2>
        <p>
          Mọi công dân từ 18 đến 60 tuổi, sức khỏe tốt đều có thể tham gia hiến máu. Quá trình hiến máu đơn giản và nhanh chóng, chỉ mất khoảng 30-45 phút, nhưng lại mang lại lợi ích rất lớn cho cộng đồng. Bạn có thể tham gia hiến máu tại các bệnh viện hoặc các chương trình hiến máu tình nguyện được tổ chức định kỳ tại các địa phương.
        </p>
      </section>

      <section className="doc-section">
        <h2>📢 Kêu gọi hiến máu tình nguyện</h2>
        <p>
          Nhóm máu không chỉ là một đặc điểm sinh học mà còn là một nguồn lực quý giá trong việc cứu sống bệnh nhân. Hiến máu là một hành động nhân đạo không chỉ cứu sống người khác mà còn giúp duy trì sự sống cho cộng đồng. Hãy tham gia hiến máu ngay hôm nay để góp phần cứu người trong những tình huống khẩn cấp!
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

export default Doc3;
