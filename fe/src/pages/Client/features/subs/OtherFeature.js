import React, { useState, useEffect } from 'react';
import '../../styles/OtherFeature.scss';
import { guestGetBloodValidBags, getUrgentCanceledOrders } from '../../services/UserApi';
import { toast } from 'react-toastify';

const OtherFeatures = () => {
  // State management cho các chức năng
  const [activeTab, setActiveTab] = useState('feature1');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

     // Các tab/chức năng có thể có
   const tabs = [
     { id: 'feature1', label: 'Tra cứu nhóm máu', icon: '🩸' },
     { id: 'feature2', label: 'Kho máu hiện có', icon: '🏥' },
     { id: 'feature3', label: 'Cần máu khẩn cấp', icon: '🚨' }
   ];

  // Xử lý thay đổi tab
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    // Reset state khi chuyển tab
    setData(null);
    setError(null);
  };

  // Fetch data cho tab hiện tại
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Thay thế bằng API call thực tế
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      // Mock data - thay thế bằng data thực tế
      const mockData = {
        feature1: {
          title: 'Tra cứu nhóm máu',
          content: 'Thông tin chi tiết về 8 nhóm máu và khả năng truyền máu',
          bloodTypes: [
            {
              type: 'A+',
              canDonateTo: ['A+', 'AB+'],
              canReceiveFrom: ['A+', 'A-', 'O+', 'O-'],
              rarity: 'Phổ biến',
              percentage: '35.7%',
              description: 'Nhóm máu A Rh dương'
            },
            {
              type: 'A-',
              canDonateTo: ['A+', 'A-', 'AB+', 'AB-'],
              canReceiveFrom: ['A-', 'O-'],
              rarity: 'Hiếm',
              percentage: '6.3%',
              description: 'Nhóm máu A Rh âm'
            },
            {
              type: 'B+',
              canDonateTo: ['B+', 'AB+'],
              canReceiveFrom: ['B+', 'B-', 'O+', 'O-'],
              rarity: 'Phổ biến',
              percentage: '8.5%',
              description: 'Nhóm máu B Rh dương'
            },
            {
              type: 'B-',
              canDonateTo: ['B+', 'B-', 'AB+', 'AB-'],
              canReceiveFrom: ['B-', 'O-'],
              rarity: 'Hiếm',
              percentage: '1.5%',
              description: 'Nhóm máu B Rh âm'
            },
            {
              type: 'AB+',
              canDonateTo: ['AB+'],
              canReceiveFrom: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
              rarity: 'Hiếm',
              percentage: '3.4%',
              description: 'Nhóm máu AB Rh dương'
            },
            {
              type: 'AB-',
              canDonateTo: ['AB+', 'AB-'],
              canReceiveFrom: ['A-', 'B-', 'AB-', 'O-'],
              rarity: 'Rất hiếm',
              percentage: '0.6%',
              description: 'Nhóm máu AB Rh âm'
            },
            {
              type: 'O+',
              canDonateTo: ['A+', 'B+', 'AB+', 'O+'],
              canReceiveFrom: ['O+', 'O-'],
              rarity: 'Phổ biến',
              percentage: '37.4%',
              description: 'Nhóm máu O Rh dương'
            },
            {
              type: 'O-',
              canDonateTo: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
              canReceiveFrom: ['O-'],
              rarity: 'Hiếm',
              percentage: '6.6%',
              description: 'Nhóm máu O Rh âm'
            }
          ]
        },
        feature2: { title: 'Kho máu hiện có', content: 'Dữ liệu từ API' }
      };

      setData(mockData[activeTab]);
    } catch (err) {
      setError('Có lỗi xảy ra khi tải dữ liệu');
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const [bloodValidBags, setBloodValidBags] = useState([]);
  const [bloodInventory, setBloodInventory] = useState([]);

  const getBloodValidBags = async () => {
    try {
      const response = await guestGetBloodValidBags();
      const bags = response.data.data;
      setBloodValidBags(bags);
      // Phân loại túi máu theo nhóm máu và tính tổng
      const inventory = processBloodInventory(bags);
      setBloodInventory(inventory);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Bạn cần đăng nhập để thực hiện chức năng này", { className: 'my-toast' });
      } else if (error.response?.status === 403) {
        toast.error("Bạn không có quyền sử dụng", { className: 'my-toast' });
      } else if (error.response?.data) {
        toast.error(error.response.data.message, { className: 'my-toast' });
      } else if (error.request) {
        toast.error("Không nhận được phản hồi từ server", { className: 'my-toast' });
      } else {
        toast.error("Lỗi không xác định", { className: 'my-toast' });
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Hàm tính số ngày còn hạn
  const calculateDaysRemaining = (expiryDate) => {
    if (!expiryDate) return null;

    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  // Hàm xử lý dữ liệu túi máu để tạo inventory
  const processBloodInventory = (bags) => {
    const inventoryMap = {};

    // Khởi tạo tất cả 8 nhóm máu
    const bloodTypeOrder = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    bloodTypeOrder.forEach(type => {
      inventoryMap[type] = {
        bloodType: type,
        totalBags: 0,
        totalVolume: 0,
        bags: []
      };
    });

    // Phân loại túi máu theo nhóm máu
    bags.forEach(bag => {
      const bloodType = bag.bloodType;
      const volume = bag.volumeMl || 0;

      if (inventoryMap[bloodType]) {
        inventoryMap[bloodType].totalBags += 1;
        inventoryMap[bloodType].totalVolume += volume;
        inventoryMap[bloodType].bags.push({
          bloodBagId: bag.bloodBagId,
          volumeMl: volume,
          collectionDate: bag.collectionDate,
          expiryDate: bag.expiryDate
        });
      }
    });

    // Trả về array theo thứ tự nhóm máu
    return bloodTypeOrder.map(type => inventoryMap[type]);
  }

  const [urgentCanceledOrders, setUrgentCanceledOrders] = useState([]);
  const getOrderReceiveUrgent = async () => {
    try {
      const response = await getUrgentCanceledOrders();
      setUrgentCanceledOrders(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Bạn cần đăng nhập để thực hiện chức năng này", { className: 'my-toast' });
      } else if (error.response?.status === 403) {
        toast.error("Bạn không có quyền sử dụng", { className: 'my-toast' });
      } else if (error.response?.data) {
        toast.error(error.response.data.message, { className: 'my-toast' });
      } else if (error.request) {
        toast.error("Không nhận được phản hồi từ server", { className: 'my-toast' });
      } else {
        toast.error("Lỗi không xác định", { className: 'my-toast' });
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Load data khi tab thay đổi
  useEffect(() => {
    if (activeTab === 'feature1') {
      fetchData();
    }
    if (activeTab === 'feature2') {
      getBloodValidBags();
    }
    if (activeTab === 'feature3') {
      getOrderReceiveUrgent();
    }
  }, [activeTab]);

  // Render content cho từng tab
  const renderTabContent = () => {
    if (isLoading) {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <p className="error-message">{error}</p>
          <button
            className="retry-button"
            onClick={() => {
              if (activeTab === 'feature1') fetchData();
              if (activeTab === 'feature2') getBloodValidBags();
              if (activeTab === 'feature3') getOrderReceiveUrgent();
            }}
          >
            Thử lại
          </button>
        </div>
      );
    }

    // Render content dựa trên tab hiện tại
    switch (activeTab) {
      case 'feature1':
        if (!data) {
          return (
            <div className="empty-container">
              <p>Không có dữ liệu</p>
            </div>
          );
        }
        return (
          <div className="feature-content">
            <h3>{data.title}</h3>
            <p>{data.content}</p>

            {/* Blood Type Search Section */}
            <div className="blood-type-search">
              <div className="blood-types-grid">
                {data.bloodTypes.map((bloodType, index) => (
                  <div key={index} className="blood-type-card">
                    <div className="blood-type-header">
                      <div className="blood-type-icon">
                        <span className="blood-symbol">{bloodType.type}</span>
                      </div>
                      <div className="blood-type-info">
                        <h5>{bloodType.type}</h5>
                        <p className="description">{bloodType.description}</p>
                      </div>
                    </div>

                    <div className="blood-type-details">
                      <div className="detail-item">
                        <span className="detail-label">Tỉ lệ dân số:</span>
                        <span className="detail-value percentage">{bloodType.percentage}</span>
                      </div>

                      <div className="detail-item">
                        <span className="detail-label">Mức độ hiếm:</span>
                        <span className={`detail-value rarity ${bloodType.rarity.toLowerCase().replace(' ', '-')}`}>
                          {bloodType.rarity}
                        </span>
                      </div>

                      <div className="detail-item">
                        <span className="detail-label">Có thể hiến cho:</span>
                        <div className="detail-value donate-list">
                          {bloodType.canDonateTo.map((type, idx) => (
                            <span key={idx} className="blood-tag donate">{type}</span>
                          ))}
                        </div>
                      </div>

                      <div className="detail-item">
                        <span className="detail-label">Có thể nhận từ:</span>
                        <div className="detail-value receive-list">
                          {bloodType.canReceiveFrom.map((type, idx) => (
                            <span key={idx} className="blood-tag receive">{type}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="blood-type-summary">
                <h4>Thống kê tổng quan</h4>
                <div className="summary-stats">
                  <div className="stat-item">
                    <span className="stat-number">8</span>
                    <span className="stat-label">Nhóm máu chính</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">37.4%</span>
                    <span className="stat-label">O+ (Phổ biến nhất)</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">0.6%</span>
                    <span className="stat-label">AB- (Hiếm nhất)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'feature2':
        return (
          <div className="feature-content">
            <h3>Kho máu hiện có</h3>
            <p>Thông tin về số lượng túi máu hiện có trong kho</p>

            {/* Blood Inventory Section */}
            <div className="blood-inventory">
              {bloodInventory.length > 0 ? (
                <>
                  <div className="inventory-grid">
                    {bloodInventory.map((item, index) => {
                      const totalBags = item.totalBags;

                      return (
                        <div key={index} className="inventory-card">
                          <div className="inventory-header">
                            <div className="blood-type-badge">
                              <span className="blood-symbol">{item.bloodType}</span>
                            </div>
                          </div>

                          <div className="inventory-details">
                            <div className="detail-row">
                              <span className="detail-label">Số túi máu:</span>
                              <span className="detail-value">{totalBags} túi</span>
                            </div>

                            <div className="detail-row">
                              <span className="detail-label">Tổng thể tích:</span>
                              <span className="detail-value">{item.totalVolume.toFixed(0)} ml</span>
                            </div>

                            <div className="detail-row">
                              <span className="detail-label">Thể tích TB:</span>
                              <span className="detail-value">
                                {totalBags > 0 ? (item.totalVolume / totalBags).toFixed(0) : '0'} ml/túi
                              </span>
                            </div>
                          </div>

                          {/* Chi tiết các túi máu */}
                          <div className="bags-details">
                            <h5>Chi tiết túi máu:</h5>
                            <div className="bags-list">
                              {item.bags.length > 0 ? (
                                item.bags.map((bag, bagIndex) => {
                                  const daysRemaining = calculateDaysRemaining(bag.expiryDate);
                                  let statusClass = '';
                                  let statusText = '';

                                  if (daysRemaining === null) {
                                    statusText = 'N/A';
                                    statusClass = 'expired';
                                  } else if (daysRemaining < 0) {
                                    statusText = 'Hết hạn';
                                    statusClass = 'expired';
                                  } else if (daysRemaining <= 7) {
                                    statusText = `${daysRemaining} ngày`;
                                    statusClass = 'urgent';
                                  } else if (daysRemaining <= 30) {
                                    statusText = `${daysRemaining} ngày`;
                                    statusClass = 'warning';
                                  } else {
                                    statusText = `${daysRemaining} ngày`;
                                    statusClass = 'good';
                                  }

                                  return (
                                    <div key={bagIndex} className="bag-item">
                                      <span className="bag-id">ID: {bag.bloodBagId}</span>
                                      <span className="bag-volume">{bag.volumeMl} ml</span>
                                      <span className={`bag-expiry ${statusClass}`}>
                                        {statusText}
                                      </span>
                                    </div>
                                  );
                                })
                              ) : (
                                <div className="no-bags">
                                  Không có túi máu
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="inventory-summary">
                    <h4>Thống kê tổng quan</h4>
                    <div className="summary-stats">
                      <div className="stat-item">
                        <span className="stat-number">
                          {bloodInventory.reduce((total, item) => total + item.totalBags, 0)}
                        </span>
                        <span className="stat-label">Tổng túi máu</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-number">
                          {bloodInventory.filter(item => item.totalBags > 0).length}
                        </span>
                        <span className="stat-label">Nhóm có túi máu</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-number">
                          {bloodInventory.length}
                        </span>
                        <span className="stat-label">Tổng nhóm máu</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="empty-container">
                  <p>Không có dữ liệu kho máu</p>
                </div>
              )}
            </div>
          </div>
                 );

       case 'feature3':
         return (
           <div className="feature-content">
             <h3>Cần máu khẩn cấp</h3>
             <p>Những đơn nhận máu khẩn cấp do không đủ túi máu để đáp ứng</p>
             <p>Mong mọi người hãy hỗ trợ liên lạc đến người cần máu gấp để giúp họ</p>

                           {/* Urgent Requests Section */}
              <div className="urgent-requests">
                {urgentCanceledOrders && urgentCanceledOrders.length > 0 ? (
                  <div className="requests-grid">
                     {urgentCanceledOrders.map((request, index) => (
                       <div key={index} className="request-card urgent">
                         <div className="request-header">
                           <div className="blood-type-badge urgent">
                             <span className="blood-symbol">{request.bloodType}</span>
                           </div>
                           <span className="status urgent">Khẩn cấp</span>
                         </div>

                                                   <div className="request-details">
                            <div className="detail-row">
                              <span className="detail-label">Họ tên:</span>
                              <span className="detail-value">{request.fullName}</span>
                            </div>

                            <div className="detail-row">
                              <span className="detail-label">Số điện thoại:</span>
                              <span className="detail-value">{request.phoneNumber}</span>
                            </div>

                            <div className="detail-row">
                              <span className="detail-label">Lượng máu cần:</span>
                              <span className="detail-value">{request.amountMl} ml</span>
                            </div>

                            <div className="detail-row">
                              <span className="detail-label">Lý do từ chối:</span>
                              <span className="detail-value reason">Thiếu nguồn cung cấp</span>
                            </div>
                          </div>
                       </div>
                     ))}
                   </div>
                 ) : (
                   <div className="empty-container">
                     <div className="empty-icon">✅</div>
                     <h4>Không có đơn khẩn cấp</h4>
                     <p>Hiện tại không có đơn nhận máu khẩn cấp nào bị từ chối</p>
                   </div>
                 )}
               </div>
             </div>
           );

       default:
         return <div>Tab không tồn tại</div>;
     }
  };

  return (
    <div className="other-features-page">
      {/* Header Section */}
      <div className="donate-title-section">
        <div className="donate-title-content">
          <h2 className="main-title">
            <span className="blood-bridge">Blood Bridge</span>
            <span className="features-text">CHUYÊN MỤC CÁC TÍNH NĂNG KHÁC</span>
          </h2>
          <div className="title-decoration">
            <div className="decoration-line"></div>
            <div className="decoration-circle">✨</div>
            <div className="decoration-line"></div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="features-navigation">
        <div className="tabs-container">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="features-content-area">
        <div className="content-container">
          {renderTabContent()}
        </div>
      </div>

    </div>
  );
};

export default OtherFeatures;  