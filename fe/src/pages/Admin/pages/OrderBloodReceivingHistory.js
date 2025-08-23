import React, { useState, useEffect } from 'react';
import * as StaffApi from '../services/StaffApi'
import { toast } from 'react-toastify';
import '../styles/OrderBloodReceivingHistory.scss';

function OrderBloodReceivingHistory() {
  const [orderInfo, setOrderInfo] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('all'); // New state for filter
  const [selectedUser, setSelectedUser] = useState(null); // State for modal
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [showBloodModal, setShowBloodModal] = useState(false); // State for blood modal
  const [selectedBloodInfo, setSelectedBloodInfo] = useState(null); // State for blood info

  const getList = async () => {
    const execute = async () => {
      try {
        const res = await StaffApi.getAllOrderReceive();
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

  const renderStatusDiv = (statusCode) => {
    switch (statusCode) {
      case 1:
        return <div className="bg-yellow-500 text-white px-2 py-1 rounded font-semibold">Đang chờ duyệt</div>;
      case 2:
        return <div className="bg-blue-500 text-white px-2 py-1 rounded font-semibold">Giai đoạn vận chuyển máu</div>;
      case 3:
        return <div className="bg-green-500 text-white px-2 py-1 rounded font-semibold">Đã hoàn tất</div>;
      case 4:
        return <div className="bg-red-600 text-white px-2 py-1 rounded font-semibold">Đã bị từ chối</div>;
      case 5:
        return <div className="bg-red-400 text-white px-2 py-1 rounded font-semibold">Đã bị hủy đơn</div>;
      default:
        return <div className="bg-gray-400 text-white px-2 py-1 rounded font-semibold">Không xác định</div>;
    }
  };

  // Render order type
  const renderOrderType = (type) => {
    if (type === 'urgent') {
      return <div className="order-type urgent text-white px-2 py-1 rounded font-semibold">KHẨN CẤP</div>;
    } else {
      return <div className="order-type normal text-white px-2 py-1 rounded font-semibold">BÌNH THƯỜNG</div>;
    }
  };

  // Filter orders by status
  const getOrdersByStatus = (status) => {
    return orderInfo.filter(order => order.status === status);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  // Handle filter button click
  const handleFilterClick = (status) => {
    setSelectedStatus(status);
  };

  // Check if table should be shown
  const shouldShowTable = (status) => {
    return selectedStatus === 'all' || selectedStatus === status;
  };

  // Handle show user info modal
  const handleShowUserInfo = (order) => {
    setSelectedUser(order);
    setShowModal(true);
  };

  // Handle show blood info modal
  const handleShowBloodInfo = (order) => {
    setSelectedBloodInfo(order);
    setShowBloodModal(true);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  // Handle close blood modal
  const handleCloseBloodModal = () => {
    setShowBloodModal(false);
    setSelectedBloodInfo(null);
  };

  // Render user info button
  const renderUserInfoButton = (order) => {
    return (
      <button
        className="user-info-btn"
        onClick={() => handleShowUserInfo(order)}
      >
        Xem thông tin
      </button>
    );
  };

  // Render blood info button
  const renderBloodInfoButton = (order) => {
    return (
      <button
        className="blood-info-btn"
        onClick={() => handleShowBloodInfo(order)}
      >
        Xem thông tin máu
      </button>
    );
  };

  // Render user info modal
  const renderUserInfoModal = () => {
    if (!showModal || !selectedUser) return null;

    return (
      <div className="modal-overlay" onClick={handleCloseModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header-for-user">
            <h3>Thông tin người nhận</h3>
            <button className="close-btn" onClick={handleCloseModal}>
              ✕
            </button>
          </div>
          <div className="modal-body">
            <div className="user-info-grid">
              <div className="info-item">
                <strong>Họ và tên:</strong>
                <span>{selectedUser.fullName || 'N/A'}</span>
              </div>
              <div className="info-item">
                <strong>CCCD:</strong>
                <span>{selectedUser.cccdNumber || 'N/A'}</span>
              </div>
              <div className="info-item">
                <strong>Số điện thoại:</strong>
                <span>{selectedUser.phone || 'N/A'}</span>
              </div>
              <div className="info-item">
                <strong>Địa chỉ:</strong>
                <span>{selectedUser.address || 'N/A'}</span>
              </div>
              <div className="info-item">
                <strong>Lý do:</strong>
                <span>{selectedUser.userReason || 'N/A'}</span>
              </div>
            
              <div className="info-item">
                <strong>Tạo bởi:</strong>
                <span>{selectedUser.createdByUsername || 'N/A'}</span>
              </div>
              <div className="info-item">
                <strong>Ngày tạo:</strong>
                <span>{formatDate(selectedUser.createDate)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render blood info modal
  const renderBloodInfoModal = () => {
    if (!showBloodModal || !selectedBloodInfo) return null;

    // Calculate total blood amount from blood bags
    const totalBloodAmount = selectedBloodInfo.bloodBagResponses 
      ? selectedBloodInfo.bloodBagResponses.reduce((total, bag) => total + bag.volumeMl, 0)
      : selectedBloodInfo.amountBloodMl || 0;

    // Get total number of blood bags
    const totalBags = selectedBloodInfo.bloodBagResponses ? selectedBloodInfo.bloodBagResponses.length : 0;

    return (
      <div className="modal-overlay" onClick={handleCloseBloodModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header-for-blood">
            <h3>Thông tin chi tiết máu</h3>
            <button className="close-btn" onClick={handleCloseBloodModal}>
              ✕
            </button>
          </div>
          <div className="modal-body">
            <div className="blood-info-summary">
              <div className="summary-item">
                <strong>Nhóm máu:</strong>
                <span>{selectedBloodInfo.bloodType || 'Chưa biết'}</span>
              </div>
              <div className="summary-item">
                <strong>Lượng máu:</strong>
                <span>{selectedBloodInfo.amountBloodMl ? selectedBloodInfo.amountBloodMl.toFixed(1) + ' ml' : 'N/A'}</span>
              </div>
              <div className="summary-item">
                <strong>Tổng số túi máu:</strong>
                <span>{totalBags} túi</span>
              </div>
            </div>

            {/* Blood Bags Section */}
            {selectedBloodInfo.bloodBagResponses && selectedBloodInfo.bloodBagResponses.length > 0 && (
              <div className="blood-bags-section">
                <h4>Danh sách túi máu</h4>
                <div className="blood-bags-container">
                  {selectedBloodInfo.bloodBagResponses.map((bag, index) => (
                    <div key={bag.bloodBagId} className="blood-bag-item">
                      <div className="bag-header">
                        <span className="bag-id">Túi #{bag.bloodBagId}</span>
                        <span className="bag-number">#{index + 1}</span>
                      </div>
                      <div className="bag-details">
                        <div className="bag-detail-item">
                          <strong>Nhóm máu:</strong>
                          <span className="blood-type-badge">{bag.bloodType}</span>
                        </div>
                        <div className="bag-detail-item">
                          <strong>Thể tích:</strong>
                          <span>{bag.volumeMl.toFixed(1)} ml</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render filter buttons
  const renderFilterButtons = () => {
    const filterOptions = [
      { value: 'all', label: 'Tất cả', color: 'bg-gray-500' },
      { value: 1, label: 'Chờ duyệt', color: 'bg-yellow-500' },
      { value: 2, label: 'Đang vận chuyển', color: 'bg-blue-500' },
      { value: 3, label: 'Đã hoàn tất', color: 'bg-green-500' },
      { value: 4, label: 'Đã bị từ chối đơn', color: 'bg-red-600' },
      { value: 5, label: 'Đã bị hủy đơn', color: 'bg-red-400' }
    ];

    return (
      <div className="filter-buttons">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            className={`filter-btn ${option.color} ${selectedStatus === option.value ? 'active' : ''}`}
            onClick={() => handleFilterClick(option.value)}
          >
            {option.label}
            <span className="count-badge">
              {option.value === 'all' ? orderInfo.length : getOrdersByStatus(option.value).length}
            </span>
          </button>
        ))}
      </div>
    );
  };

  // Render table for status 1
  const renderStatus1Table = (orders) => {
    const headers = ["Mã", "Họ và tên", "Thông tin", "Ngày tạo", "Nhóm máu", "Lượng máu (ml)", "Loại đơn", "Trạng thái"];

    if (!shouldShowTable(1)) return null;

    return (
      <div className="table-section">
        <h3 className="section-title">Đơn Chờ Xác Duyệt</h3>
        <div className="table-container">
          <table className="order-table">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderReceivingId}>
                  <td>{order.orderReceivingId}</td>
                  <td>{order.fullName}</td>
                  <td>{renderUserInfoButton(order)}</td>
                  <td>{formatDate(order.createDate)}</td>
                  <td>{order.bloodType || 'Chưa biết'}</td>
                  <td>{order.amountBloodMl ? order.amountBloodMl.toFixed(1) : 'N/A'}</td>
                  <td>{renderOrderType(order.type)}</td>
                  <td>{renderStatusDiv(order.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && (
            <div className="no-data">Không có đơn nào</div>
          )}
        </div>
      </div>
    );
  };

  // Render table for status 2
  const renderStatus2Table = (orders) => {
    const headers = ["Mã", "Họ và tên", "Thông tin", "Ngày tạo", "Ngày dự kiến", "Thông tin máu", "Loại đơn", "Trạng thái"];

    if (!shouldShowTable(2)) return null;

    return (
      <div className="table-section">
        <h3 className="section-title">Đơn Đang Vận Chuyển</h3>
        <div className="table-container">
          <table className="order-table">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderReceivingId}>
                  <td>{order.orderReceivingId}</td>
                  <td>{order.fullName}</td>
                  <td>{renderUserInfoButton(order)}</td>
                  <td>{formatDate(order.createDate)}</td>
                  <td>{formatDate(order.estimateDate)}</td>
                  <td>{renderBloodInfoButton(order)}</td>
                  <td>{renderOrderType(order.type)}</td>
                  <td>{renderStatusDiv(order.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && (
            <div className="no-data">Không có đơn nào</div>
          )}
        </div>
      </div>
    );
  };

  // Render table for status 3 (completed)
  const renderStatus3Table = (orders) => {
    const headers = ["Mã", "Họ và tên", "Thông tin", "Ngày tạo", "Ngày dự kiến", "Ngày hoàn tất", "Thông tin máu", "Loại đơn", "Trạng thái"];

    if (!shouldShowTable(3)) return null;

    return (
      <div className="table-section">
        <h3 className="section-title">Đơn Đã Hoàn Tất</h3>
        <div className="table-container">
          <table className="order-table">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderReceivingId}>
                  <td>{order.orderReceivingId}</td>
                  <td>{order.fullName}</td>
                  <td>{renderUserInfoButton(order)}</td>
                  <td>{formatDate(order.createDate)}</td>
                  <td>{formatDate(order.estimateDate)}</td>
                  <td>{formatDate(order.doneDate)}</td>
                  <td>{renderBloodInfoButton(order)}</td>
                  <td>{renderOrderType(order.type)}</td>
                  <td>{renderStatusDiv(order.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && (
            <div className="no-data">Không có đơn nào</div>
          )}
        </div>
      </div>
    );
  };

  // Render table for status 4 (rejected)
  const renderStatus4Table = (orders) => {
    const headers = ["Mã", "Họ và tên", "Thông tin", "Ngày tạo", "Nhóm máu", "Lượng máu (ml)", "Lý do từ chối", "Loại đơn", "Trạng thái"];

    if (!shouldShowTable(4)) return null;

    return (
      <div className="table-section">
        <h3 className="section-title">Đơn Đã Từ Chối</h3>
        <div className="table-container">
          <table className="order-table status-4-5-table">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderReceivingId}>
                  <td>{order.orderReceivingId}</td>
                  <td>{order.fullName}</td>
                  <td>{renderUserInfoButton(order)}</td>
                  <td>{formatDate(order.createDate)}</td>
                  <td>{order.bloodType || 'Chưa biết'}</td>
                  <td>{order.amountBloodMl ? order.amountBloodMl.toFixed(1) : 'N/A'}</td>
                  <td>{order.cancelReason || 'Không có'}</td>
                  <td>{renderOrderType(order.type)}</td>
                  <td>{renderStatusDiv(order.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && (
            <div className="no-data">Không có đơn nào</div>
          )}
        </div>
      </div>
    );
  };

  // Render table for status 5 (cancelled)
  const renderStatus5Table = (orders) => {
    const headers = ["Mã", "Họ và tên", "Thông tin", "Ngày tạo", "Nhóm máu", "Lượng máu (ml)", "Lý do hủy", "Loại đơn", "Trạng thái"];

    if (!shouldShowTable(5)) return null;

    return (
      <div className="table-section">
        <h3 className="section-title">Đơn Đã Hủy</h3>
        <div className="table-container">
          <table className="order-table status-4-5-table">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderReceivingId}>
                  <td>{order.orderReceivingId}</td>
                  <td>{order.fullName}</td>
                  <td>{renderUserInfoButton(order)}</td>
                  <td>{formatDate(order.createDate)}</td>
                  <td>{order.bloodType || 'Chưa biết'}</td>
                  <td>{order.amountBloodMl ? order.amountBloodMl.toFixed(1) : 'N/A'}</td>
                  <td>{order.cancelReason || 'Không có'}</td>
                  <td>{renderOrderType(order.type)}</td>
                  <td>{renderStatusDiv(order.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && (
            <div className="no-data">Không có đơn nào</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="order-blood-receiving-page">
      <div className="page-header">
        <h2>Lịch Sử Đơn Nhận Máu</h2>
      </div>

      {/* Filter Buttons */}
      {renderFilterButtons()}

      <div className="orders-container">
        {/* Status 1: Chờ xác nhận */}
        {renderStatus1Table(getOrdersByStatus(1))}

        {/* Status 2: Đã xác nhận */}
        {renderStatus2Table(getOrdersByStatus(2))}

        {/* Status 3: Đã hoàn tất */}
        {renderStatus3Table(getOrdersByStatus(3))}

        {/* Status 4: Đã từ chối */}
        {renderStatus4Table(getOrdersByStatus(4))}

        {/* Status 5: Đã hủy */}
        {renderStatus5Table(getOrdersByStatus(5))}
      </div>

      {/* User Info Modal */}
      {renderUserInfoModal()}
      {renderBloodInfoModal()}
    </div>
  );
}

export default OrderBloodReceivingHistory;