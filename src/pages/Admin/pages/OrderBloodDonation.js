import React, { useState, useEffect } from 'react';
import * as StaffApi from '../services/StaffApi'
import { toast } from 'react-toastify';
import '../styles/OrderBloodDonation.scss';
function OrderBloodDonation() {
  const tHeadItems =
    ["Mã", "Tên khách hàng", "Số điện thoại", "Nhóm máu", "Lượng máu(ml)", "Ngày hẹn", "Xem thêm", "Tạo bởi", "Duyệt", "Hủy"];

  const [moreInfo, setMoreInfo] = useState(false);
  const [orderInfo, setOrderInfo] = useState([]);

  const getList = async () => {
    const execute = async () => {
      try {
        const res = await StaffApi.getOrderBloodDonation();
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

  const reload = () => window.location.reload();
  const [chooseUserInfo, setChooseUserInfo] = useState({})
  const watchUserInfo = (info) => {
    setMoreInfo(prev => !prev);
    setChooseUserInfo(info)
  }

  const acceptOrder = async (e, id) => {
    e.preventDefault()
    try {
      const response = await StaffApi.acceptOrder(id);

      if (response.data.code === 200) {

        toast.success(response.data.message, { className: 'my-toast' })
        setTimeout(() => {
          reload();
        }, 1500);
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
        className={`order-more-info ${moreInfo ? 'show' : 'hidden'} `}
      >
        <h2>Thông tin khách hàng</h2>
        <div>
          <span>Mã đơn</span>
          <span>{chooseUserInfo.orderDonationId}</span>
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
          <span>Giới tính</span>
          <span>{chooseUserInfo.gender}</span></div>
        <div>
          <span>Cân nặng</span>
          <span>{chooseUserInfo.weight}</span>
        </div>
        <div>
          <span>Ngày sinh</span>
          <span>{chooseUserInfo.dob}</span>
        </div>
        <div>
          <span>Địa chỉ</span>
          <span>{chooseUserInfo.address}</span>
        </div>
        <div>
          <span>Ngày tạo</span>
          <span>{chooseUserInfo.createDate}</span>
        </div>
        <button type="none" className="close-btn" onClick={e => setMoreInfo(!moreInfo)}></button>
      </div>
      <p className='title-table'>Danh sách đơn đặt lịch xét nghiệm máu</p>
      <table>
        <thead>
          <tr>
            {tHeadItems.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            orderInfo.map((item, index) => (
              <tr key={index}>
                <td>{item.orderDonationId}</td>
                <td>{item.fullName}</td>
                <td>{item.phone}</td>
                <td>{item.bloodType}</td>
                <td>{item.amountBloodMl}</td>
                <td>{item.orderDate}</td>
                <td
                  className="more-info"
                  onClick={() => watchUserInfo(item)}>
                  <span>Thông tin khách hàng</span>
                </td>
                <td>{item.createByUsername}</td>
                <td>
                  <button className="btn-accept" onClick={e => acceptOrder(e, item.orderDonationId)}>
                    Nhận
                  </button>
                </td>
                <td>
                  <button className="btn-reject">
                    Loại
                  </button>
                </td>
              </tr>
            ))}

        </tbody>
      </table>
    </div>
  );
}
export default OrderBloodDonation;