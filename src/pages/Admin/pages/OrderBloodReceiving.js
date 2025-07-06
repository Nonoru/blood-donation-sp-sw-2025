import React, { useState, useEffect } from 'react';
import * as StaffApi from '../services/StaffApi'
import { toast } from 'react-toastify';
import '../styles/OrderBloodDonation.scss';
import { pre } from 'framer-motion/client';
function OrderBloodReceiving() {
  const tHeadItems =
    ["Mã", "Tên khách hàng", "Số điện thoại", "Nhóm máu", "Lượng máu(ml)", "Tình trạng", "Ngày tạo", "Xem thêm", "Duyệt", "Loại"];

  const [moreInfo, setMoreInfo] = useState(false);
  const [orderInfo, setOrderInfo] = useState([]);
  const [clinics, setClinics] = useState([])

  const getList = async () => {
    const execute = async () => {
      try {
        const res = await StaffApi.getOrderReceiveProcessing();
        await new Promise(resolve => setTimeout(resolve, 1000));
        return res;
      } catch (err) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        throw err;
      }
    };

    try {
      await toast.promise(
        execute(),
        {
          pending: {
            render() {
              return 'Đang tải danh sách đơn...';
            },
            className: 'my-toast',
          },
          success: {
            render({ data }) {
              const orderList = [];
              data.data.data.forEach(i => {
                orderList.push(i)
              });
              orderList.sort((a, b) => {
                if (a.type === 'urgent' && b.type !== 'urgent') return -1;
                if (a.type !== 'urgent' && b.type === 'urgent') return 1;
                return new Date(a.createDate) - new Date(b.createDate);
              });
              setOrderInfo(orderList);
              return 'Đã tải danh sách thành công!';
            },
            className: 'my-toast',
          },
          error: {
            render() {
              return 'Có lỗi xảy ra khi tải danh sách!';
            },
            className: 'my-toast',
          }
        }
      );
    } catch (err) {
    }
  };
  useEffect(() => {
    getList();
  }, []);

  const [chooseUserInfo, setChooseUserInfo] = useState({})
  const watchUserInfo = (info) => {
    setMoreInfo(prev => !prev);
    setChooseUserInfo(info)
  }
  const [stateAcceptBtn, setStateAcceptBtn] = useState(false);
  const acceptUserToInfo = async (info) => {
    const res = await StaffApi.getClinics();
    const clinicList = [];
    res.data.data.forEach(i => {
      clinicList.push(i)
    });
    setClinics(clinicList);
    setStateAcceptBtn(prev => !prev)
    setChooseUserInfo(info)
  }
  const [clinicId, setClinicId] = useState()
  const acceptOrder = async (e, id) => {
    e.preventDefault()
    try {
      const response = await StaffApi.acceptOrderReceive(id, clinicId);

      if (response.data.code === 200) {
        toast.success(response.data.message, { className: 'my-toast' })
        setClinicId()
        setStateAcceptBtn(prev => !prev)
        getList();
      }
    } catch (error) {
      console.log(error.response)
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
  const [stateRefuseBtn, setStateRefuseBtn] = useState(false);
  const refuseUserToInfo = (info) => {
    setStateRefuseBtn(prev => !prev)
    setChooseUserInfo(info)
  }
  const [reason, setReason] = useState('');
  const refuseOrder = async (e, id, reason) => {
    e.preventDefault();
    try {
      const response = await StaffApi.refuseOrderReceive(id, reason);

      if (response.data.code === 200) {
        toast.success(response.data.message, { className: 'my-toast' })
        getList();
        setStateRefuseBtn(prev => !prev)
      }
    } catch (error) {
      console.log(error.response)
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
  return (
    <div className="order-blood-donation-page">
      <div
        className={`order-more-info ${moreInfo ? 'show' : 'hidden'}`}
      >
        <h2>Thông tin khách hàng</h2>
        <div>
          <span>Mã đơn</span>
          <span>{chooseUserInfo.orderId}</span>
        </div>
        <div>
          <span>Tạo bởi username</span>
          <span>{chooseUserInfo.createdByUsername}</span>
        </div>
        <div>
          <span>Họ tên</span>
          <span>{chooseUserInfo.fullName}</span>
        </div>
        <div>
          <span>CCCD</span>
          <span>{chooseUserInfo.cccdNumber}</span>
        </div>
        <div>
          <span>Địa chỉ</span>
          <span>{chooseUserInfo.address}</span>
        </div>
        <div>
          <span>Lý do</span>
          <span>{chooseUserInfo.reason}</span>
        </div>
        <div>
          <span>Ngày tạo</span>
          <span>{chooseUserInfo.createDate}</span>
        </div>
        <button type="none" className="close-btn" onClick={e => setMoreInfo(!moreInfo)}></button>
      </div>
      <p className={`title-table ${moreInfo || stateAcceptBtn ? 'prevent-ui' : 'normal-ui'}`}>Danh sách đơn đặt hẹn nhận hỗ trợ máu</p>
      <table className={`${moreInfo || stateAcceptBtn ? 'prevent-ui' : 'normal-ui'}`}>
        <thead>
          <tr>
            {tHeadItems.map((item, index) => (
              <th key={index}>
                <div>
                  {item}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            orderInfo.map((item, index) => (
              <tr key={index} className={`${item.type === 'urgent' ? 'urgent-order' : ''}`}>
                <td>{item.orderId}</td>
                <td>{item.fullName}</td>
                <td>{item.phone}</td>
                <td>{item.bloodType}</td>
                <td>{item.amountBloodMl}</td>
                <td>
                  {item.type === 'normal' ? 'Bình thường' : 'Khẩn cấp'}
                </td>
                <td>{item.createDate}</td>
                <td
                  className="more-info"
                  onClick={() => watchUserInfo(item)}>
                  <span>Thông tin</span>
                </td>
                <td>
                  <button className="btn-accept" onClick={e => acceptUserToInfo(item)}>
                    Nhận
                  </button>
                </td>
                <td>
                  <button className="btn-reject" onClick={e => refuseUserToInfo(item)}>
                    Loại
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className={`${stateAcceptBtn ? 'show' : 'hidden'} accept-container `}>
        <h2>Nhận đơn</h2>
        <div className="form-accept">
          <span className="text-w">Xác nhận duyệt đơn</span>
          <span className="text-w">Mã đơn: {chooseUserInfo.orderId}</span>
          <span className="text-w">Tên khách hàng: {chooseUserInfo.fullName}</span>
          <form onSubmit={e => acceptOrder(e, chooseUserInfo.orderId)}>
            <label>
              Nơi hẹn
              <select onChange={(e) => setClinicId(e.target.value)} required>
                <option value="" disabled selected >Chọn điểm hẹn</option>
                {clinics.map((item, index) => (
                  <option value={item.id} >{item.clinicName}</option>
                ))}
              </select>
            </label>
            <button type="submit">Nhận</button>
          </form>
        </div>
        <button type="none" className="close-btn" onClick={e => setStateAcceptBtn(!stateAcceptBtn)}>
        </button>
      </div>
      <div className={`${stateRefuseBtn ? 'show' : 'hidden'} refuse-container `}>
        <h2>Loại đơn</h2>
        <div className="form-accept">
          <span className="text-w">Bạn có chắc chắn muốn loại đơn này?</span>
          <span className="text-w">Mã đơn: {chooseUserInfo.orderId}</span>
          <span className="text-w">Tên khách hàng: {chooseUserInfo.fullName}</span>
          <form onSubmit={e => refuseOrder(e, chooseUserInfo.orderId, reason)}>
            <label>
              Nhập lý do loại đơn
              <input required onChange={(e) => setReason(e.target.value)}></input>
            </label>
            <button type="submit">Loại</button>
          </form>
        </div>
        <button type="none" className="close-btn" onClick={e => setStateRefuseBtn(!stateRefuseBtn)}>
        </button>
      </div>
    </div>
  );
}
export default OrderBloodReceiving;