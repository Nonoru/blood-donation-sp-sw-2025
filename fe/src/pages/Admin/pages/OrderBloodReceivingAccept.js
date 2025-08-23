import React, { useState, useEffect } from 'react';
import * as StaffApi from '../services/StaffApi'
import { toast } from 'react-toastify';
import '../styles/OrderBloodReceiving.scss';

function OrderBloodReceivingAccept() {
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
          if (i.cancellationReasonType === "Receive_Processing" || i.cancellationReasonType === "Other") {
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

  const getList = async () => {
    const execute = async () => {
      try {
        const res = await StaffApi.getOrderReceiveProcessing();
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
    getCancelReason();
  }, []);



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
  };

  const openRejectModal = (order) => {
    setSelectedOrder(order);
    setShowRejectModal(true);
    setFormRefuse({
      orderReceiveId: order.orderReceivingId,
      cancellationReasonId: '',
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
      cancellationReasonId: '',
      otherReason: '',
    });
  };

  const openBloodDetailModal = (order) => {
    setSelectedBloodDetail(order);
    setShowBloodDetailModal(true);
  };

  const closeBloodDetailModal = () => {
    setShowBloodDetailModal(false);
    setSelectedBloodDetail(null);
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

  const acceptOrder = async (e, id) => {
    e.preventDefault();
    try {
      const response = await StaffApi.completeOrderReceive(id);

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
  const [showBloodDetailModal, setShowBloodDetailModal] = useState(false);
  const [selectedBloodDetail, setSelectedBloodDetail] = useState(null);

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
    console.log(updatedFormRefuse);
    try {
      const response = await StaffApi.cancelOrderReceive(updatedFormRefuse);
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
        <h1 className="page-title">Danh sách đơn yêu cầu nhận máu đã được duyệt</h1>
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
              <th>Hoàn tất</th>
              <th>Hủy</th>
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
                <td>
                  <button 
                    className="blood-amount-btn"
                    onClick={() => openBloodDetailModal(item)}
                    title="Xem chi tiết túi máu"
                    style={{
                      backgroundColor: '#e8f5e8',
                      border: '1px solid #4caf50',
                      borderRadius: '6px',
                      padding: '6px 12px !important',
                      margin: '0 !important',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontWeight: '500'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#d4edda';
                      e.target.style.transform = 'scale(1.02)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = '#e8f5e8';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    {formatDonationAmount(item.amountBloodMl)} 📋
                  </button>
                </td>
                <td>{formatBloodType(item.bloodType)}</td>
                <td>
                  {item.type === 'normal' ? (
                    <span className='order-type-badge normal'>Bình thường</span>
                  ) : (
                    <span className='order-type-badge urgent'>Khẩn cấp</span>
                  )}
                </td>
                <td>
                  <span className='status-badge processing'>Đang vận chuyển</span>
                </td>
                <td>
                  <button 
                    className="action-btn accept-btn"
                    onClick={() => openAcceptModal(item)}
                  >
                    Hoàn tất
                  </button>
                </td>
                <td>
                  <button 
                    className="action-btn reject-btn"
                    onClick={() => openRejectModal(item)}
                  >
                    Hủy
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
          <div className="modal-content accept-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Hoàn tất đơn nhận máu</h3>
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
              </div>
              <button 
                className="accept-order-btn"
                onClick={(e) => acceptOrder(e, selectedOrder?.orderReceivingId)}
              >
                Hoàn tất
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
              <h3 className="modal-title">HỦY ĐƠN</h3>
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
                <h4 className="reason-title">Chọn lý do hủy đơn</h4>
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
                HỦY
              </button>
            </div>
          </div>
                 </div>
       )}

       {/* Modal chi tiết túi máu */}
       {showBloodDetailModal && (
         <div className="modal-overlay" onClick={closeBloodDetailModal}>
           <div className="modal-content blood-detail-modal" onClick={(e) => e.stopPropagation()}>
             <div className="modal-header">
               <h3 className="blood-detail-modal-title">Chi tiết túi máu</h3>
               <button className="modal-close-btn" onClick={closeBloodDetailModal}>
                 ✕
               </button>
             </div>
             <div className="modal-body">
               <div className="blood-detail-content">
                 <div className="detail-section">
                   <h4 className="section-title">Thông tin tổng quan</h4>
                   <div className="info-grid">
                     <div className="info-item">
                       <span className="info-label">Lượng máu yêu cầu:</span>
                       <span className="info-value">{selectedBloodDetail?.amountBloodMl || 0} ml</span>
                     </div>
                     <div className="info-item">
                       <span className="info-label">Số túi máu đang vận chuyển:</span>
                       <span className="info-value">{selectedBloodDetail?.bloodBagResponses?.length || 0} túi</span>
                     </div>
                     <div className="info-item">
                       <span className="info-label">Tổng lượng máu trong túi:</span>
                       <span className="info-value">
                         {selectedBloodDetail?.bloodBagResponses?.reduce((total, bag) => total + (bag.volumeMl || 0), 0) || 0} ml
                       </span>
                     </div>
                   </div>
                 </div>

                 <div className="detail-section">
                   <h4 className="section-title">Danh sách túi máu</h4>
                   {selectedBloodDetail?.bloodBagResponses && selectedBloodDetail.bloodBagResponses.length > 0 ? (
                     <div className="blood-bags-table">
                       <table className="bags-table">
                         <thead>
                           <tr>
                             <th>Mã túi máu</th>
                             <th>Lượng máu (ml)</th>
                             <th>Nhóm máu</th>
                           </tr>
                         </thead>
                         <tbody>
                           {selectedBloodDetail.bloodBagResponses.map((bag, index) => (
                             <tr key={bag.bloodBagId || index}>
                               <td>{bag.bloodBagId}</td>
                               <td>{bag.volumeMl} ml</td>
                               <td>{bag.bloodType}</td>
                             </tr>
                           ))}
                         </tbody>
                       </table>
                     </div>
                   ) : (
                     <p className="no-data">Chưa có túi máu nào được phân bổ</p>
                   )}
                 </div>
               </div>
             </div>
           </div>
         </div>
       )}
     </div>
   );
 }

export default OrderBloodReceivingAccept;
