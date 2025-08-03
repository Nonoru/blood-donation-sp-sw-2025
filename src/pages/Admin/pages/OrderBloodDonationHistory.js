import React, { useState, useEffect } from 'react';
import * as StaffApi from '../services/StaffApi'
import { toast } from 'react-toastify';
import '../styles/OrderBloodDonationHistory.scss';

function OrderBloodDonationHistory() {
  const [orderInfo, setOrderInfo] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('all'); // New state for filter

  const getList = async () => {
    const execute = async () => {
      try {
        const res = await StaffApi.getAllOrderDonate();
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

  // Format time
  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    return timeString.substring(0, 5); // Get HH:mm format
  };

  // Handle filter button click
  const handleFilterClick = (status) => {
    setSelectedStatus(status);
  };

  // Check if table should be shown
  const shouldShowTable = (status) => {
    return selectedStatus === 'all' || selectedStatus === status;
  };

  // Render filter buttons
  const renderFilterButtons = () => {
    const filterOptions = [
      { value: 'all', label: 'Tất cả', color: 'bg-gray-500' },
      { value: 1, label: 'Đang chờ duyệt', color: 'bg-yellow-500' },
      { value: 2, label: 'Trong giai đoạn hiến máu', color: 'bg-blue-500' },
      { value: 3, label: 'Đã được hoàn tất', color: 'bg-green-500' },
      { value: 4, label: 'Đã bị từ chối', color: 'bg-red-600' },
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

  // Render table for status 1 and 2
  const renderBasicTable = (orders, status) => {
    const headers = ["Mã đơn", "Họ tên", "CCCD", "Số điện thoại", "Ngày hẹn", "Giờ hẹn", "Ngày tạo", "Trạng thái"];

    if (!shouldShowTable(status)) return null;

    return (
      <div className="table-section">
        <h3 className="section-title">
          {status === 1 ? 'Đơn Chờ Xác Nhận' : 'Đơn Đã Xác Nhận'}
        </h3>
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
                <tr key={order.orderDonationId}>
                  <td>{order.orderDonationId}</td>
                  <td>{order.fullName}</td>
                  <td>{order.cccdNumber}</td>
                  <td>{order.phone}</td>
                  <td>{formatDate(order.orderDate)}</td>
                  <td>{formatTime(order.orderTime)}</td>
                  <td>{formatDate(order.createDate)}</td>
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
  const renderCompletedTable = (orders) => {
    const headers = ["Mã đơn", "Họ tên", "CCCD", "Số điện thoại", "Ngày hẹn", "Giờ hẹn", "Ngày tạo", "Nhóm máu", "Lượng máu (ml)", "Trạng thái"];

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
                <tr key={order.orderDonationId}>
                  <td>{order.orderDonationId}</td>
                  <td>{order.fullName}</td>
                  <td>{order.cccdNumber}</td>
                  <td>{order.phone}</td>
                  <td>{formatDate(order.orderDate)}</td>
                  <td>{formatTime(order.orderTime)}</td>
                  <td>{formatDate(order.createDate)}</td>
                  <td>{order.bloodType || 'Chưa biết'}</td>
                  <td>{order.amountBloodDonation.toFixed(1)}</td>
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

  // Render table for status 4 and 5 (rejected/cancelled)
  const renderRejectedCancelledTable = (orders, status) => {
    // Different headers for status 4 vs status 5
    const headers = status === 4
      ? ["Mã đơn", "Họ tên", "CCCD", "Số điện thoại", "Ngày hẹn", "Giờ hẹn", "Ngày tạo", "Lý do", "Trạng thái"]
      : ["Mã đơn", "Họ tên", "CCCD", "Số điện thoại", "Ngày hẹn", "Giờ hẹn", "Ngày tạo", "Nhóm máu", "Lý do", "Trạng thái"];

    if (!shouldShowTable(status)) return null;

    return (
      <div className={`table-section ${status === 4 ? 'status-4-table' : 'status-5-table'}`}>
        <h3 className="section-title">
          {status === 4 ? 'Đơn Đã Từ Chối' : 'Đơn Đã Hủy'}
        </h3>
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
                <tr key={order.orderDonationId}>
                  <td>{order.orderDonationId}</td>
                  <td>{order.fullName}</td>
                  <td>{order.cccdNumber}</td>
                  <td>{order.phone}</td>
                  <td>{formatDate(order.orderDate)}</td>
                  <td>{formatTime(order.orderTime)}</td>
                  <td>{formatDate(order.createDate)}</td>
                  {status === 5 && <td>{order.bloodType || 'Chưa biết'}</td>}
                  <td>{order.cancelReason || 'Không có'}</td>
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
    <div className="order-blood-donation-page">
      <div className="page-header">
        <h2>Lịch Sử Đơn Hiến Máu</h2>
      </div>

      {/* Filter Buttons */}
      {renderFilterButtons()}

      <div className="orders-container">
        {/* Status 1: Chờ xác nhận */}
        {renderBasicTable(getOrdersByStatus(1), 1)}

        {/* Status 2: Đã xác nhận */}
        {renderBasicTable(getOrdersByStatus(2), 2)}

        {/* Status 3: Đã hoàn tất */}
        {renderCompletedTable(getOrdersByStatus(3))}

        {/* Status 4: Đã từ chối */}
        {renderRejectedCancelledTable(getOrdersByStatus(4), 4)}

        {/* Status 5: Đã hủy */}
        {renderRejectedCancelledTable(getOrdersByStatus(5), 5)}
      </div>
    </div>
  );
}

export default OrderBloodDonationHistory;