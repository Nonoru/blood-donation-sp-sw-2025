import React, { useState } from 'react';
import '../../styles/ReceiveBlood.scss';

const initialState = {
  patientName: '',
  dob: '',
  gender: '',
  bloodType: '',
  amount: '',
  hospital: '',
  phone: '',
  reason: '',
  receiveDate: '',
  agree: false,
  weight: '',
};

const ReceiveBlood = () => {
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="receive-blood-page blood-register-layout">
      <div className="donate-title-section">
        <div className="donate-title-content">
          <h2 className="main-title">
            <span className="blood-bridge">Blood Bridge</span>
            <span className="features-text">Đăng ký Nhận Máu</span>
          </h2>
          <div className="title-decoration">
            <div className="decoration-line"></div>
            <div className="decoration-circle">🏥</div>
            <div className="decoration-line"></div>
          </div>
        </div>
      </div>
      <div className="donate-form-section">
        {showToast && (
          <div className="custom-toast success">
            <span className="toast-icon">✔</span>
            Đăng ký nhận máu thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.
            <button className="toast-close" onClick={() => setShowToast(false)}>×</button>
          </div>
        )}
        <form className="donate-blood-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Thông tin bệnh nhân</legend>
            <div className="form-row">
              <label><span className="label-row">Họ và tên bệnh nhân <span>*</span></span>
                <input name="patientName" value={form.patientName} onChange={handleChange} required />
              </label>
              <label><span className="label-row">Ngày sinh <span>*</span></span>
                <input type="date" name="dob" value={form.dob} onChange={handleChange} required />
              </label>
              <label><span className="label-row">Giới tính <span>*</span></span>
                <select name="gender" value={form.gender} onChange={handleChange} required>
                  <option value="">Chọn</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
              </label>
              <label>
                <span className='label-row'>Cân nặng<span>*</span></span>
                <input type="number" value={form.weight} name="weight" min="1" max="200" step="0.1" onChange={handleChange} required />
              </label>
            </div>
            <div className="form-row">
              <label><span className="label-row">Nhóm máu cần <span>*</span></span>
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
              <label><span className="label-row">Lượng máu cần (ml) <span>*</span></span>
                <input name="amount" value={form.amount} onChange={handleChange} required />
              </label>
            </div>
            <div className="form-row">
              <label><span className="label-row">Số CCCD <span>*</span></span>
                <input name="hospital" value={form.hospital} onChange={handleChange} required />
              </label>
              <label><span className="label-row">Số điện thoại liên hệ <span>*</span></span>
                <input name="phone" value={form.phone} onChange={handleChange} required />
              </label>
            </div>
            <div className="form-row">
              <label><span className="label-row">Lý do cần máu <span>*</span></span>
                <input name="reason" value={form.reason} onChange={handleChange} required />
              </label>
              <label><span className="label-row">Ngày cần nhận máu <span>*</span></span>
                <input type="date" name="receiveDate" value={form.receiveDate} onChange={handleChange} required />
              </label>
            </div>
          </fieldset>
          <div className="form-actions">
            <button type="button" className="emergency-btn">
            <span className="emergency-icon">⚠</span> KHẨN CẤP
            </button>
            <button type="submit" className="submit-btn">GỬI ĐĂNG KÝ</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReceiveBlood; 