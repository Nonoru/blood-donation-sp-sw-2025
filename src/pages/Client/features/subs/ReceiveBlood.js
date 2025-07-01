import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { getUserId } from '../../../../util/Token'
import * as UserApi from '../../services/UserApi';
import '../../styles/ReceiveBlood.scss';

const initialState = {
  fullName: '',
  bloodId: '',
  amountBloodMl: '',
  phone: '',
  cccdNumber: '',
  address: '',
  reason: '',
  status: '',
  userId: ''
};

const ReceiveBlood = () => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (agreeForTruth === false) {
      toast.error("Vui lòng cam kết thông tin", { className: 'my-toast' })
      return
    }
    console.log(formData)
    try {
      formData.userId = getUserId();
      const response = await UserApi.orderDonationReceiving(formData);
      if (response.data.code === 200) {
        setFormData({
          fullName: '',
          bloodId: '',
          amountBloodMl: '',
          phone: '',
          cccdNumber: '',
          address: '',
          reason: '',
          status: '',
          userId: ''
        })
        toast.success(response.data.message, { className: 'my-toast' })
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Bạn cần đăng nhập để thực hiện chức năng này", { className: 'my-toast' });
      } else if (error.response.status === 403) {
        toast.error("Bạn không có quyền sử dụng", { className: 'my-toast' });
      } else if (error.response.data) {
        toast.error(error.response.data.message, { className: 'my-toast' });
      } else if (error.request) {
        toast.error("Không nhận được phản hồi từ server", { className: 'my-toast' });
      } else {
        toast.error("Lỗi không xác định", error.message, { className: 'my-toast' });
      }
    }
  };
  const [agreeForTruth, setAgreeForTruth] = useState(false)

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
        <form className="donate-blood-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Thông tin người nhận</legend>
            <div className="form-row">
              <label><span className="label-row">Họ và tên người nhận<span>*</span></span>
                <input name="fullName" value={formData.fullName} onChange={handleChange} required />
              </label>
              <label><span className="label-row">Nhóm máu cần <span>*</span></span>
                <select name="bloodId" value={formData.bloodId} onChange={handleChange} required>
                  <option value="" disabled selected>Chọn nhóm máu</option>
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
              <label><span className="label-row">Lượng máu cần (ml) <span>*</span></span>
                <input type='number' name="amountBloodMl" value={formData.amountBloodMl} onChange={handleChange} required />
              </label>
            </div>
            <div className="form-row">
              <label><span className="label-row">Số CCCD <span>*</span></span>
                <input name="cccdNumber" value={formData.cccdNumber} onChange={handleChange} required />
              </label>
              <label><span className="label-row">Số điện thoại liên hệ <span>*</span></span>
                <input name="phone" value={formData.phone} onChange={handleChange} required />
              </label>
              <label><span className="label-row">Lý do cần máu (vui lòng điền lý do hợp lệ) <span>*</span></span>
                <input name="reason" value={formData.reason} onChange={handleChange} required />
              </label>
            </div>
            <div className="form-row">
              <label><span className="label-row">Địa chỉ<span>*</span></span>
                <input name="address" value={formData.address} onChange={handleChange} required />
              </label>
            </div>
          </fieldset>

          <div className="status">
            <div className='radio-status'>
              <span>Trạng thái:</span>
              <label>
                <input type="radio" name="statusType" value="normal" onChange={handleChange} required/> Bình thường
              </label>
              <label>
                <input type="radio" name="statusType" value="urgent" onChange={handleChange}/> Khẩn cấp
              </label>
            </div>
            <div className='note-status'>
              <span>Lưu ý:</span> đơn có trạng thái khẩn cấp, nhân viên sẽ liên hệ nhanh để đơn được hỗ trợ cấp tốc
            </div>
          </div>

          <div className="form-row agree-row">
            <div className="agree-label">
              <input type="checkbox" name="agree" onClick={e => setAgreeForTruth(!agreeForTruth)} />
              Tôi cam kết các thông tin trên là đúng sự thật và tự nguyện đăng ký hiến máu.
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-btn">GỬI ĐƠN ĐĂNG KÝ</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ReceiveBlood; 