import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getUserId } from '../../../../util/Token'
import * as UserApi from '../../services/UserApi';
import '../../styles/DonateBlood.scss';
// const healthQuestions = [
//   'Bạn đã từng hiến máu chưa ?',
//   'Hiện tại, bạn có bị các bệnh: viêm khớp, đau dạ dày, viêm gan, vàng da, bệnh tim, huyết áp thấp/cao, ho kéo dài,bệnh máu, lao ?',
//   'Trong vòng 12 tháng gần đây, bạn có mắc các bệnh và đã được điều trị khỏi: Sốt rét, Giang mai, Lao, Viêm não, Phẫu thuật ngoại khoa ?',
//   'Trong vòng 12 tháng gần đây, bạn có dược truyền máu và các chể phẩm máu ?',
//   'Trong vòng 12 tháng gần đây, bạn có tiêm Vaccin bệnh dại ?',
//   'Trong vòng 6 tháng gần đây, bạn có triệu chứng sau không: Sút cân nhanh không rõ nguyên nhân ?',
//   'Trong vòng 6 tháng gần đây, bạn có triệu chứng sau không: Nổi hạch kéo dài ?',
//   'Trong vòng 6 tháng gần đây, bạn có triệu chứng sau không: Chữa răng, châm cứu ?',
//   'Trong vòng 6 tháng gần đây, bạn có triệu chứng sau không: Xăm mình, xỏ lỗ tai, lỗ mũi ?',
//   'Trong vòng 6 tháng gần đây, bạn có triệu chứng sau không: Sử dụng ma tuý ?',
//   'Trong vòng 6 tháng gần đây, bạn có triệu chứng sau không: Quan hệ tình dục với người nhiễm HIV hoặc người có hành vì nguy cơ lây nhiễm HIV ?',
//   'Trong vòng 6 tháng gần đây, bạn có triệu chứng sau không: QUan hệ tình dục với người cùng giới ?',
//   'Trong vòng 7 ngày gần đây, bạn có: Bị cảm cúm ( ho, nhức đầu, sốt... ) ?',
//   'Trong vòng 7 ngày gần đây, bạn có: Dùng thuốc kháng sinh: Aspirin, Corticol ?',
//   'Trong vòng 7 ngày gần đây, bạn có: Tiêm Vacxin phòng: Viêm gan siêu vi B, Human Papilloma Virus,... ?',
//   'Bạn có đồng ý xét nghiệm HIV, nhận thông báo và được tư vấn khi kết quả xét nghiệm HIV nghi ngờ hoặc dương tính ?',
//   'Bạn có đồng ý hiến máu tình nguyện và tuân thủ các quy định của chương trình ?'
// ];
const form = {
  fullName: '',
  dob: '',
  gender: '',
  weight: '',
  amountBloodMl: '',
  cccdNumber: '',
  phone: '',
  address: '',
  bloodId: '',
  userId: '',
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
    if(agreeForTruth === false){
      toast.error("Vui lòng cam kết thông tin" , { className: 'my-toast' })
      return
    }
    try {
      formData.userId = getUserId();
      formData.orderDateId = chooseOrderDate.orderDateId;
      const response = await UserApi.orderDonation(formData);
      if (response.data.code === 200) {
        setFormData({
          fullName: '',
          dob: '',
          gender: '',
          weight: '',
          amountBloodMl: '',
          cccdNumber: '',
          phone: '',
          address: '',
          bloodId: '',
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
    const response = await UserApi.getOrderDate();
    if (response.data.code === 200) {
      const listDate = [];
      response.data.data.forEach(i => {
        listDate.push(i)
      });
      setListDate(listDate);
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
        <form className={`donate-blood-form ${formState ? 'show' : 'hidden'}`} onSubmit={e => handleSubmit(e)}>
          <fieldset>
            <div className='form-title'>
              <legend>Thông tin cá nhân</legend>
              <div className='form-schedule'>
                <div>
                  <span>Ngày : {chooseOrderDate.orderDate}</span>
                </div>
                <div>
                  <span>Giờ : {chooseOrderDate.orderTime}</span>
                </div>
              </div>
              <button type="none" className="close-btn" onClick={e => openForm([])}> </button>
            </div>
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
                  <option value="1">Nam</option>
                  <option value="2">Nữ</option>
                </select>
              </label>
              {/* WEIGHT */}
              <label>
                <span className='label-row'>Cân nặng<span>*</span></span>
                <input type="number" value={formData.weight} name="weight" min="1" max="200" step="0.1" onChange={e => handleChange(e)} required />
              </label>
              {/* BLOOD TYPE */}
              <label>
                <span className="label-row">Nhóm máu <span> *</span></span>
                <select name="bloodId" value={formData.bloodId} onChange={e => handleChange(e)} required>
                  <option disabled value="" selected>Chọn nhóm máu</option>
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
                <input type="number" name="amountBloodMl" value={formData.amountBloodMl} step="10" onChange={e => handleChange(e)} required />
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
                <input name="address" value={formData.address} onChange={e => handleChange(e)} required />
              </label>
            </div>
          </fieldset>
          <div className="form-row agree-row">
            <div className="agree-label">
              <input type="checkbox" name="agree" onClick={e => setAgreeForTruth(!agreeForTruth)}/> 
              Tôi cam kết các thông tin trên là đúng sự thật và tự nguyện đăng ký hiến máu.
            </div>
          </div>

          <button type="submit" className="submit-btn">Gửi đăng ký</button>
        </form>

        <div className={`order ${!formState ? 'show' : 'hidden'}`}>
          <h2>Các mốc thời gian đặt lịch hiến máu</h2>
          <div className='order-date'>
            {listDate.map((item, index) => (
              <div key={index} className={`order-date-ele`} onClick={e => openForm(item)}>
                <div>
                  <span>Mã</span>
                  {item.orderDateId}
                </div>
                <div>
                  <span>Ngày</span>
                  {item.orderDate}
                </div>
                <div>
                  <span>Thời gian</span>
                  {item.orderTime}
                </div>
                <div>
                  <span>Số lượng người tham gia</span>
                  {item.numberOfPeople}
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