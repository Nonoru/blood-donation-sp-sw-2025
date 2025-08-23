import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as StaffApi from '../services/StaffApi'
import '../styles/BloodStorage.scss'

function BloodStorage() {
    const [bloodTypeInfo, setBloodTypeInfo] = useState([])
    const [selectedBloodType, setSelectedBloodType] = useState(null)
    const [bloodBagInfo, setBloodBagInfo] = useState([])

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

    const getBloodBag = async () => {
        try {
            const res = await StaffApi.getBloodBag();
            if (res.data.code === 200) {
                const list = [];
                res.data.data.forEach(i => {
                    list.push(i);
                });
                setBloodBagInfo(list);
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

    const handleBloodTypeClick = (bloodType) => {
        setSelectedBloodType(bloodType);
        // Prevent background scrolling
        document.body.classList.add('modal-open');
    }

    const handleCloseDetails = () => {
        setSelectedBloodType(null);
        // Re-enable background scrolling
        document.body.classList.remove('modal-open');
    }

    // Filter blood bags by selected blood type
    const getBloodBagsByType = (bloodType) => {
        return bloodBagInfo.filter(bag => bag.bloodType === bloodType);
    }

    // Get blood bags that are still valid (status = 4 = "Còn hạn")
    const getValidBloodBagsByType = (bloodType) => {
        return bloodBagInfo.filter(bag => bag.bloodType === bloodType && bag.status === 4);
    }

    // Calculate total volume for a blood type (only valid bags - status = 4)
    const getTotalVolume = (bloodType) => {
        const validBags = getValidBloodBagsByType(bloodType);
        return validBags.reduce((total, bag) => total + bag.volumeMl, 0);
    }

    // Get blood bag status based on status field
    const getBloodBagStatus = (bag) => {
        switch (bag.status) {
            case 1:
                return {
                    status: 'Hết hạn',
                    className: 'expired'
                };
            case 2:
                return {
                    status: 'Đang vận chuyển',
                    className: 'delivering'
                };
            case 3:
                return {
                    status: 'Không còn trong kho',
                    className: 'not-in-storage'
                };
            case 4:
                return {
                    status: 'Còn hạn',
                    className: 'valid'
                };
            default:
                return {
                    status: 'Không xác định',
                    className: 'unknown'
                };
        }
    }

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }



    useEffect(() => {
        getBloodType();
        getBloodBag();
        
        // Cleanup function to remove modal-open class when component unmounts
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, []);

    return (
        <div className="blood-storage-page">
            <div className="blood-storage-container">
                <h2 className="blood-storage-title">Thông Tin Kho Máu Của Các Nhóm Máu</h2>
                
                <div className="blood-type-grid">
                    {bloodTypeInfo.map((bloodType) => {
                        const bloodBags = getBloodBagsByType(bloodType.bloodType);
                        const validBags = getValidBloodBagsByType(bloodType.bloodType);
                        const totalVolume = getTotalVolume(bloodType.bloodType);
                        
                        return (
                            <div 
                                key={bloodType.id} 
                                className="blood-type-card"
                                data-blood-type={bloodType.bloodType}
                                onClick={() => handleBloodTypeClick(bloodType)}
                            >
                                <div className="blood-type-header">
                                    <span className="blood-type-id">ID: {bloodType.id}</span>
                                </div>
                                <div className="blood-type-content">
                                    <h3 className="blood-type-name">{bloodType.bloodType}</h3>
                                    <div className="blood-type-summary">
                                        <p className="bag-count">Số túi: {bloodBags.length}</p>
                                        <p className="valid-bag-count">Túi còn hạn: {validBags.length}</p>
                                        <p className="total-volume">Tổng thể tích: {totalVolume.toFixed(1)} ml</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {bloodTypeInfo.length === 0 && (
                    <div className="no-data-message">
                        <p>Không có dữ liệu nhóm máu</p>
                    </div>
                )}

                {/* Blood Type Details Modal */}
                {selectedBloodType && (
                    <div className="blood-type-details-modal">
                        <div className="blood-type-details-content">
                            <div className="blood-type-details-header">
                                <h3>Chi Tiết Nhóm Máu: {selectedBloodType.bloodType}</h3>
                                <button 
                                    className="close-details-btn"
                                    onClick={handleCloseDetails}
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="blood-type-details-body">
                                {/* Compact Summary Section */}
                                <div className="compact-summary">
                                    <div className="summary-item">
                                        <span className="summary-label">ID:</span>
                                        <span className="summary-value">{selectedBloodType.id}</span>
                                    </div>
                                    <div className="summary-item">
                                        <span className="summary-label">Nhóm máu:</span>
                                        <span className="summary-value">{selectedBloodType.bloodType}</span>
                                    </div>
                                    <div className="summary-item">
                                        <span className="summary-label">Tổng số túi:</span>
                                        <span className="summary-value">{getBloodBagsByType(selectedBloodType.bloodType).length}</span>
                                    </div>
                                    <div className="summary-item">
                                        <span className="summary-label">Túi còn hạn:</span>
                                        <span className="summary-value">{getValidBloodBagsByType(selectedBloodType.bloodType).length}</span>
                                    </div>
                                    <div className="summary-item">
                                        <span className="summary-label">Tổng thể tích:</span>
                                        <span className="summary-value">{getTotalVolume(selectedBloodType.bloodType).toFixed(1)} ml</span>
                                    </div>
                                    <div className="summary-item">
                                        <span className="summary-label">Trạng thái:</span>
                                        <span className="summary-value">
                                            {getValidBloodBagsByType(selectedBloodType.bloodType).length > 0 ? 'Có sẵn' : 'Không có'}
                                        </span>
                                    </div>
                                </div>

                                {/* Blood Bags List */}
                                <div className="blood-bags-section">
                                    <h4>Danh Sách Túi Máu</h4>
                                    {getBloodBagsByType(selectedBloodType.bloodType).length > 0 ? (
                                        <div className="blood-bags-list">
                                            {getBloodBagsByType(selectedBloodType.bloodType).map((bag) => {
                                                const collectionDate = new Date(bag.collectionDate);
                                                const expiryDate = new Date(bag.expiryDate);
                                                const daysFromCollection = Math.floor((expiryDate - collectionDate) / (1000 * 60 * 60 * 24));
                                                const bagStatus = getBloodBagStatus(bag);
                                                
                                                return (
                                                    <div key={bag.bloodBagId} className={`blood-bag-item ${bagStatus.className}`}>
                                                        <div className="bag-header">
                                                            <span className="bag-id">Mã túi #{bag.bloodBagId}</span>
                                                            <span className={`bag-status ${bagStatus.className}`}>
                                                                {bagStatus.status}
                                                            </span>
                                                        </div>
                                                        <div className="bag-details">
                                                            <div className="bag-info">
                                                                <span className="info-label">Thể tích:</span>
                                                                <span className="info-value">{bag.volumeMl} ml</span>
                                                            </div>
                                                            <div className="bag-info">
                                                                <span className="info-label">Người hiến:</span>
                                                                <span className="info-value">{bag.donateByDonorName || 'Không có thông tin'}</span>
                                                            </div>
                                                            <div className="bag-info">
                                                                <span className="info-label">Ngày thu thập:</span>
                                                                <span className="info-value">{formatDate(bag.collectionDate)}</span>
                                                            </div>
                                                            <div className="bag-info">
                                                                <span className="info-label">Ngày hết hạn:</span>
                                                                <span className={`info-value ${bag.status === 1 ? 'expired' : ''}`}>
                                                                    {formatDate(bag.expiryDate)}
                                                                </span>
                                                            </div>
                                                            <div className="bag-info">
                                                                <span className="info-label">Thời hạn sử dụng:</span>
                                                                <span className="info-value">{daysFromCollection} ngày</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <p className="no-bags-message">Không có túi máu nào cho nhóm máu này</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BloodStorage