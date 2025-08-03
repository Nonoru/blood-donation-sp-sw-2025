import React, { useState, useEffect } from 'react';
import * as StaffApi from '../services/StaffApi'
import { toast } from 'react-toastify';
import '../styles/OrderBloodReceiving.scss';

function OrderBloodReceiving() {
  const [orderInfo, setOrderInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [cancelReasonInfo, setCancelReasonInfo] = useState([]);
  const getCancelReason = async () => {
    try {
      const res = await StaffApi.getListCancelReason();
      if (res.data.code === 200) {
        const list = [];
        res.data.data.forEach(i => {
          if (i.cancellationReasonType === "Receive_Pending" || i.cancellationReasonType === "Other") {
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

  const [bloodBagValidList, setBloodBagValidList] = useState([]);
  const getBloodBagValidList = async () => {
    try {
      const res = await StaffApi.getBloodBagValid();
      if (res.data.code === 200) {
        const list = [];
        res.data.data.forEach(i => {
          list.push(i);
        });
        setBloodBagValidList(list);
        console.log(list);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Bạn cần đăng nhập để thực hiện chức năng này", { className: 'my-toast' });
      } else if (error.response && error.response.status === 403) {
        toast.error("Bạn không có quyền sử dụng", { className: 'my-toast' });
      } else if (error.response && error.response.data) {
        toast.error(error.response.data.message, { className: 'my-toast' });
      } else if (error.request) {
        toast.error("Không nhận được phản hồi từ server", { className: 'my-toast' });
      } else {
        toast.error("Lỗi không xác định", error.message, { className: 'my-toast' });
      }
    }
  }

  const getList = async () => {
    const execute = async () => {
      try {
        const res = await StaffApi.getOrderReceivePending();
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
              orderList.sort((a, b) => {
                if (a.type === 'urgent' && b.type !== 'urgent') return -1;
                if (a.type !== 'urgent' && b.type === 'urgent') return 1;
                return new Date(a.createDate) - new Date(b.createDate);
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
    getClinics();
    getCancelReason();
    getBloodBagValidList();
  }, []);

  const getClinics = async () => {
    try {
      const response = await StaffApi.getClinics();
      if (response.data.code === 200) {
        setClinics(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching clinics:', error);
    }
  };

  const openModal = (title, content) => {
    setModalContent({ title, content });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openAcceptModal = (order) => {
    setSelectedOrder(order);
    setShowAcceptModal(true);
  };

  const closeAcceptModal = () => {
  setShowAcceptModal(false);
  setSelectedOrder(null);
  setEstimatedDate('');
  setSelectedBloodBags([]);
};

  const openRejectModal = (order) => {
    setSelectedOrder(order);
    setShowRejectModal(true);
    setFormRefuse({
      orderReceiveId: order.orderReceivingId,
      cancelReasonId: '',
      otherReason: '',
    });
  };

  const closeRejectModal = () => {
    setShowRejectModal(false);
    setSelectedOrder(null);
    setReason('');
    setOtherReason('');
    setFormRefuse({
      orderReceiveId: '',
      cancelReasonId: '',
      otherReason: '',
    });
  };

  const formatDate = (dateInput) => {
    if (!dateInput) {
      return '';
    }
    const date = new Date(dateInput);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatBloodType = (bloodType) => {
    if (!bloodType || bloodType === '' || bloodType === null) {
      return <span className="text-gray-500 italic">Chưa biết</span>;
    }
    return <span className="font-semibold text-blue-600">{bloodType}</span>;
  };

  const formatDonationAmount = (amount) => {
    if (!amount || amount === 0 || amount === null) {
      return <span className="text-gray-500 italic">Chưa biết</span>;
    }
    return <span className="font-semibold text-green-600">{amount} ml</span>;
  };

  // Lọc túi máu theo nhóm máu của đơn
  const getFilteredBloodBags = () => {
    if (!selectedOrder || !selectedOrder.bloodType) {
      return bloodBagValidList;
    }
    return bloodBagValidList.filter(bloodBag => 
      bloodBag.bloodType === selectedOrder.bloodType
    );
  };

  // Xử lý checkbox selection
  const handleBloodBagSelection = (bloodBagId) => {
    setSelectedBloodBags(prev => {
      if (prev.includes(bloodBagId)) {
        return prev.filter(id => id !== bloodBagId);
      } else {
        return [...prev, bloodBagId];
      }
    });
  };

  // Tính thời gian còn lại
  const calculateRemainingTime = (collectionDate, expiryDate) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) {
      return { text: 'Hết hạn', color: '#ef4444', urgent: true };
    } else if (diffDays <= 3) {
      return { text: `${diffDays} ngày`, color: '#f59e0b', urgent: true };
    } else if (diffDays <= 7) {
      return { text: `${diffDays} ngày`, color: '#3b82f6', urgent: false };
    } else {
      return { text: `${diffDays} ngày`, color: '#10b981', urgent: false };
    }
  };

  // Format date display
  const formatDateDisplay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  // Calculate total volume of selected blood bags
  const calculateTotalVolume = () => {
    if (selectedBloodBags.length === 0) return 0;
    
    return selectedBloodBags.reduce((total, bloodBagId) => {
      const bloodBag = bloodBagValidList.find(bag => bag.bloodBagId === bloodBagId);
      return total + (bloodBag ? bloodBag.volumeMl : 0);
    }, 0);
  };

  const [clinicId, setClinicId] = useState();
  const acceptOrder = async (e, id) => {
    e.preventDefault();
    
    // Tạo JSON payload theo format yêu cầu
    const payload = {
      orderReceivingId: id,
      estimateDate: estimatedDate,
      bloodBagIds: selectedBloodBags
    };

    console.log('Sending payload:', payload);

    try {
      const response = await StaffApi.acceptOrderReceive(payload);

      if (response.data.code === 200) {
        toast.success(response.data.message, { className: 'my-toast' });
        closeAcceptModal();
        getList();
      }
    } catch (error) {
      console.log(error.response);
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

  const [reason, setReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [estimatedDate, setEstimatedDate] = useState('');
  const [selectedClinics, setSelectedClinics] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [selectedBloodBags, setSelectedBloodBags] = useState([]);

  const [formRefuse, setFormRefuse] = useState({
    orderReceiveId: '',
    cancelReasonId: '',
    otherReason: '',
  });
  const refuseOrder = async (e) => {
    e.preventDefault();
    
    // Cập nhật formRefuse trước khi gửi
    const updatedFormRefuse = {
      orderReceiveId: selectedOrder?.orderReceivingId,
      cancelReasonId: reason,
      otherReason: (reason === '1' || reason === 'Other' || reason === 'Mục khác') ? otherReason : ''
    };
    try {
      const response = await StaffApi.refuseOrderReceive(updatedFormRefuse);
      if (response.data.code === 200) {
        toast.success(response.data.message, { className: 'my-toast' });
        getList();
        closeRejectModal();
      }
    } catch (error) {
      console.log(error.response);
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

  return (
    <div className="order-blood-receiving-page">
      <div className="page-header">
        <h1 className="page-title">Danh sách đơn yêu cầu nhận máu</h1>
      </div>

      <div className="table-container">
        <table className="order-table">
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Họ tên</th>
              <th>Thông tin người nhận</th>
              <th>Ngày tạo</th>
              <th>Lượng máu (ml)</th>
              <th>Nhóm máu</th>
              <th>Loại đơn</th>
              <th>Trạng thái</th>
              <th>Nhận</th>
              <th>Loại</th>
            </tr>
          </thead>
          <tbody>
            {orderInfo.map((item, idx) => (
              <tr key={item.orderReceivingId}>
                <td>{item.orderReceivingId}</td>
                <td>{item.fullName}</td>
                <td>
                  <button
                    className="info-btn recipient-info-btn"
                    onClick={() => {
                      const info = `Tạo bởi tài khoản: ${item.createdByUsername || 'Chưa có'}\nCCCD: ${item.cccdNumber || 'Chưa có'}\nSố điện thoại: ${item.phone || 'Chưa có'}\nĐịa chỉ: ${item.address || 'Chưa có'}\nLý do người nhận: ${item.userReason || 'Chưa có'}`;
                      openModal('Thông tin người hiến', info);
                    }}
                  >
                    Xem thông tin
                  </button>
                </td>
                <td>{item.createDate ? formatDate(item.createDate) : <span className="text-gray-400">-</span>}</td>
                <td>{formatDonationAmount(item.amountBloodMl)}</td>
                <td>{formatBloodType(item.bloodType)}</td>
                <td>
                  {item.type === 'normal' ? (
                    <span className='order-type-badge normal'>Bình thường</span>
                  ) : (
                    <span className='order-type-badge urgent'>Khẩn cấp</span>
                  )}
                </td>
                <td>
                  <span className='status-badge pending'>Chờ xét duyệt</span>
                </td>
                <td>
                  <button
                    className="action-btn accept-btn"
                    onClick={() => openAcceptModal(item)}
                  >
                    Nhận
                  </button>
                </td>
                <td>
                  <button
                    className="action-btn reject-btn"
                    onClick={() => openRejectModal(item)}
                  >
                    Loại
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal thông tin người hiến */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content donor-info-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{modalContent.title}</h3>
              <button className="modal-close-btn" onClick={closeModal}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="donor-info-content">
                {modalContent.content.split('\n').map((line, index) => (
                  <div key={index} className="info-line">
                    <span className="info-label">{line.split(':')[0]}:</span>
                    <span className="info-value">{line.split(':')[1] || ''}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal chấp nhận đơn */}
      {showAcceptModal && (
        <div className="modal-overlay" onClick={closeAcceptModal}>
          <div className="form-accept-receive" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Chấp nhận đơn nhận máu</h3>
              <button className="modal-close-btn" onClick={closeAcceptModal}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="order-info-grid">
                <div className="info-item">
                  <span className="info-label">Mã đơn:</span>
                  <span className="info-value">{selectedOrder?.orderReceivingId}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Tên người nhận:</span>
                  <span className="info-value">{selectedOrder?.fullName}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Số điện thoại:</span>
                  <span className="info-value">{selectedOrder?.phone}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">CCCD:</span>
                  <span className="info-value">{selectedOrder?.cccdNumber}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Lượng máu:</span>
                  <span className="info-value">{formatDonationAmount(selectedOrder?.amountBloodMl)}</span>
                </div>
              </div>

              <div className="form-section">
                <div className="form-group">
                  <label className="form-label">Thông tin ngày dự kiến hoàn thành:</label>
                  <input
                    type="date"
                    className="form-input"
                    value={estimatedDate}
                    onChange={(e) => setEstimatedDate(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Chọn túi máu:</label>
                  <div className="blood-bag-checkbox-container">
                    {getFilteredBloodBags().length === 0 ? (
                      <div className="no-blood-bags">
                        <p>Không có túi máu phù hợp với nhóm máu {selectedOrder?.bloodType || 'Chưa biết'}</p>
                      </div>
                    ) : (
                      getFilteredBloodBags().map((bloodBag) => {
                        const remainingTime = calculateRemainingTime(bloodBag.collectionDate, bloodBag.expiryDate);
                        return (
                          <div key={bloodBag.bloodBagId} className={`blood-bag-checkbox-item ${remainingTime.urgent ? 'urgent' : ''}`}>
                            <input
                              type="checkbox"
                              id={`bloodBag-${bloodBag.bloodBagId}`}
                              checked={selectedBloodBags.includes(bloodBag.bloodBagId)}
                              onChange={() => handleBloodBagSelection(bloodBag.bloodBagId)}
                              className="blood-bag-checkbox"
                            />
                            <label htmlFor={`bloodBag-${bloodBag.bloodBagId}`} className="blood-bag-label">
                              <div className="blood-bag-info">
                                <div className="blood-bag-header">
                                  <span className="blood-bag-id">#{bloodBag.bloodBagId}</span>
                                  <span className="blood-type">{bloodBag.bloodType}</span>
                                  <span className="volume">{bloodBag.volumeMl}ml</span>
                                  <span 
                                    className="remaining-time"
                                    style={{ color: remainingTime.color, fontWeight: remainingTime.urgent ? '600' : '500' }}
                                  >
                                    {remainingTime.text}
                                  </span>
                                </div>
                              </div>
                            </label>
                          </div>
                        );
                      })
                    )}
                  </div>
                  <small className="form-help">
                    {selectedOrder?.bloodType ? 
                      `Chỉ hiển thị túi máu nhóm ${selectedOrder.bloodType}. Chọn nhiều túi máu nếu cần.` : 
                      'Chọn túi máu phù hợp với yêu cầu'
                    }
                  </small>
                </div>

                {/* Total volume calculation section */}
                {selectedBloodBags.length > 0 && (
                  <div className="total-volume-section-bloodbag">
                    <div className="total-volume-info">
                      <span className="total-volume-label">Tổng lượng máu đã chọn:</span>
                      <span className="total-volume-value">{calculateTotalVolume()}ml</span>
                    </div>
                    <div className="volume-comparison">
                      <span className="required-volume">Yêu cầu: {selectedOrder?.amountBloodMl}ml</span>
                      <span className={`volume-status ${calculateTotalVolume() >= selectedOrder?.amountBloodMl ? 'sufficient' : 'insufficient'}`}>
                        {calculateTotalVolume() >= selectedOrder?.amountBloodMl ? '✓ Đủ lượng máu' : '⚠ Thiếu lượng máu'}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <button
                className="accept-order-btn"
                onClick={(e) => acceptOrder(e, selectedOrder?.orderReceivingId)}
                disabled={!estimatedDate || selectedBloodBags.length === 0 || calculateTotalVolume() < selectedOrder?.amountBloodMl}
                title={
                  !estimatedDate ? "Vui lòng chọn ngày dự kiến hoàn thành" :
                  selectedBloodBags.length === 0 ? "Vui lòng chọn ít nhất một túi máu" :
                  calculateTotalVolume() < selectedOrder?.amountBloodMl ? "Tổng lượng máu chưa đủ so với yêu cầu" :
                  "Sẵn sàng chấp nhận đơn"
                }
              >
                CHẤP NHẬN
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal từ chối đơn */}
      {showRejectModal && (
        <div className="modal-overlay" onClick={closeRejectModal}>
          <div className="modal-content reject-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">LOẠI ĐƠN</h3>
              <button className="modal-close-btn" onClick={closeRejectModal}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p className="confirm-question">
                Bạn có chắc chắn muốn loại đơn yêu cầu nhận máu này?
              </p>

              <div className="order-info-grid">
                <div className="info-item">
                  <span className="info-label">Mã đơn:</span>
                  <span className="info-value">{selectedOrder?.orderReceivingId}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Tên khách hàng:</span>
                  <span className="info-value">{selectedOrder?.fullName}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Số điện thoại:</span>
                  <span className="info-value">{selectedOrder?.phone}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">CCCD:</span>
                  <span className="info-value">{selectedOrder?.cccdNumber}</span>
                </div>
              </div>

              <div className="reason-section">
                <h4 className="reason-title">Chọn lý do loại đơn</h4>
                <select
                  className="reason-select"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                >
                  <option value="">-- Chọn lý do --</option>
                  {cancelReasonInfo.map((item) => (
                    <option key={item.cancellationReasonId} value={item.cancellationReasonId}>
                      {item.cancellationReasonName}
                    </option>
                  ))}
                </select>
                
                {/* Hiển thị input lý do khác khi chọn "Mục khác" */}
                {(reason === '1' || reason === 'Other' || reason === 'Mục khác') && (
                  <div className="other-reason-section">
                    <label className="form-label">Lý do khác:</label>
                    <textarea
                      className="form-textarea"
                      value={otherReason}
                      onChange={(e) => setOtherReason(e.target.value)}
                      placeholder="Nhập lý do cụ thể..."
                      rows="3"
                      required
                    />
                  </div>
                )}
              </div>

              <button
                className="cancel-order-btn"
                onClick={(e) => refuseOrder(e)}
                disabled={!reason || ((reason === '1' || reason === 'Other' || reason === 'Mục khác') && !otherReason.trim())}
              >
                LOẠI
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderBloodReceiving;