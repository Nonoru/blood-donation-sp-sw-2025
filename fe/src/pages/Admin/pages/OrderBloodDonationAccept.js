import React, { useState, useEffect } from 'react';
import * as StaffApi from '../services/StaffApi'
import { toast } from 'react-toastify';
import '../styles/OrderBloodDonationOriginal.scss';

function OrderBloodDonationAccept() {

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
        const res = await StaffApi.getOrderBloodDonationAccept();
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

  const getBloodType = async () => {
    try {
      const res = await StaffApi.getBloodType();
      if (res.data.code === 200) {
        const list = [];
        res.data.data.forEach(i => {
          list.push(i);
        });
        setBloodTypeInfo(list);
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
    getBloodType();
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
    // Reset form khi mở modal
    setFormComplete({
      orderDonationId: info.orderDonationId,
      volumeMl: '',
      bloodType: '',
      expiryDate: ''
    });
  }

  const [formComplete, setFormComplete] = useState({
    orderDonationId: '',
    volumeMl: '',
    bloodType: '',
    expiryDate: ''
  });

  // State cho modal xác nhận thông tin túi máu
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmData, setConfirmData] = useState(null);

  // Handler functions for formComplete
  const handleVolumeMlChange = (e) => {
    const value = e.target.value;
    setFormComplete(prev => ({
      ...prev,
      volumeMl: value
    }));
  };

  const handleCompleteBloodTypeChange = (e) => {
    const value = e.target.value;
    setFormComplete(prev => ({
      ...prev,
      bloodType: value
    }));
  };

  const handleExpiryDateChange = (e) => {
    const value = e.target.value;
    setFormComplete(prev => ({
      ...prev,
      expiryDate: value
    }));
  };
  const acceptOrder = async (e, id) => {
    e.preventDefault()

    // Validation
    if (!formComplete.volumeMl || parseFloat(formComplete.volumeMl) < 250 || parseFloat(formComplete.volumeMl) > 650) {
      toast.error("Thể tích máu phải từ 250ml đến 650ml", { className: 'my-toast' });
      return;
    }

    if (!formComplete.bloodType) {
      toast.error("Vui lòng chọn nhóm máu", { className: 'my-toast' });
      return;
    }

    if (!formComplete.expiryDate) {
      toast.error("Vui lòng chọn ngày hết hạn", { className: 'my-toast' });
      return;
    }

    // Set bloodType to 0 if it's null or empty
    const bloodTypeValue = formComplete.bloodType || 0;

    // Hiển thị modal xác nhận thông tin túi máu
    const requestData = {
      orderDonationId: id,
      volumeMl: parseFloat(formComplete.volumeMl),
      bloodType: bloodTypeValue,
      expiryDate: formComplete.expiryDate
    };

    setConfirmData(requestData);
    setShowConfirmModal(true);
  }

  // Hàm thực hiện gửi request sau khi xác nhận
  const confirmAndSendRequest = async () => {
    try {
      const response = await StaffApi.completeOrder(confirmData);

      if (response.data.code === 200) {
        toast.success(response.data.message, { className: 'my-toast' })
        setStateAcceptBtn(prev => !prev)
        setShowConfirmModal(false)
        getList();
        // Reset form
        setFormComplete({
          orderDonationId: '',
          volumeMl: '',
          bloodType: '',
          expiryDate: ''
        });
        setConfirmData(null);
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
    otherReason: '',
    bloodType: ''
  });
  const [showOtherReasonInput, setShowOtherReasonInput] = useState(false);
  const [showBloodTypeSelect, setShowBloodTypeSelect] = useState(false);
  const [cancelReasonInfo, setCancelReasonInfo] = useState([]);

  // Blood type options (sẽ được thay thế bằng data từ database sau này)
  const [bloodTypeInfo, setBloodTypeInfo] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showAllData, setShowAllData] = useState(true);
  const [orderDateInfo, setOrderDateInfo] = useState([]);

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
    const reasonType = selectedReason ? selectedReason.cancellationReasonType : '';

    setFormRefuse(prev => ({
      ...prev,
      cancelReasonId: cancelReasonId,
      otherReason: '',
      bloodType: ''
    }));

    // Reset tất cả input fields
    setShowOtherReasonInput(false);
    setShowBloodTypeSelect(false);

    // Kiểm tra loại lý do để hiển thị input phù hợp
    if (reasonType === "Other") {
      setShowOtherReasonInput(true);
    } else if (reasonType === "Donation_Processing_Type_1") {
      setShowBloodTypeSelect(true);
    }
  };

  const handleOtherReasonChange = (e) => {
    const value = e.target.value;
    setFormRefuse(prev => ({
      ...prev,
      otherReason: value
    }));
  };

  const handleBloodTypeChange = (e) => {
    const value = e.target.value;
    setFormRefuse(prev => ({
      ...prev,
      bloodType: value
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

  const getCancelReason = async () => {
    try {
      const res = await StaffApi.getListCancelReason();
      if (res.data.code === 200) {
        const list = [];
        res.data.data.forEach(i => {
          if (i.cancellationReasonType === "Other" ||
            i.cancellationReasonType === "Donation_Processing_Type_1" ||
            i.cancellationReasonType === "Donation_Processing_Type_2") {
            list.push(i);
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

  const refuseOrder = async (e) => {
    e.preventDefault();

    // Validation
    if (!formRefuse.cancelReasonId) {
      toast.error("Vui lòng chọn lý do hủy đơn", { className: 'my-toast' });
      return;
    }

    // Kiểm tra lý do được chọn
    const selectedReason = cancelReasonInfo.find(item => item.cancellationReasonId === formRefuse.cancelReasonId);
    const reasonType = selectedReason ? selectedReason.cancellationReasonType : '';

    if (reasonType === "Other" && !formRefuse.otherReason.trim()) {
      toast.error("Vui lòng nhập lý do cụ thể", { className: 'my-toast' });
      return;
    }

    if (reasonType === "Donation_Processing_Type_1" && !formRefuse.bloodType) {
      toast.error("Vui lòng chọn nhóm máu", { className: 'my-toast' });
      return;
    }
    // Set bloodType to 0 if it's null or empty
    if (!formRefuse.bloodType) {
      formRefuse.bloodType = 0;
    }
    try {
      const response = await StaffApi.cancelOrder(formRefuse);

      if (response.data.code === 200) {
        toast.success(response.data.message, { className: 'my-toast' })
        getList();
        setStateRefuseBtn(prev => !prev)
        setFormRefuse({
          orderDonationId: '',
          cancelReasonId: '',
          otherReason: '',
          bloodType: ''
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

  const parseDate = (str) => {
    if (!str) return new Date(0); // trả về ngày rất nhỏ nếu thiếu
    const [day, month, year] = str.split('/');
    return new Date(`${year}-${month}-${day}`);
  };

  const [sortDirection, setSortDirection] = useState('asc');
  const sortRow = (row) => {
    const direction = sortDirection === 'asc' ? 1 : -1;

    switch (row) {
      case 1:
        setOrderInfo([...orderInfo].sort((a, b) => (a.orderDonationId - b.orderDonationId) * direction));
        break;

      case 4:
        setOrderInfo([...orderInfo].sort((a, b) => a.bloodType.localeCompare(b.bloodType) * direction));
        break;

      case 5:
        setOrderInfo([...orderInfo].sort((a, b) => (a.amountBloodMl - b.amountBloodMl) * direction));
        break;

      case 6:
        setOrderInfo([...orderInfo].sort((a, b) => {
          const dateA = parseDate(a.orderDate);
          const dateB = parseDate(b.orderDate);
          return (dateA - dateB) * direction;
        }));
        break;

      default:
        break;
    }
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const groupedData = groupByDateAndTime(orderInfo);

  function getBloodTypeById(bloodId) {
    if (!bloodTypeInfo || !Array.isArray(bloodTypeInfo)) return '';
    const found = bloodTypeInfo.find(item => String(item.id) === String(bloodId));
    return found && found.bloodType ? found.bloodType : '';
  }
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
       <div className={`${stateAcceptBtn ? 'show' : 'hidden'} accept-container ${showConfirmModal ? 'blur-background' : ''}`}>
        <h2>Hoàn tất đơn</h2>
        <div className="form-accept">
          <span className="text-w">Bạn có chắc chắn muốn hoàn tất đơn yêu cầu xét nghiệm máu này?</span>
          <span className="text-w">Mã đơn: {chooseUserInfo.orderDonationId}</span>
          <span className="text-w">Tên người hiến: {chooseUserInfo.fullName}</span>
          
          <form onSubmit={e => acceptOrder(e, chooseUserInfo.orderDonationId)}>
            <label>
              Thể tích máu (ml)
              <input
                type="number"
                min="250"
                max="650"
                step="0.1"
                value={formComplete.volumeMl}
                onChange={handleVolumeMlChange}
                placeholder="Nhập thể tích máu (250-650ml)"
                required
              />
            </label>

            <label>
              Nhóm máu
              <select
                value={formComplete.bloodType}
                onChange={handleCompleteBloodTypeChange}
                required
              >
                <option value="">-- Chọn nhóm máu --</option>
                {bloodTypeInfo.map((bloodType) => (
                  <option key={bloodType.id} value={bloodType.id}>
                    {bloodType.bloodType}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Ngày hết hạn
              <input
                type="datetime-local"
                value={formComplete.expiryDate}
                onChange={handleExpiryDateChange}
                required
              />
            </label>

            <button type="submit">Xác nhận</button>
          </form>
        </div>
        <button type="none" className="close-btn" onClick={e => {
          setStateAcceptBtn(!stateAcceptBtn);
          setFormComplete({
            orderDonationId: '',
            volumeMl: '',
            bloodType: '',
            expiryDate: ''
          });
        }}>
        </button>
      </div>

             {/* Confirm Blood Bag Modal */}
       <div className={`${showConfirmModal ? 'show' : 'hidden'} accept-container`}>
         <h2>Thông tin túi máu</h2>
         <div className="form-accept">
           <span className="text-w">Vui lòng xác nhận thông tin túi máu trước khi tạo:</span>
           
           <div className="blood-bag-info">
             <div className="info-item">
               <span className="label">Thể tích máu:</span>
               <span className="value">{formComplete.volumeMl} ml</span>
             </div>
             <div className="info-item">
               <span className="label">Nhóm máu:</span>
               <span className="value">{getBloodTypeById(formComplete.bloodType)}</span>
             </div>
             <div className="info-item">
               <span className="label">Ngày hết hạn:</span>
               <span className="value">{formComplete.expiryDate ? new Date(formComplete.expiryDate).toLocaleString('vi-VN') : ''}</span>
             </div>
           </div>

           <div className="confirm-buttons">
             <button 
               type="button" 
               onClick={confirmAndSendRequest}
               className="confirm-btn"
             >
               Tạo túi máu
             </button>
             <button 
               type="button" 
               onClick={() => {
                 setShowConfirmModal(false);
                 setConfirmData(null);
               }}
               className="cancel-btn"
             >
               Hủy
             </button>
           </div>
         </div>
         <button type="none" className="close-btn" onClick={() => {
           setShowConfirmModal(false);
           setConfirmData(null);
         }}>
         </button>
       </div>

      {/* Refuse Modal */}
      <div className={`${stateRefuseBtn ? 'show' : 'hidden'} refuse-container`}>
        <h2>Hủy bỏ đơn</h2>
        <div className="form-accept">
          <span className="text-w">Bạn có chắc chắn muốn hủy đơn yêu cầu xét nghiệm máu này?</span>
          <span className="text-w">Mã đơn: {chooseUserInfo.orderDonationId}</span>
          <span className="text-w">Tên khách hàng: {chooseUserInfo.fullName}</span>
          <span className="text-w">Số điện thoại: {chooseUserInfo.phone}</span>
          <span className="text-w">CCCD: {chooseUserInfo.cccdNumber}</span>
          <form onSubmit={refuseOrder}>
            <label>
              Chọn lý do hủy đơn
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

            {showBloodTypeSelect && (
              <label>
                Chọn nhóm máu
                <select
                  value={formRefuse.bloodType}
                  onChange={handleBloodTypeChange}
                  required
                >
                  <option value="">-- Chọn nhóm máu --</option>
                  {bloodTypeInfo.map((bloodType) => (
                    <option key={bloodType.id} value={bloodType.id}>
                      {bloodType.bloodType}
                    </option>
                  ))}
                </select>
              </label>
            )}

            <button type="submit">Hủy</button>
          </form>
        </div>
        <button type="none" className="close-btn" onClick={e => {
          setStateRefuseBtn(!stateRefuseBtn);
          setFormRefuse({
            orderDonationId: '',
            cancelReasonId: '',
            otherReason: '',
            bloodType: ''
          });
          setShowOtherReasonInput(false);
          setShowBloodTypeSelect(false);
        }}>
        </button>
      </div>

      {/* Main Content */}
      <div className={`schedule-content ${moreInfo || stateAcceptBtn || stateRefuseBtn || showConfirmModal ? 'prevent-ui' : 'normal-ui'}`}>
        <h3 className="main-title">Danh sách đơn đã được duyệt</h3>

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
            <p>Chưa có đơn nào được duyệt</p>
          </div>
        ) : (
          <div className="date-time-groups">
            {getFilteredData().map((group, groupIndex) => (
              <div key={groupIndex} className="date-time-group">
                <div className="date-time-header">
                  <h4>📅 Ngày: {group.date} - 🕐 Thời gian: {group.time}</h4>
                  <span className="order-count">
                    {group.orders.length} đơn đã duyệt
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
                        <th>Hoàn tất</th>
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
                            <span className="status-approved">Đang chờ hiến máu</span>
                          </td>
                          <td>
                            <button
                              className="btn-complete"
                              onClick={e => acceptUserToInfo(item)}
                            >
                              Hoàn tất
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

export default OrderBloodDonationAccept;