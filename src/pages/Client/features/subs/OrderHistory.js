import React, { useState, useEffect } from 'react';
import * as Token from '../../../../util/Token'
import * as UserApi from '../../services/UserApi'
import { toast } from 'react-toastify';
import '../../styles/OrderHistory.scss';

const receiveHistory = [
  { id: 1, date: '05-05-2025', hospital: 'Bệnh viện C', status: 'Đã nhận', amount: '250ml' },
];

const tabs = [
  { key: 'donate', label: 'Lịch sử hiến máu' },
  { key: 'receive', label: 'Yêu cầu nhận máu' },
];

const OrderHistory = () => {
  const [activeTab, setActiveTab] = useState('donate');

  const [listOrderHistory, setListOrderHistory] = useState([])
  const getListDate = async () => {
    const userId = Token.getUserId()
    try {
      const response = await UserApi.getOrderHistory(userId);
      if (response.data.code === 200) {
        const list = [];
        response.data.data.forEach(i => {
          list.push(i)
        });
        setListOrderHistory(list);
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
  const renderStatusDiv = (statusCode) => {
    switch (statusCode) {
      case 1:
        return <div className="bg-yellow-500 text-white px-2 py-1 rounded font-semibold">Chờ xác nhận</div>;
      case 2:
        return <div className="bg-blue-500 text-white px-2 py-1 rounded font-semibold">Đã xác nhận</div>;
      case 3:
        return <div className="bg-green-500 text-white px-2 py-1 rounded font-semibold">Đã hoàn tất</div>;
      case 4:
        return <div className="bg-red-600 text-white px-2 py-1 rounded font-semibold">Đã từ chối đơn</div>;
      case 5:
        return <div className="bg-red-400 text-white px-2 py-1 rounded font-semibold">Đã hủy đơn</div>;
      default:
        return <div className="bg-gray-400 text-white px-2 py-1 rounded font-semibold">Không xác định</div>;
    }
  };
  return (
    <div className="order-history-page">
      <div className="donate-title-section">
        <div className="donate-title-content">
          <h2 className="main-title">
            <span className="blood-bridge">Blood Bridge</span>
            <span className="features-text">LỊCH SỬ ĐƠN HÀNG</span>
          </h2>
          <div className="title-decoration">
            <div className="decoration-line"></div>
            <div className="decoration-circle">📋</div>
            <div className="decoration-line"></div>
          </div>
        </div>
      </div>
      <h2 className="order-title">Xem Lịch Sử Đơn Hàng</h2>
      <div className="order-tabs">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`order-tab-btn${activeTab === tab.key ? ' active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="order-tab-content">
        {activeTab === 'donate' && (
          <table className="order-table">
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Ngày tạo</th>
                <th>Loại máu</th>
                <th>Số lượng</th>
                <th>Ngày hiến</th>
                <th>Phòng khám</th>
                <th>Trạng thái</th>
                <th>Lý do</th>
              </tr>
            </thead>
            <tbody>
              {listOrderHistory.map((item, idx) => (
                <tr key={item.id}>
                  <td>{item.orderDonationId + 1}</td>
                  <td>{item.createDate}</td>
                  <td>{item.bloodType}</td>
                  <td>{item.amountBloodMl}</td>
                  <td>{item.donateDate}</td>
                  <td>{item.clinicName}</td>
                  <td>
                    <div className='status-code'>
                    {renderStatusDiv(item.statusCode)}
                    </div></td>
                  <td>{item.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {activeTab === 'receive' && (
          <table className="order-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Ngày nhận</th>
                <th>Bệnh viện</th>
                <th>Số lượng</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {receiveHistory.map((item, idx) => (
                <tr key={item.id}>
                  <td>{idx + 1}</td>
                  <td>{item.date}</td>
                  <td>{item.hospital}</td>
                  <td>{item.amount}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrderHistory; 