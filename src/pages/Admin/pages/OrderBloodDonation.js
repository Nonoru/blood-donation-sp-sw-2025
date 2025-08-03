import React, { useState, useEffect } from 'react';
import * as StaffApi from '../services/StaffApi'
import { toast } from 'react-toastify';
import '../styles/OrderBloodDonationOriginal.scss';

function OrderBloodDonation() {
  const [moreInfo, setMoreInfo] = useState(false);
  const [orderInfo, setOrderInfo] = useState([]);

  // Format date from yyyy-mm-dd to dd/mm/yyyy
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    // If already in dd/mm/yyyy format, return as is
    if (dateString.includes('/')) {
      return dateString;
    }
    
    // Convert from yyyy-mm-dd to dd/mm/yyyy
    const parts = dateString.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    
    return dateString;
  };

  // Group data by date and time
  const groupByDateAndTime = (data) => {
    const grouped = {};
    data.forEach(item => {
      const dateTime = `${item.orderDate}_${item.orderTime}`;
      if (!grouped[dateTime]) {
        grouped[dateTime] = {
          date: formatDate(item.orderDate),
          time: item.orderTime,
          orders: []
        };
      }
      grouped[dateTime].orders.push(item);
    });
    
    // Sort by date and time
    const sortedGroups = Object.values(grouped).sort((a, b) => {
      // Convert dd/mm/yyyy back to yyyy-mm-dd for sorting
      const dateA = new Date(a.date.split('/').reverse().join('-') + ' ' + a.time);
      const dateB = new Date(b.date.split('/').reverse().join('-') + ' ' + b.time);
      return dateA - dateB;
    });
    
    return sortedGroups;
  };

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

  const [orderDateInfo, setOrderDateInfo] = useState([]);
  const getOrderDateDonation = async () => {
    try {
      const res = await StaffApi.getOrderDates();
      if (res.data.code === 200) {
        const orderDateList = [];
        res.data.data.forEach(i => {
          orderDateList.push(i)
        });
        setOrderDateInfo(orderDateList);
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

  const [cancelReasonInfo, setCancelReasonInfo] = useState([]);
  const getCancelReason = async () => {
    try {
      const res = await StaffApi.getListCancelReason();
      if (res.data.code === 200) {
        const list = [];
        res.data.data.forEach(i => {
          // Chỉ lấy những lý do có cancellationReasonType là "Donation_Pending"
          if (i.cancellationReasonType === "Donation_Pending" || i.cancellationReasonType === "Other") {
            list.push(i)
          }
        });
        setCancelReasonInfo(list);
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

  useEffect(() => {
    getList();
    getOrderDateDonation();
    getCancelReason();
  }, []);

  const [chooseUserInfo, setChooseUserInfo] = useState({})
  const watchUserInfo = (info) => {
    setMoreInfo(prev => !prev);
    setChooseUserInfo(info)
  }

  const [stateAcceptBtn, setStateAcceptBtn] = useState(false);
  const acceptUserToInfo = (info) => {
    setStateAcceptBtn(prev => !prev)
    setChooseUserInfo(info)
  }

  
  const acceptOrder = async (e, id) => {
    e.preventDefault()
    try {
      const response = await StaffApi.acceptOrder(id);

      if (response.data.code === 200) {
        toast.success(response.data.message, { className: 'my-toast' })
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
    setFormRefuse(prev => ({
      ...prev,
      orderDonationId: info.orderDonationId
    }))
  }

  const [formRefuse, setFormRefuse] = useState({
    orderDonationId: '',
    cancelReasonId: '',
    otherReason: ''
  });
  const [showOtherReasonInput, setShowOtherReasonInput] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showAllData, setShowAllData] = useState(true);

  const handleDateChange = (e) => {
    const value = e.target.value;
    setSelectedDate(value);
    setShowAllData(value === 'all');
  };

  const handleTimeChange = (e) => {
    const value = e.target.value;
    setSelectedTime(value);
  };

  const handleReasonChange = (e) => {
    const value = e.target.value;
    
    // Tìm cancelReasonId từ cancelReasonInfo
    const selectedReason = cancelReasonInfo.find(item => item.cancellationReasonName === value);
    const cancelReasonId = selectedReason ? selectedReason.cancellationReasonId : '';
    
    setFormRefuse(prev => ({
      ...prev,
      cancelReasonId: cancelReasonId,
      otherReason: ''
    }));
    
    // Kiểm tra nếu chọn "Mục khác" (cancelReasonId = 1)
    if (cancelReasonId === 1) {
      setShowOtherReasonInput(true);
    } else {
      setShowOtherReasonInput(false);
    }
  };

  const handleOtherReasonChange = (e) => {
    const value = e.target.value;
    setFormRefuse(prev => ({
      ...prev,
      otherReason: value
    }));
  };

  const getFilteredData = () => {
    if (showAllData) {
      return groupedData;
    }
    
    const filtered = groupedData.filter(group => {
      const matchesDate = selectedDate === 'all' || group.date === selectedDate;
      const matchesTime = selectedTime === 'all' || group.time === selectedTime;
      return matchesDate && matchesTime;
    });
    
    return filtered;
  };

  // Get unique dates from orderDateInfo
  const getUniqueDates = () => {
    const dates = orderDateInfo.map(item => formatDate(item.orderDate));
    return [...new Set(dates)].sort((a, b) => {
      const dateA = new Date(a.split('/').reverse().join('-'));
      const dateB = new Date(b.split('/').reverse().join('-'));
      return dateA - dateB;
    });
  };

  // Get unique times for selected date
  const getUniqueTimes = () => {
    if (selectedDate === 'all') {
      const times = orderDateInfo.map(item => item.orderTime);
      return [...new Set(times)].sort();
    }
    
    const times = orderDateInfo
      .filter(item => formatDate(item.orderDate) === selectedDate)
      .map(item => item.orderTime);
    return [...new Set(times)].sort();
  };

  const refuseOrder = async (e) => {
    e.preventDefault();
    // Validation
    if (!formRefuse.cancelReasonId) {
      toast.error("Vui lòng chọn lý do loại đơn", { className: 'my-toast' });
      return;
    }
    
    if (formRefuse.cancelReasonId === 1 && !formRefuse.otherReason.trim()) {
      toast.error("Vui lòng nhập lý do cụ thể", { className: 'my-toast' });
      return;
    }
    
    try {
      const response = await StaffApi.refuseOrder(formRefuse);

      if (response.data.code === 200) {
        toast.success(response.data.message, { className: 'my-toast' })
        getList();
        setStateRefuseBtn(prev => !prev)
        setFormRefuse({
          orderDonationId: '',
          cancelReasonId: '',
          otherReason: ''
        })
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

  const groupedData = groupByDateAndTime(orderInfo);

  return (
    <div className="order-blood-donation-page">

      {/* More Info Modal */}
      <div className={`order-more-info ${moreInfo ? 'show' : 'hidden'}`}>
        <h2>THÔNG TIN NGƯỜI HIẾN MÁU</h2>
        <div className="info-grid">
          <div className="info-item">
            <span className="label">Mã đơn</span>
            <span className="value">{chooseUserInfo.orderDonationId}</span>
          </div>
          <div className="info-item">
            <span className="label">Tạo bởi</span>
            <span className="value">{chooseUserInfo.createByUsername}</span>
          </div>
          <div className="info-item">
            <span className="label">Họ tên</span>
            <span className="value">{chooseUserInfo.fullName}</span>
          </div>
          <div className="info-item">
            <span className="label">Giới tính</span>
            <span className="value">{chooseUserInfo.gender}</span>
          </div>
          <div className="info-item">
            <span className="label">Ngày sinh</span>
            <span className="value">{formatDate(chooseUserInfo.dob)}</span>
          </div>
          <div className="info-item">
            <span className="label">Địa chỉ</span>
            <span className="value">{chooseUserInfo.address}</span>
          </div>
          <div className="info-item">
            <span className="label">Ngày tạo</span>
            <span className="value">{formatDate(chooseUserInfo.createDate)}</span>
          </div>
        </div>
        <button type="none" className="close-btn" onClick={e => setMoreInfo(!moreInfo)}></button>
      </div>

      {/* Accept Modal */}
      <div className={`${stateAcceptBtn ? 'show' : 'hidden'} accept-container`}>
        <h2>Nhận đơn</h2>
        <div className="form-accept">
          <span className="text-w">Bạn có chắc chắn muốn nhận đơn yêu cầu xét nghiệm máu này?</span>
          <span className="text-w">Mã đơn đặt lịch: {chooseUserInfo.orderDonationId}</span>
          <span className="text-w">Tên người hiến máu: {chooseUserInfo.fullName}</span>
          <span className="text-w">Số điện thoại: {chooseUserInfo.phone}</span>
          <span className="text-w">CCCD: {chooseUserInfo.cccdNumber}</span>
          <button type="none" onClick={e => acceptOrder(e, chooseUserInfo.orderDonationId)}>Nhận</button>
        </div>
        <button type="none" className="close-btn" onClick={e => setStateAcceptBtn(!stateAcceptBtn)}>
        </button>
      </div>

      {/* Refuse Modal */}
      <div className={`${stateRefuseBtn ? 'show' : 'hidden'} refuse-container`}>
        <h2>Loại đơn</h2>
        <div className="form-accept">
          <span className="text-w">Bạn có chắc chắn muốn loại đơn yêu cầu xét nghiệm máu này?</span>
          <span className="text-w">Mã đơn: {chooseUserInfo.orderDonationId}</span>
          <span className="text-w">Tên khách hàng: {chooseUserInfo.fullName}</span>
          <span className="text-w">Số điện thoại: {chooseUserInfo.phone}</span>
          <span className="text-w">CCCD: {chooseUserInfo.cccdNumber}</span>
          <form onSubmit={refuseOrder}>
            <label>
              Chọn lý do loại đơn
              <select required onChange={handleReasonChange}>
                <option value="">-- Chọn lý do --</option>
                {cancelReasonInfo.map((reasonItem, index) => (
                  <option key={index} value={reasonItem.cancellationReasonName}>
                    {reasonItem.cancellationReasonName}
                  </option>
                ))}
              </select>
            </label>
            
            {showOtherReasonInput && (
              <label>
                Nhập lý do cụ thể
                <input 
                  type="text"
                  value={formRefuse.otherReason}
                  onChange={handleOtherReasonChange}
                  placeholder="Nhập lý do cụ thể..."
                  required
                />
              </label>
            )}
            
            <button type="submit">Loại</button>
          </form>
        </div>
        <button type="none" className="close-btn" onClick={e => {
          setStateRefuseBtn(!stateRefuseBtn);
          setFormRefuse({
            orderDonationId: '',
            cancelReasonId: '',
            otherReason: ''
          });
          setShowOtherReasonInput(false);
        }}>
        </button>
      </div>

      {/* Main Content */}
      <div className={`schedule-content ${moreInfo || stateAcceptBtn || stateRefuseBtn ? 'prevent-ui' : 'normal-ui'}`}>
        <h3 className="main-title">Danh sách đơn đặt lịch xét nghiệm máu</h3>
        
        {/* Date Time Filter */}
        <div className="date-time-filter">
          <div className="filter-row">
            <div className="filter-group">
              <label htmlFor="dateSelect">Chọn ngày:</label>
              <select 
                id="dateSelect"
                value={selectedDate}
                onChange={handleDateChange}
                className="date-select"
              >
                <option value="all">Tất cả ngày</option>
                {getUniqueDates().map((date, index) => (
                  <option key={index} value={date}>
                    📅 {date}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label htmlFor="timeSelect">Chọn giờ:</label>
              <select 
                id="timeSelect"
                value={selectedTime}
                onChange={handleTimeChange}
                className="time-select"
              >
                <option value="all">Tất cả giờ</option>
                {getUniqueTimes().map((time, index) => (
                  <option key={index} value={time}>
                    🕐 {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {getFilteredData().length === 0 ? (
          <div className="no-data">
            <p>Chưa có đơn đăng ký nào</p>
          </div>
        ) : (
          <div className="date-time-groups">
            {getFilteredData().map((group, groupIndex) => (
              <div key={groupIndex} className="date-time-group">
                <div className="date-time-header">
                  <h4>📅 Ngày: {group.date} - 🕐 Thời gian: {group.time}</h4>
                  <span className="order-count">
                    {group.orders.length} đơn đăng ký
                  </span>
                </div>
                
                <div className="orders-table-container">
                  <table className="orders-table">
                    <thead>
                      <tr>
                        <th>Mã đơn</th>
                        <th>Họ tên</th>
                        <th>Số điện thoại</th>
                        <th>CCCD</th>
                        <th>Xem thêm</th>
                        <th>Trạng thái</th>
                        <th>Nhận</th>
                        <th>Hủy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.orders.map((item, itemIndex) => (
                        <tr key={itemIndex}>
                          <td>{item.orderDonationId}</td>
                          <td>{item.fullName}</td>
                          <td>{item.phone}</td>
                          <td>{item.cccdNumber}</td>
                          <td>
                            <button 
                              className="btn-view-more"
                              onClick={() => watchUserInfo(item)}
                            >
                              Thông tin người hiến máu
                            </button>
                          </td>
                          <td>
                            <span className="status-pending">Đang chờ duyệt</span>
                          </td>
                          <td>
                            <button 
                              className="btn-accept" 
                              onClick={e => acceptUserToInfo(item)}
                            >
                              Nhận
                            </button>
                          </td>
                          <td>
                            <button 
                              className="btn-reject" 
                              onClick={e => refuseUserToInfo(item)}
                            >
                              Hủy
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderBloodDonation;