import React, { useState } from 'react';
import '../styles/OrderBloodDonation.scss';
function OrderBloodDonation() {
  const tHeadItems =
    ["Mã", "Tên khách hàng", "Số điện thoại", "Nhóm máu", "Lượng máu(ml)", "Ngày hẹn", "Xem thêm", "Tạo bởi", "Duyệt", "Hủy"];

  const [moreInfo, setMoreInfo] = useState(false);
  const [orderInfo, setOrderInfo] = useState({});
  const getListOrderInfo = () => {
  }

  return (
    <div className="order-blood-donation-page">
      <button className="refresh-btn btn" onClick={getListOrderInfo} >
        <img src="/img/icons/refresh.svg"></img>
        <span>Tải lại trang</span>
      </button>
      <div className={`order-more-info ${moreInfo ? 'show' : 'hidden'} `} >
        <span>Thông tin khách hàng</span>
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
          <tr>
            <td>1</td>
            <td>Tên khách hàng</td>
            <td>Số điện thoại</td>
            <td>Nhóm máu</td>
            <td>Lượng máu</td>
            <td>Ngày hẹn</td>
            <td className="more-info" onClick={() => setMoreInfo(!moreInfo)}>
              <span>Thông tin khách hàng</span>
            </td>
            <td>
              Huy
            </td>
            <td>
              <button className="btn-accept">
                Nhận
              </button>
            </td>
            <td>
              <button className="btn-reject">
                Loại
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default OrderBloodDonation;