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

  const [listOrderDonateHistory, setListOrderDonateHistory] = useState([])
  const getListDonate = async () => {
    const userId = Token.getUserId()
    try {
      const response = await UserApi.getOrderHistory(userId);
      if (response.data.code === 200) {
        const list = [];
        response.data.data.forEach(i => {
          list.push(i)
        });
        setListOrderDonateHistory(list);
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
  const [listOrderReceiveHistory, setListOrderReceiveHistory] = useState([])
  const getListReceive = async () => {
    const userId = Token.getUserId()
    try {
      const response = await UserApi.getOrderReceiveHistory(userId);
      if (response.data.code === 200) {
        const list = [];
        response.data.data.forEach(i => {
          list.push(i)
        });
        setListOrderReceiveHistory(list);
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
    getListDonate();
    getListReceive();
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
  const formatDate = (dateInput) => {
    if (!dateInput) {
      return ''
    }
    const date = new Date(dateInput);
    const day = String(date.getDate()).padStart(2, '0');     // dd
    const month = String(date.getMonth() + 1).padStart(2, '0'); // MM
    const year = date.getFullYear();                         // yyyy
    return `${day}/${month}/${year}`;
  }
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
                <th>Họ tên</th>
                <th>Ngày tạo</th>
                <th>Loại máu</th>
                <th>Số lượng</th>
                <th>Ngày hiến</th>
                <th>Phòng khám</th>
                <th>Trạng thái</th>
                <th>Lý do bị hủy</th>
              </tr>
            </thead>
            <tbody>
              {listOrderDonateHistory.map((item, idx) => (
                <tr key={item.id}>
                  <td>{item.orderDonationId}</td>
                  <td>{item.fullName}</td>
                  <td>{item.createDate}</td>
                  <td>{item.bloodType}</td>
                  <td>{item.amountBloodMl}</td>
                  <td>{item.donateDate}</td>
                  <td>{item.clinicName}</td>
                  <td id='status-row'>
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
                <th>Mã đơn</th>
                <th>Họ tên</th>
                <th>Ngày tạo</th>
                <th>Loại máu</th>
                <th>Số lượng</th>
                <th>Lý do</th>
                <th>Địa điểm nhận máu</th>
                <th>Loại đơn</th>
                <th>Trạng thái</th>
                <th>Lý do bị hủy</th>
                <th>Ngày hoàn tất</th>
              </tr>
            </thead>
            <tbody>
              {listOrderReceiveHistory.map((item, idx) => (
                <tr key={item.id}>
                  <td>{item.orderId + 1}</td>
                  <td>{item.fullName}</td>
                  <td>{formatDate(item.createDate)}</td>
                  <td>{item.bloodType}</td>
                  <td>{item.amountBloodMl}</td>
                  <td>{item.reason}</td>
                  <td>{item.clinicName}</td>
                  <td>
                    {item.type === 'normal' ?
                      <span className='bg-green-100 text-green-700 px-2 py-1 rounded-full'>Bình thường</span>
                      :
                      <span className='bg-red-100 text-red-700 px-2 py-1 rounded-full'>Khẩn cấp</span>
                    }
                  </td>
                  <td id='status-row'>
                    <div className='status-code' >
                      {renderStatusDiv(item.status)}
                    </div></td>
                  <td>{item.reasonCancel}</td>
                  <td>{formatDate(item.doneDate)}</td>
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