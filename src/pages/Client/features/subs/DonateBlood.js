import React, { useState } from 'react';
import '../../styles/DonateBlood.scss';

const initialState = {
  fullName: '',
  dob: '',
  gender: '',
  job: '',
  bloodType: '',
  idNumber: '',
  phone: '',
  address: '',
  email: '',
  healthQuestions: Array(12).fill(''),
  agree: false,
  // Thông tin tra cứu
  donationType: '', // 'first' hoặc 'repeat'
  lastDonationDate: '',
  testResult: '', // 'pass' hoặc 'fail'
  failReason: '',
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

  const validateForm = () => {
    const newErrors = {};
    
    // Validate thông tin tra cứu
    if (!form.donationType) {
      newErrors.donationType = 'Vui lòng chọn loại hiến máu';
    }
    
    if (form.donationType === 'repeat' && !form.lastDonationDate) {
      newErrors.lastDonationDate = 'Vui lòng nhập ngày hiến gần nhất';
    }
    
    if (!form.testResult) {
      newErrors.testResult = 'Vui lòng chọn kết quả xét nghiệm';
    }
    
    if (form.testResult === 'fail' && !form.failReason.trim()) {
      newErrors.failReason = 'Vui lòng nhập lý do không đạt';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to first error
      const firstErrorField = document.querySelector('.error-message');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setErrors({});
    setSubmitted(true);
    // Xử lý gửi dữ liệu ở đây
  };

  return (
    <div className="donate-blood-page">
      <h2>Đăng ký Hiến Máu Tình Nguyện</h2>
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
        
        <fieldset className="lookup-section">
          <legend>Thông tin tra cứu</legend>
          <div className="lookup-grid">
            <div className="lookup-row">
              <span className="lookup-label">Loại hiến máu: <span className="required">*</span></span>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="donationType" 
                    value="first"
                    checked={form.donationType === 'first'} 
                    onChange={(e) => {
                      if (e.target.checked) {
                        setForm({ ...form, donationType: 'first', lastDonationDate: '' });
                      } else {
                        setForm({ ...form, donationType: '' });
                      }
                    }}
                  />
                  Hiến máu lần đầu
                </label>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="donationType" 
                    value="repeat"
                    checked={form.donationType === 'repeat'} 
                    onChange={(e) => {
                      if (e.target.checked) {
                        setForm({ ...form, donationType: 'repeat' });
                      } else {
                        setForm({ ...form, donationType: '', lastDonationDate: '' });
                      }
                    }}
                  />
                  Hiến máu lặp lại
                </label>
              </div>
              {errors.donationType && <div className="error-message">{errors.donationType}</div>}
            </div>            
            
            <div className="lookup-row">
              <span className="lookup-label">Kết quả xét nghiệm: <span className="required">*</span></span>
              <div className="test-result-group">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="testResult" 
                    value="pass"
                    checked={form.testResult === 'pass'} 
                    onChange={(e) => {
                      if (e.target.checked) {
                        setForm({ ...form, testResult: 'pass', failReason: '' });
                      } else {
                        setForm({ ...form, testResult: '' });
                      }
                    }}
                  />
                  Đạt
                </label>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="testResult" 
                    value="fail"
                    checked={form.testResult === 'fail'} 
                    onChange={(e) => {
                      if (e.target.checked) {
                        setForm({ ...form, testResult: 'fail' });
                      } else {
                        setForm({ ...form, testResult: '', failReason: '' });
                      }
                    }}
                  />
                  Không đạt
                </label>
              </div>
              {errors.testResult && <div className="error-message">{errors.testResult}</div>}
              
              {form.testResult === 'fail' && (
                <div style={{ marginTop: '1rem' }}>
                  <label className="lookup-input-label">
                    <span>Lý do không đạt: <span className="required">*</span></span>
                    <input 
                      type="text" 
                      name="failReason" 
                      value={form.failReason} 
                      onChange={handleChange}
                      placeholder="Nhập lý do không đạt..."
                    />
                  </label>
                  {errors.failReason && <div className="error-message">{errors.failReason}</div>}
                </div>
              )}
            </div>
            
            {form.donationType === 'repeat' && (
              <div className="lookup-row">
                <label className="lookup-input-label">
                  <span>Ngày hiến gần nhất: <span className="required">*</span></span>
                  <input 
                    type="date" 
                    name="lastDonationDate" 
                    value={form.lastDonationDate} 
                    onChange={handleChange}
                  />
                </label>
                {errors.lastDonationDate && <div className="error-message">{errors.lastDonationDate}</div>}
              </div>
            )}
          </div>
          </fieldset>
        <div className="form-row agree-row">
          <label className="agree-label">
            <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} required /> 
            Tôi cam kết các thông tin trên là đúng sự thật và tự nguyện đăng ký hiến máu.
          </label>
        </div>
        <button type="submit" className="submit-btn">Gửi đăng ký</button>
        {submitted && <div className="form-success">Đăng ký thành công! Cảm ơn bạn đã hiến máu tình nguyện.</div>}
      </form>
    </div>
  );
};

export default DonateBlood;