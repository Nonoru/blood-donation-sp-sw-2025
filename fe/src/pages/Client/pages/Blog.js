import '../styles/Blog.scss';
import { Link } from 'react-router-dom';

const posts = [
  {
    id: 1,
    title: 'Những chia sẻ đáng yêu về hiến máu',
    subtitle: 'Mỗi ngày luôn có hàng nghìn người bệnh đang cần máu...',
    image: '/img/pics/blog11.jpg',
    date: 'Thứ 2, 3/3/2025, 16:15',
  },
  {
    id: 2,
    title: 'Tình nguyện viên góp sức cứu người qua từng đơn vị máu',
    subtitle: 'Những hành động thiết thực như hiến máu tình nguyện...',
    image: '/img/pics/blog22.jpg',
    date: 'Thứ 5, 27/5/2025, 10:30',
  },
  {
    id: 3,
    title: 'Chiến sĩ công an – người hùng thầm lặng',
    subtitle: 'Không chỉ giữ gìn an ninh trật tự, họ còn tích cực hiến máu...',
    image: '/img/pics/blog3.jpg',
    date: 'Chủ nhật, 22/6/2025, 14:00',
  },
  {
    id: 4,
    title: 'Hưởng ứng chương trình hiến máu tình nguyện',
    subtitle: 'Từ ngày 01/06/2025 đến 30/06/2025...',
    image: '/img/pics/blog44.jpg',
    date: 'Chủ nhật, 13/6/2025, 08:00',
  },
  {
    id: 5,
    title: 'Cảnh báo lừa đảo về hiến máu: Cẩn thận trước những chiêu lừa tinh vi',
    subtitle: 'Hiện có đối tượng giả mạo Trung tâm hiến máu nhân đạo TPHCM',
    image: '/img/pics/blog55.jpg',
    date: 'Chủ nhật, 24/6/2025, 11:00',
  },
  {
    id: 6,
    title: 'Khởi động tháng Nhân đạo năm 2025',
    subtitle: 'Ngày 8-5, tại TPHCM, Trung ương Hội Chữ thập đỏ Việt Nam và UBND TPHCM',
    image: '/img/pics/blog66.jpg',
    date: 'Chủ nhật, 24/6/2025, 11:00',
  }
];

function Blog() {
  return (
    <div className="blog-page">
      <div className="banner">
        <div className="banner-title-content">
          <h2 className="main-title">
            <span className="blood-bridge">Blood Bridge</span>
            <span className="features-text">Trang blog</span>
          </h2>
          <div className="title-decoration">
            <div className="decoration-line"></div>
            <div className="decoration-circle">🩸</div>
            <div className="decoration-line"></div>
          </div>
        </div>
      </div>
      <h2 className="section-title">Bài viết nổi bật</h2>
      <div className="blog-list">
        {posts.map(post => (
          <Link to={`/blog/${post.id}`} key={post.id} className="blog-card">
            <img src={post.image} alt={post.title} className="blog-image" />
            <div className="blog-content">
              <div className="blog-meta">
                <span className="author">{post.author}</span>
                <span className="dot">•</span>
                <span>{post.date}</span>
              </div>
              <h3 className='blog-title'>{post.title}</h3>
              <p className="blog-subtitle">{post.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Blog;
