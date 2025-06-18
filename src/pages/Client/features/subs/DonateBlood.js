import { useState } from 'react';
import '../../styles/DonateBlood.scss';
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

const form = {
  fullName: '',
  dob: '',
  // appointmentDate: '',
  gender: '',
  weight: '',
  bloodId: 0,
  amountBloodMl: 0,
  cccdNumber: '',
  phone: '',
  address: '',
  agree: false,
  // healthQuestions: Array(12).fill(''),
}
const DonateBlood = () => {
  const [formData, setFormData] = useState(form);
  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  }

  return (
    <div className="donate-blood-page blood-register-layout">
      <div className="donate-title-section">
        <div className="donate-title-content">
          <h2 className="main-title">
            <span className="blood-bridge">Blood Bridge</span>
            <span className="features-text">Đăng ký Xét Nghiệm Máu</span>
          </h2> 
          <div className="title-decoration">
            <div className="decoration-line"></div>
            <div className="decoration-circle">🩸</div>
            <div className="decoration-line"></div>
          </div>
        </div>
      </div>
      <div className="donate-form-section">
        {/* FORM điền thông tin */}
        <form className="donate-blood-form" onSubmit={e => handleSubmit(e)}>
          <fieldset>
            <legend>Thông tin cá nhân</legend>
            <div className="form-row">

              {/* FULLNAME */}
              <label>
                <span className="label-row">Họ và tên <span>*</span></span>
                <input name="fullName" value={formData.fullName} onChange={e => handleChange(e)} required />
              </label>

              {/* DOB */}
              <label>
                <span className="label-row">Ngày sinh <span>*</span></span> 
                <input type="date" name="dob" value={formData.dob} onChange={e => handleChange(e)} required />
              </label>

              {/* GENDER */}
              <label>
                <span className="label-row">Giới tính <span>*</span></span>
                <select name="gender" value={formData.gender} onChange={e => handleChange(e)} required>
                  <option disabled value="" selected>Chọn giới tính</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </label>
              {/* WEIGHT */}
              <label>
                <span className='label-row'>Cân nặng<span>*</span></span>
                  <input type="number" name="weight" min="1" max="200" step="0.1"  onChange={e => handleChange(e)} required/>
              </label>
              {/* BLOOD TYPE */}
              <label>
                <span className="label-row">Nhóm máu <span> *</span></span>
                <select name="bloodType" value={formData.bloodId} onChange={e => handleChange(e)} required>
                  <option disabled value="0" selected>Chọn nhóm máu</option>
                  <option value="1">A+</option>
                  <option value="2">A-</option>
                  <option value="3">B+</option>
                  <option value="4">B-</option>
                  <option value="5">AB+</option>
                  <option value="6">AB-</option>
                  <option value="7">O+</option>
                  <option value="8">O-</option>
                </select>
              </label>

              {/* BLOOD AMOUNT */}
              <label><span className="label-row">Lượng máu sẽ hiến (ml)<span> *</span></span> 
                <input type="number" name="amountBloodMl" value={formData.amountBloodMl} min="50" max="150" step="0.1" onChange={e => handleChange(e)} required />
              </label>

              {/* CMND */}
              <label><span className="label-row">Số CCCD <span> *</span></span>
                <input name="cccdNumber" value={formData.cccdNumber} onChange={e => handleChange(e)} required />
              </label>

              {/* NUMBER PHONE */}
              <label><span className="label-row">Số điện thoại <span> *</span></span>
                <input name="phone" value={formData.phone} onChange={e => handleChange(e)} required />
              </label>

              {/* ADDRESS */}
              <label><span className="label-row">Địa chỉ thường trú<span> *</span></span>
                <input name="address" value={formData.address} onChange={e => handleChange(e)} required/>
              </label>
            </div>
          </fieldset>
          
          {/* <fieldset>
            <legend>Câu hỏi sức khỏe</legend>
            {healthQuestions.map((q, idx) => (
              <div className="health-question" key={idx}>
                <span>{idx + 1}. {q}</span>
                <label>
                  <input type="radio" name={`health_${idx}`} value="Có" checked={formData.healthQuestions[idx] === 'Có'} onChange={e => handleChange(e)} required /> Có
                </label>
                <label>
                  <input type="radio" name={`health_${idx}`} value="Không" checked={formData.healthQuestions[idx] === 'Không'} onChange={e => handleChange(e)} required /> Không
                </label>
              </div>
            ))}        
          </fieldset> */}
          
          <div className="form-row agree-row">
            <label className="agree-label">
              <input type="checkbox" name="agree" checked={formData.agree} onChange={e => handleChange(e)} required /> 
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