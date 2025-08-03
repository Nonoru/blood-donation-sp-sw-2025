import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
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
  statusType: '',
};

const ReceiveBlood = () => {
  const [formData, setFormData] = useState(initialState);
  const [bloodTypeInfo, setBloodTypeInfo] = useState([]);
  const [agreeForTruth, setAgreeForTruth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getBloodType = async () => {
    try {
      const response = await UserApi.getBloodType();
      if (response.data.code === 200) {
        setBloodTypeInfo(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching blood types:', error);
    }
  };

  useEffect(() => {
    getBloodType();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreeForTruth) {
      toast.error("Vui lòng cam kết thông tin", { className: 'my-toast' });
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await UserApi.orderDonationReceiving(formData);
      if (response.data.code === 200) {
        setFormData(initialState);
        setAgreeForTruth(false);
        toast.success(response.data.message, { className: 'my-toast' });
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Bạn cần đăng nhập để thực hiện chức năng này", { className: 'my-toast' });
      } else if (error.response?.status === 403) {
        toast.error("Bạn không có quyền sử dụng", { className: 'my-toast' });
      } else if (error.response?.data) {
        toast.error(error.response.data.message, { className: 'my-toast' });
      } else if (error.request) {
        toast.error("Không nhận được phản hồi từ server", { className: 'my-toast' });
      } else {
        toast.error("Lỗi không xác định", { className: 'my-toast' });
      }
    } finally {
      setIsLoading(false);
    }
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
        <div className="enhanced-form-container">
          <form className="enhanced-receive-form" onSubmit={handleSubmit}>
            <div className="form-header">
              <div className="form-title-section">
                <h3 className="form-main-title">
                  <span className="form-icon">🩸</span>
                  Thông tin đăng ký nhận máu
                </h3>
                <p className="form-subtitle">
                  Vui lòng điền đầy đủ thông tin để chúng tôi có thể hỗ trợ bạn tốt nhất
                </p>
              </div>
            </div>

            <div className="form-content">
              <div className="form-section">
                <h4 className="section-title">
                  <span className="section-icon">👤</span>
                  Thông tin cá nhân
                </h4>
                <div className="enhanced-row">
                  <div className="form-field-group">
                    <label className="enhanced-label">
                      <span className="label-text">
                        <span className="field-icon">👤</span>
                        Họ và tên người nhận
                        <span className="required-mark">*</span>
                      </span>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="enhanced-input"
                        placeholder="Nhập họ và tên đầy đủ"
                        required
                      />
                    </label>
                  </div>
                  
                  <div className="form-field-group">
                    <label className="enhanced-label">
                      <span className="label-text">
                        <span className="field-icon">🆔</span>
                        Số CCCD
                        <span className="required-mark">*</span>
                      </span>
                      <input
                        type="text"
                        name="cccdNumber"
                        value={formData.cccdNumber}
                        onChange={handleChange}
                        className="enhanced-input"
                        placeholder="Nhập số CCCD"
                        required
                      />
                    </label>
                  </div>
                </div>

                <div className="enhanced-row">
                  <div className="form-field-group">
                    <label className="enhanced-label">
                      <span className="label-text">
                        <span className="field-icon">📞</span>
                        Số điện thoại liên hệ
                        <span className="required-mark">*</span>
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="enhanced-input"
                        placeholder="Nhập số điện thoại"
                        required
                      />
                    </label>
                  </div>
                  
                  <div className="form-field-group">
                    <label className="enhanced-label">
                      <span className="label-text">
                        <span className="field-icon">📍</span>
                        Địa chỉ
                        <span className="required-mark">*</span>
                      </span>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="enhanced-input"
                        placeholder="Nhập địa chỉ chi tiết"
                        required
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h4 className="section-title">
                  <span className="section-icon">🩸</span>
                  Thông tin máu cần
                </h4>
                <div className="enhanced-row">
                  <div className="form-field-group">
                    <label className="enhanced-label">
                      <span className="label-text">
                        <span className="field-icon">🩸</span>
                        Nhóm máu cần
                        <span className="required-mark">*</span>
                      </span>
                      <select
                        name="bloodId"
                        value={formData.bloodId}
                        onChange={handleChange}
                        className="enhanced-select"
                        required
                      >
                        <option value="" disabled>Chọn nhóm máu</option>
                        {bloodTypeInfo.map((bloodType) => (
                          <option key={bloodType.id} value={bloodType.id}>
                            {bloodType.bloodType}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  
                  <div className="form-field-group">
                    <label className="enhanced-label">
                      <span className="label-text">
                        <span className="field-icon">💉</span>
                        Lượng máu cần (ml)
                        <span className="required-mark text-xs">
                          * Lượng máu này là chưa chính thức
                        </span>
                      </span>
                      <input
                        type="number"
                        name="amountBloodMl"
                        value={formData.amountBloodMl}
                        onChange={handleChange}
                        className="enhanced-input"
                        placeholder="Nhập lượng máu cần"
                        min="100"
                        step="50"
                        required
                      />
                    </label>
                  </div>
                </div>

                <div className="enhanced-row">
                  <div className="form-field-group full-width">
                    <label className="enhanced-label">
                      <span className="label-text">
                        <span className="field-icon">📝</span>
                        Lý do cần máu
                        <span className="required-mark">*</span>
                      </span>
                      <textarea
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        className="enhanced-textarea"
                        placeholder="Mô tả chi tiết lý do cần máu (vui lòng điền lý do hợp lệ)"
                        rows="3"
                        required
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h4 className="section-title">
                  <span className="section-icon">⚡</span>
                  Mức độ ưu tiên
                </h4>
                <div className="status-section">
                  <div className="radio-group">
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="statusType"
                        value="normal"
                        onChange={handleChange}
                        required
                      />
                      <span className="radio-custom"></span>
                      <div className="radio-content">
                        <span className="radio-title">Bình thường</span>
                        <span className="radio-description">Xử lý theo thứ tự đăng ký</span>
                      </div>
                    </label>
                    
                    <label className="radio-option urgent">
                      <input
                        type="radio"
                        name="statusType"
                        value="urgent"
                        onChange={handleChange}
                      />
                      <span className="radio-custom"></span>
                      <div className="radio-content">
                        <span className="radio-title">🚨 Khẩn cấp</span>
                        <span className="radio-description">Ưu tiên xử lý ngay lập tức</span>
                      </div>
                    </label>
                  </div>
                  <div className="status-note">
                    <span className="note-icon">⚠️</span>
                    <span className="note-text">
                      Đơn có trạng thái khẩn cấp sẽ được nhân viên liên hệ nhanh để hỗ trợ cấp tốc
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-footer">
              <div className="agree-section">
                <label className="enhanced-checkbox">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={agreeForTruth}
                    onChange={(e) => setAgreeForTruth(e.target.checked)}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-text">
                    Tôi cam kết các thông tin trên là đúng sự thật và tự nguyện đăng ký nhận máu.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="enhanced-submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span>
                    <span>Đang xử lý...</span>
                  </>
                ) : (
                  <>
                    <span className="submit-icon">📤</span>
                    <span className="submit-text">GỬI ĐƠN ĐĂNG KÝ</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReceiveBlood; 