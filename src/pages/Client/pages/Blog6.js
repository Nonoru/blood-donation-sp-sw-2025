import { Link } from 'react-router-dom';
import '../styles/Blogx.scss';

function Blog6() {
  return (
    <div className="blog-detail">
      <div className='blog-color'></div>
      <h1 className="blog-detail-title">Lễ Phát Động Tháng Nhân Đạo 2025: “Hành trình nhân đạo - Lan tỏa yêu thương”</h1>
      <p className="blog-meta"><em>Thứ 5, 8/5/2025, TP.HCM</em></p>
      <img src="/img/pics/blog66.jpg" alt="Lễ phát động Tháng Nhân đạo" className="detail-image" />

      <p className="blog-content">
        Ngày 8-5 tại TPHCM, Trung ương Hội Chữ thập đỏ Việt Nam phối hợp cùng UBND TPHCM đã tổ chức lễ phát động Tháng Nhân đạo cấp quốc gia năm 2025 với chủ đề <strong>“Hành trình nhân đạo - Lan tỏa yêu thương”.</strong>
      </p>

      <p className="blog-content">
        Buổi lễ có sự hiện diện của nhiều lãnh đạo Trung ương và địa phương như ông Trương Tấn Sang, ông Đỗ Văn Chiến, ông Nguyễn Phước Lộc, ông Vũ Chiến Thắng, bà Nguyễn Phạm Duy Trang, ông Nguyễn Mạnh Cường và bà Trần Thị Diệu Thúy, cùng đại diện các tổ chức quốc tế như Ủy ban Chữ thập đỏ quốc tế và Hiệp Hội Trăng lưỡi liềm đỏ.
      </p>

      <p className="blog-content">
        Ông Nguyễn Hải Đăng, Phó Chủ tịch Hội Chữ thập đỏ Việt Nam, chia sẻ rằng kể từ năm 2021, Tháng Nhân đạo đã trở thành biểu tượng của tinh thần “cả nước làm nhân đạo”. Đến nay, đã huy động hơn 3.700 tỷ đồng, trợ giúp hơn 7,3 triệu lượt người; riêng năm 2024, đạt trên 763 tỷ đồng giúp đỡ 1,6 triệu lượt người.
      </p>

      <h3 className="blog-subtitle">Lan Tỏa Yêu Thương, Không Để Ai Bị Bỏ Lại Phía Sau</h3>
      <p className="blog-content">
        Với chủ đề năm 2025 là “Hành trình nhân đạo - Lan tỏa yêu thương”, chương trình không chỉ là lời kêu gọi mà còn là hành trình kết nối cộng đồng, lan tỏa tinh thần đoàn kết và nhân ái. Phó Chủ tịch UBND TPHCM Trần Thị Diệu Thúy gửi lời cảm ơn các Tổng Lãnh sự quán tại TPHCM đã đồng hành cùng các phong trào hiến máu tình nguyện, đặc biệt vận động gần 150 cán bộ, nhân viên ngoại giao cùng tham gia.
      </p>

      <blockquote className="blockquote">
        “Tháng Nhân đạo là sáng kiến đồng bộ của Việt Nam, điểm nhấn quan trọng trong công tác nhân đạo, khẳng định vai trò tích cực của Hội Chữ thập đỏ trong phong trào quốc tế.” – Chủ tịch UBTW MTTQ VN Đỗ Văn Chiến.
      </blockquote>

      <img src="/img/pics/blog61.jpg" alt="Hoạt động tại lễ phát động" className="detail-image" />

      <h3 className="blog-subtitle">Hướng Tới Một Nền Tảng Nhân Đạo Chuyên Nghiệp</h3>
      <p className="blog-content">
        Chủ tịch Đỗ Văn Chiến nhấn mạnh vai trò then chốt của Hội Chữ thập đỏ Việt Nam trong việc kết nối các nguồn lực xã hội nhằm thực hiện các chính sách an sinh, hỗ trợ người yếu thế, nạn nhân thiên tai và dịch bệnh. Ông kêu gọi Hội tiếp tục đổi mới hoạt động, đào tạo đội ngũ cán bộ chuyên nghiệp, mở rộng các chương trình chăm sóc sức khỏe cộng đồng, sơ cấp cứu, hiến tặng mô tạng và nước sạch.
      </p>

      <p className="blog-content">
        Ngoài ra, việc mở rộng hợp tác quốc tế, triển khai mô hình dự báo sớm, can thiệp sớm và phản ứng nhanh sẽ giúp Hội nâng cao năng lực hỗ trợ cộng đồng, hướng đến xã hội nhân văn, bao trùm, không ai bị bỏ lại phía sau.
      </p>

      <p className="blog-content">
        Buổi lễ là minh chứng cho sự đồng lòng của toàn xã hội trong hành trình nhân đạo, khơi nguồn yêu thương, nâng cao ý thức cộng đồng và lan tỏa giá trị nhân văn đến mọi người dân Việt Nam.
      </p>

      <p><strong> Cùng nhau tạo nên một Việt Nam nhân ái, vững bền.</strong></p>

      <Link to="/blog" className="back-link">← Quay lại</Link>
    </div>
  );
}

export default Blog6;
