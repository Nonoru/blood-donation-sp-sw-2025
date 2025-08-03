import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as UserApi from '../../services/UserApi';
import '../../styles/DonateBlood.scss';

const form = {
  fullName: '',
  dob: '',
  gender: '',
  cccdNumber: '',
  phone: '',
  address: '',
  orderDateId: '',
}

const DonateBlood = () => {
  const [formData, setFormData] = useState(form);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }
  const [agreeForTruth, setAgreeForTruth] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (agreeForTruth === false) {
      toast.error("Vui lòng cam kết thông tin", { className: 'my-toast' })
      return
    }
    try {
      formData.orderDateId = chooseOrderDate.orderDateId;
      const response = await UserApi.orderDonation(formData);
      if (response.data.code === 200) {
        setFormData({
          fullName: '',
          dob: '',
          gender: '',
          cccdNumber: '',
          phone: '',
          address: '',
          orderDateId: '',
        })
        setFormState(prev => !prev)
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
  }
  const [listDate, setListDate] = useState([])
  const getListDate = async () => {
    try {
      const response = await UserApi.getOrderDate();
      if (response.data.code === 200) {
        const listDate = [];
        response.data.data.forEach(i => {
          listDate.push(i)
        });
        if(listDate.length === 0)
          toast.error("Hiện tại không có ngày đặt lịch",{className : 'my-toast'})
        else
          setListDate(listDate);
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
  useEffect(() => {
    getListDate();
  }, []);
  const [formState, setFormState] = useState(false)
  const [chooseOrderDate, setChooseOrderDate] = useState({})
  const openForm = (item) => {
    setFormState(prev => !prev);
    setChooseOrderDate(item);
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
        <form className={`donate-blood-form enhanced-form ${formState ? 'show' : 'hidden'}`} onSubmit={e => handleSubmit(e)}>
          <div className="form-header">
            <div className="form-title-section">
              <h3 className="form-main-title">
                <span className="form-icon">📋</span>
                Thông tin cá nhân
              </h3>
              <div className="form-schedule-info">
                <div className="schedule-item">
                  <span className="schedule-label">📅 Ngày:</span>
                  <span className="schedule-value">{chooseOrderDate.orderDate}</span>
                </div>
                <div className="schedule-item">
                  <span className="schedule-label">🕐 Giờ:</span>
                  <span className="schedule-value">{chooseOrderDate.orderTime}</span>
                </div>
                <div className="schedule-item">
                  <span className="schedule-label">🏥 Phòng khám:</span>
                  <span className="schedule-value">{chooseOrderDate.clinicName}</span>
                </div>
              </div>
            </div>
            <button type="button" className="close-btn enhanced-close" onClick={e => openForm([])}>
              <span className="close-icon">×</span>
            </button>
          </div>
          
          <div className="form-content">
            <div className="form-row enhanced-row">
              {/* FULLNAME */}
              <div className="form-field-group">
                <label className="enhanced-label">
                  <span className="label-text">
                    <span className="field-icon">👤</span>
                    Họ và tên <span className="required-mark">*</span>
                  </span>
                  <input 
                    name="fullName" 
                    value={formData.fullName} 
                    onChange={e => handleChange(e)} 
                    className="enhanced-input"
                    placeholder="Nhập họ và tên đầy đủ"
                    required 
                  />
                </label>
              </div>

              {/* DOB */}
              <div className="form-field-group">
                <label className="enhanced-label">
                  <span className="label-text">
                    <span className="field-icon">🎂</span>
                    Ngày sinh <span className="required-mark">*</span>
                  </span>
                  <input 
                    type="date" 
                    name="dob" 
                    value={formData.dob} 
                    onChange={e => handleChange(e)} 
                    className="enhanced-input"
                    required 
                  />
                </label>
              </div>

              {/* GENDER */}
              <div className="form-field-group">
                <label className="enhanced-label">
                  <span className="label-text">
                    <span className="field-icon">⚧</span>
                    Giới tính <span className="required-mark">*</span>
                  </span>
                  <select 
                    name="gender" 
                    value={formData.gender} 
                    onChange={e => handleChange(e)} 
                    className="enhanced-select"
                    required
                  >
                    <option value="" disabled>Chọn giới tính</option>
                    <option value="1">Nam</option>
                    <option value="2">Nữ</option>
                  </select>
                </label>
              </div>

              {/* CMND */}
              <div className="form-field-group">
                <label className="enhanced-label">
                  <span className="label-text">
                    <span className="field-icon">🆔</span>
                    Số CCCD <span className="required-mark">*</span>
                  </span>
                  <input 
                    name="cccdNumber" 
                    value={formData.cccdNumber} 
                    onChange={e => handleChange(e)} 
                    className="enhanced-input"
                    placeholder="Nhập số CCCD"
                    required 
                  />
                </label>
              </div>

              {/* NUMBER PHONE */}
              <div className="form-field-group">
                <label className="enhanced-label">
                  <span className="label-text">
                    <span className="field-icon">📱</span>
                    Số điện thoại <span className="required-mark">*</span>
                  </span>
                  <input 
                    name="phone" 
                    value={formData.phone} 
                    onChange={e => handleChange(e)} 
                    className="enhanced-input"
                    placeholder="Nhập số điện thoại"
                    required 
                  />
                </label>
              </div>

              {/* ADDRESS */}
              <div className="form-field-group">
                <label className="enhanced-label">
                  <span className="label-text">
                    <span className="field-icon">📍</span>
                    Địa chỉ thường trú <span className="required-mark">*</span>
                  </span>
                  <input 
                    name="address" 
                    value={formData.address} 
                    onChange={e => handleChange(e)} 
                    className="enhanced-input"
                    placeholder="Nhập địa chỉ đầy đủ"
                    required 
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="form-footer">
            <div className="agree-section">
              <label className="enhanced-checkbox">
                <input 
                  type="checkbox" 
                  name="agree" 
                  checked={agreeForTruth}
                  onChange={e => setAgreeForTruth(e.target.checked)} 
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-text">
                  Tôi cam kết các thông tin trên là đúng sự thật và tự nguyện đăng ký hiến máu.
                </span>
              </label>
            </div>

            <button type="submit" className="submit-btn enhanced-submit">
              <span className="submit-icon">📤</span>
              <span className="submit-text">Gửi đăng ký</span>
            </button>
          </div>
        </form>

        <div className={`order enhanced-order ${!formState ? 'show' : 'hidden'}`}>
          <h2 className="order-title">
            <span className="title-icon">📅</span>
            Các mốc thời gian đặt lịch hiến máu
          </h2>
          <div className='order-date enhanced-order-grid'>
            {listDate.map((item, index) => (
              <div key={index} className={`order-date-ele enhanced-card`} onClick={e => openForm(item)}>
                <div className="card-header">
                  <span className="card-badge">Lịch #{index + 1}</span>
                </div>
                <div className="card-content">
                  <div className="info-grid">
                    <div className="info-item">
                      <span>📅 NGÀY</span>
                      <span>{item.orderDate}</span>
                    </div>
                    <div className="info-item">
                      <span>🕐 THỜI GIAN</span>
                      <span>{item.orderTime}</span>
                    </div>
                    <div className="info-item">
                      <span>🏥 PHÒNG KHÁM</span>
                      <span>{item.clinicName}</span>
                    </div>
                    <div className="info-item">
                      <span>👥 SỐ LƯỢNG</span>
                      <span>{item.numberOfPeople} người</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default DonateBlood;