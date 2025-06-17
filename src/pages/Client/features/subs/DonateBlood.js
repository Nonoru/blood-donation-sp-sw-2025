import React, { useState } from 'react';
import '../../styles/DonateBlood.scss';

const initialState = {
  fullName: '',
  dob: '',
  appointmentDate: '',
  gender: '',
  job: '',
  bloodType: '',
  idNumber: '',
  phone: '',
  address: '',
  email: '',
  healthQuestions: Array(12).fill(''),
  agree: false,
};

const healthQuestions = [
  'Bạn đã từng hiến máu chưa ?',
  'Hiện tại, bạn có bị các bệnh: viêm khớp, đau dạ dày, viêm gan, vàng da, bệnh tim, huyết áp thấp/cao, ho kéo dài,bệnh máu, lao ?',
  'Trong vòng 12 tháng gần đây, bạn có mắc các bệnh và đã được điều trị khỏi: Sốt rét, Giang mai, Lao, Viêm não, Phẫu thuật ngoại khoa ?',
  'Trong vòng 12 tháng gần đây, bạn có dược truyền máu và các chể phẩm máu ?',
  'Trong vòng 12 tháng gần đây, bạn có tiêm Vaccin bệnh dại ?',
  'Trong vòng 6 tháng gần đây, bạn có triệu chứng sau không: Sút cân nhanh không rõ nguyên nhân ?',
  'Trong vòng 6 tháng gần đây, bạn có triệu chứng sau không: Nổi hạch kéo dài ?',
  'Trong vòng 6 tháng gần đây, bạn có triệu chứng sau không: Chữa răng, châm cứu ?',
  'Trong vòng 6 tháng gần đây, bạn có triệu chứng sau không: Xăm mình, xỏ lỗ tai, lỗ mũi ?',
  'Trong vòng 6 tháng gần đây, bạn có triệu chứng sau không: Sử dụng ma tuý ?',
  'Trong vòng 6 tháng gần đây, bạn có triệu chứng sau không: Quan hệ tình dục với người nhiễm HIV hoặc người có hành vì nguy cơ lây nhiễm HIV ?',
  'Trong vòng 6 tháng gần đây, bạn có triệu chứng sau không: QUan hệ tình dục với người cùng giới ?',
  'Trong vòng 7 ngày gần đây, bạn có: Bị cảm cúm ( ho, nhức đầu, sốt... ) ?',
  'Trong vòng 7 ngày gần đây, bạn có: Dùng thuốc kháng sinh: Aspirin, Corticol ?',
  'Trong vòng 7 ngày gần đây, bạn có: Tiêm Vacxin phòng: Viêm gan siêu vi B, Human Papilloma Virus,... ?',
  'Bạn có đồng ý xét nghiệm HIV, nhận thông báo và được tư vấn khi kết quả xét nghiệm HIV nghi ngờ hoặc dương tính ?',
  'Bạn có đồng ý hiến máu tình nguyện và tuân thủ các quy định của chương trình ?'
];

const DonateBlood = () => {
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Clear error when user starts typing/selecting
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    
    if (name.startsWith('health_')) {
      const idx = parseInt(name.split('_')[1], 10);
      const newHealth = [...form.healthQuestions];
      newHealth[idx] = value;
      setForm({ ...form, healthQuestions: newHealth });
    } else if (type === 'checkbox') {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitted(true);
    // Cuộn lên đầu trang
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Hiện toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="donate-blood-page blood-register-layout">
      <div className="donate-title-section">
        <div className="donate-title-content">
          <h2 className="main-title">
            <span className="blood-bridge">Blood Bridge</span>
            <span className="features-text">Đăng ký Xét Nghiệm Máu</span>
          </h2>
          <p className="subtitle">
            Hãy đăng ký xét nghiệm máu để bảo vệ sức khỏe bản thân và cộng đồng!
          </p>
          <div className="title-decoration">
            <div className="decoration-line"></div>
            <div className="decoration-circle">🩸</div>
            <div className="decoration-line"></div>
          </div>
        </div>
        {/* Có thể thêm hiệu ứng floating nếu muốn */}
      </div>
      <div className="donate-form-section">
        {showToast && (
          <div className="custom-toast success">
            <span className="toast-icon">✔</span>
            Đăng ký thành công! Cảm ơn bạn đã đăng ký xét nghiệm máu.
            <button className="toast-close" onClick={() => setShowToast(false)}>×</button>
          </div>
        )}
        <form className="donate-blood-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Thông tin cá nhân</legend>
            <div className="form-row">
              <label><span className="label-row">Họ và tên <span> *</span></span>
                <input name="fullName" value={form.fullName} onChange={handleChange} required />
              </label>
              <label><span className="label-row">Ngày sinh <span> *</span></span> 
                <input type="date" name="dob" value={form.dob} onChange={handleChange} required />
              </label>            
              <label><span className="label-row">Giới tính <span> *</span></span>
                <select name="gender" value={form.gender} onChange={handleChange} required>
                  <option value="">Chọn</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
              </label>
              <label><span className='label-row'>Nghề nghiệp<span> *</span></span>
                  <input name="job" value={form.job} onChange={handleChange} required />
              </label>
            </div>
            <div className="form-row">
              <label><span className="label-row">Số CMND/CCCD <span> *</span></span>
                <input name="idNumber" value={form.idNumber} onChange={handleChange} required />
              </label>
              <label><span className="label-row">Số điện thoại <span> *</span></span>
                <input name="phone" value={form.phone} onChange={handleChange} required />
              </label>
            </div>
            <div className="form-row">
              <label><span className="label-row">Nhóm máu <span> *</span></span>
                <select name="bloodType" value={form.bloodType} onChange={handleChange} required>
                  <option value="">Chọn nhóm máu</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </label>
              <label><span className="label-row">Ngày đặt lịch <span> *</span></span> 
                <input type="date" name="appointmentDate" value={form.appointmentDate} onChange={handleChange} required />
              </label>
            </div>
            <div className="form-row">
              <label><span className="label-row">Địa chỉ <span> *</span></span>
                <input name="address" value={form.address} onChange={handleChange} required/>
              </label>
              <label>Email
                <input type="email" name="email" value={form.email} onChange={handleChange} />
              </label>
            </div>        
          </fieldset>
          
          <fieldset>
            <legend>Câu hỏi sức khỏe</legend>
            {healthQuestions.map((q, idx) => (
              <div className="health-question" key={idx}>
                <span>{idx + 1}. {q}</span>
                <label>
                  <input type="radio" name={`health_${idx}`} value="Có" checked={form.healthQuestions[idx] === 'Có'} onChange={handleChange} required /> Có
                </label>
                <label>
                  <input type="radio" name={`health_${idx}`} value="Không" checked={form.healthQuestions[idx] === 'Không'} onChange={handleChange} required /> Không
                </label>
              </div>
            ))}        
          </fieldset>
          
          <div className="form-row agree-row">
            <label className="agree-label">
              <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} required /> 
              Tôi cam kết các thông tin trên là đúng sự thật và tự nguyện đăng ký hiến máu.
            </label>
          </div>
          <button type="submit" className="submit-btn">Gửi đăng ký</button>
        </form>
      </div>
    </div>
  );
};

export default DonateBlood;