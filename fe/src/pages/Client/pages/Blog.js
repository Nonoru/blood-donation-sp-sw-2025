import '../styles/Blog.css';
import { Link } from 'react-router-dom';

const posts = [
  {
    id: 1,
    title: 'Những chia sẻ đáng yêu về hiến máu',
    subtitle: 'Mỗi ngày luôn có hàng nghìn người bệnh đang cần máu...',
    image: '/img/pics/blog11.jpg',
    date: 'Jun 10, 2025',
  },
  {
    id: 2,
    title: 'Tình nguyện viên góp sức cứu người qua từng đơn vị máu',
    subtitle: 'Những hành động thiết thực như hiến máu tình nguyện...',
    image: '/img/pics/blog22.jpg',
    date: 'Jun 5, 2025',
  },
  {
    id: 3,
    title: 'Chiến sĩ công an – người hùng thầm lặng',
    subtitle: 'Không chỉ giữ gìn an ninh trật tự, họ còn tích cực hiến máu...',
    image: '/img/pics/blog3.jpg',
    date: 'May 28, 2025',
  }
];

function Blog() {
  return (
    <div className="blog-page">
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
