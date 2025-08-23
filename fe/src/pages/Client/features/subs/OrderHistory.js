import React, { useState, useEffect } from 'react';
import * as Token from '../../../../util/Token'
import * as UserApi from '../../services/UserApi'
import { toast } from 'react-toastify';
import '../../styles/OrderHistory.scss';


const tabs = [
  { key: 'donate', label: 'Lịch sử hiến máu' },
  { key: 'receive', label: 'Yêu cầu nhận máu' },
];

const OrderHistory = () => {
  const [activeTab, setActiveTab] = useState('donate');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });

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

  const openModal = (title, content) => {
    setModalContent({ title, content });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const renderModalContent = (title, content) => {
    if (title === 'Thông tin người nhận') {
      const lines = content.split('\n');
      return (
        <div className="modal-info-grid">
          {lines.map((line, index) => {
            const [label, value] = line.split(': ');
            return (
              <div key={index} className="modal-info-item">
                <div className="info-label">{label}:</div>
                <div className="info-value">{value}</div>
              </div>
            );
          })}
        </div>
      );
    } else if (title === 'Thông tin thời gian') {
      const lines = content.split('\n');
      return (
        <div className="modal-info-grid">
          {lines.map((line, index) => {
            const [label, value] = line.split(': ');
            return (
              <div key={index} className="modal-info-item time-info">
                <div className="info-label">{label}:</div>
                <div className="info-value">{value}</div>
              </div>
            );
          })}
        </div>
      );
    }
    return <pre className="modal-text">{content}</pre>;
  };

  const renderStatusDivForDonate = (statusCode) => {
    switch (statusCode) {
      case 1:
        return <div className="bg-yellow-500 text-white px-2 py-1 rounded font-semibold">Đang chờ duyệt</div>;
      case 2:
        return <div className="bg-blue-500 text-white px-2 py-1 rounded font-semibold">Trong giai đoạn hiến máu</div>;
      case 3:
        return <div className="bg-green-500 text-white px-2 py-1 rounded font-semibold">Đã được hoàn tất</div>;
      case 4:
        return <div className="bg-red-600 text-white px-2 py-1 rounded font-semibold">Đã bị từ chối</div>;
      case 5:
        return <div className="bg-red-400 text-white px-2 py-1 rounded font-semibold">Đã bị hủy đơn</div>;
      default:
        return <div className="bg-gray-400 text-white px-2 py-1 rounded font-semibold">Không xác định</div>;
    }
  };
  const renderStatusDivForReceive = (statusCode) => {
    switch (statusCode) {
      case 1:
        return <div className="bg-yellow-500 text-white px-2 py-1 rounded font-semibold">Đang chờ duyệt</div>;
      case 2:
        return <div className="bg-blue-500 text-white px-2 py-1 rounded font-semibold">Giai đoạn vận chuyển máu</div>;
      case 3:
        return <div className="bg-green-500 text-white px-2 py-1 rounded font-semibold">Đã được hoàn tất</div>;
      case 4:
        return <div className="bg-red-600 text-white px-2 py-1 rounded font-semibold">Đã bị từ chối</div>;
      case 5:
        return <div className="bg-red-400 text-white px-2 py-1 rounded font-semibold">Đã bị hủy đơn</div>;
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

  const formatBloodType = (bloodType) => {
    if (!bloodType || bloodType === '' || bloodType === null) {
      return <span className="text-gray-500 italic">Chưa biết</span>;
    }
    return <span className="font-semibold text-blue-600">{bloodType}</span>;
  }

  const formatDonationAmount = (amount) => {
    if (!amount || amount === 0 || amount === null) {
      return <span className="text-gray-500 italic">Chưa biết</span>;
    }
    return <span className="font-semibold text-green-600">{amount} ml</span>;
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
      <h2 className="order-title">Xem Lịch Sử Các Đơn Và Các Yêu Cầu</h2>
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
          <table className="order-table order-table-donation">
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Họ tên</th>
                <th>Ngày tạo</th>
                <th>Ngày hiến</th>
                <th>Khung giờ hiến</th>
                <th>Phòng khám</th>
                <th>Trạng thái</th>
                <th>Loại máu</th>
                <th>Lượng máu (ml)</th>
                <th>Lý do bị hủy</th>
              </tr>
            </thead>
            <tbody>
              {listOrderDonateHistory.map((item, idx) => (
                <tr key={item.id}>
                  <td>{item.orderDonationId}</td>
                  <td>{item.fullName}</td>
                  <td>{item.createDate ? formatDate(item.createDate) : <span className="text-gray-400">-</span>}</td>
                  <td>{item.appointmentDate ? formatDate(item.appointmentDate) : <span className="text-gray-400">-</span>}</td>
                  <td>{item.appointmentTime || <span className="text-gray-400">-</span>}</td>
                  <td>{item.clinicName || <span className="text-gray-400">-</span>}</td>
                  <td id='status-row'>
                    <div className='status-code'>
                      {renderStatusDivForDonate(item.statusCode)}
                    </div>
                  </td>
                  <td>{formatBloodType(item.bloodType)}</td>
                  <td>{formatDonationAmount(item.donationAmount)}</td>
                  <td>{item.reason || <span className="text-gray-400">-</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {activeTab === 'receive' && (
          <table className="order-table order-table-receive">
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Họ tên</th>
                <th>Loại máu</th>
                <th>Lượng máu(ml)</th>
                <th>Thông tin người nhận</th>
                <th>Loại đơn</th>
                <th>Trạng thái</th>
                <th>Lý do bị hủy</th>
                <th>Mục thời gian</th>
              </tr>
            </thead>
            <tbody>
              {listOrderReceiveHistory.map((item, idx) => (
                <tr key={item.id}>
                  <td>{item.orderReceivingId}</td>
                  <td>{item.fullName}</td>
                  <td>{formatBloodType(item.bloodType)}</td>
                  <td>{formatDonationAmount(item.amountBloodMl)}</td>
                  <td>
                    <button
                      className="info-btn recipient-info-btn"
                      onClick={() => {
                        const info = `Số điện thoại: ${item.phone || 'Chưa có'}\nCCCD: ${item.cccdNumber || 'Chưa có'}\nĐịa chỉ: ${item.address || 'Chưa có'}\nLý do: ${item.userReason || 'Chưa có'}`;
                        openModal('Thông tin người nhận', info);
                      }}
                    >
                      Xem thông tin
                    </button>
                  </td>
                  <td>
                    {item.type === 'normal' ?
                      <span className='bg-green-100 text-green-700 px-2 py-1 rounded-full'>Bình thường</span>
                      :
                      <span className='bg-red-100 text-red-700 px-2 py-1 rounded-full'>Khẩn cấp</span>
                    }
                  </td>
                  <td id='status-row'>
                    <div className='status-code' >
                      {renderStatusDivForReceive(item.status)}
                    </div>
                  </td>
                  <td>{item.cancelReason || <span className="text-gray-400">-</span>}</td>
                  <td>
                    <button
                      className="info-btn time-info-btn"
                      onClick={() => {
                        const createDate = item.createDate ? formatDate(item.createDate) : 'Chưa có';
                        const estimateDate = item.estimateDate ? formatDate(item.estimateDate) : 'Chưa có';
                        const doneDate = item.doneDate ? formatDate(item.doneDate) : 'Chưa hoàn tất';
                        const info = `Ngày tạo: ${createDate}\nNgày dự kiến: ${estimateDate}\nNgày hoàn tất: ${doneDate}`;
                        openModal('Thông tin thời gian', info);
                      }}
                    >
                      Xem thời gian
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className={`modal-header ${modalContent.title === 'Thông tin thời gian' ? 'time-info' : 'recipient-info'}`}>
              <h3 className="modal-title">{modalContent.title}</h3>
              <button className="modal-close-btn" onClick={closeModal}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              {renderModalContent(modalContent.title, modalContent.content)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory; 