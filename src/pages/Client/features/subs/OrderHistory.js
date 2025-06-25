import React, { useState } from 'react';
import '../../styles/OrderHistory.scss';

const donationHistory = [
  { id: '25/06/2025', date: 'A+', location: 'Bệnh viện A', status: 'Đã hiến', amount: '350ml' },
  { id: 2, date: '15-03-2025', location: 'Bệnh viện B', status: 'Đã hiến', amount: '350ml' },
];
const receiveHistory = [
  { id: 1, date: '05-05-2025', hospital: 'Bệnh viện C', status: 'Đã nhận', amount: '250ml' },
];

const tabs = [
  { key: 'donate', label: 'Lịch sử hiến máu' }, 
  { key: 'receive', label: 'Yêu cầu nhận máu' },
];

const OrderHistory = () => {
  const [activeTab, setActiveTab] = useState('donate');

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
              {donationHistory.map((item, idx) => (
                <tr key={item.id}>
                  <td>{idx + 1}</td>
                  <td>{item.date}</td>
                  <td>{item.location}</td>
                  <td>{item.amount}</td>
                  <td>{item.status}</td>
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