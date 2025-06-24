import '../styles/Doc.scss';
import { Link } from 'react-router-dom';

const posts = [
  {
    id: 1,
    title: 'Nghiên cứu khoa học về nhóm máu',
    subtitle: 'Nhóm máu không chỉ đóng vai trò sinh học quan trọng...',
    image: '/img/pics/doc1.jpg',
    date: 'Thứ 2, 3/3/2025, 16:15',
  },
  {
    id: 2,
    title: 'Nhóm máu và tầm quan trọng trong việc hiến máu cứu người',
    subtitle: 'Hiểu rõ hơn về vai trò của nhóm máu trong việc cứu sống bệnh nhân...',
    image: '/img/pics/blog22.jpg',
    date: 'Thứ 5, 27/5/2025, 10:30',
  },
  {
    id: 3,
    title: 'Phát hiện nhóm máu mới, chỉ có một người sở hữu',
    subtitle: 'Phát hiện này được công bố bởi Cơ quan cung ứng máu quốc gia Pháp (EFS)...',
    image: '/img/pics/blog3.jpg',
    date: 'Chủ nhật, 22/6/2025, 14:00',
  }
];

function Doc() {
  return (
    <div className="doc-page">
      <h2 className="section-title">Bài viết nổi bật</h2>
      <div className="doc-list">
        {posts.map(post => (
          <Link to={`/doc/${post.id}`} key={post.id} className="doc-card">
            <img src={post.image} alt={post.title} className="doc-image" />
            <div className="doc-content">
              <div className="doc-meta">
                <span className="dot">•</span>
                <span>{post.date}</span>
              </div>
              <h3 className="doc-title">{post.title}</h3>
              <p className="doc-subtitle">{post.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
<section className="doc-section">
        <h2>📚 Tài liệu tham khảo</h2>
        <ul className="doc-list">
          <li><a href="#">WHO Blood Type Compatibility Chart (PDF)</a></li>
          <li><a href="#">Báo cáo nhóm máu tại Việt Nam – Viện Huyết học</a></li>
          <li><a href="#">NCBI: ABO Blood Group and Disease Association</a></li>
        </ul>
      </section>
export default Doc;
