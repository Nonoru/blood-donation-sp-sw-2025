import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import * as StaffApi from '../services/StaffApi'
import '../styles/AdminStatistic.scss';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

function AdminStatistic() {
  const [bloodBagInfo, setBloodBagInfo] = useState([])
  const [bloodTypeInfo, setBloodTypeInfo] = useState([])
  const [donationOrders, setDonationOrders] = useState([])
  const [receiveOrders, setReceiveOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('blood') // 'blood', 'donation', 'receive'

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

  const getDonationOrders = async () => {
    try {
      const res = await StaffApi.getAllOrderDonate();
      if (res.data.code === 200) {
        const list = [];
        res.data.data.forEach(i => {
          list.push(i);
        });
        setDonationOrders(list);
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

  const getReceiveOrders = async () => {
    try {
      const res = await StaffApi.getAllOrderReceive();
      if (res.data.code === 200) {
        const list = [];
        res.data.data.forEach(i => {
          list.push(i);
        });
        setReceiveOrders(list);
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

  // Hàm lấy tên trạng thái túi máu
  const getBloodBagStatusName = (status) => {
    switch (status) {
      case 1: return "Hết hạn";
      case 2: return "Đang vận chuyển";
      case 3: return "Không còn trong kho";
      case 4: return "Còn hạn";
      default: return "Không xác định";
    }
  }

  // Hàm lấy tên trạng thái đơn hiến máu
  const getDonationStatusName = (status) => {
    switch (status) {
      case 1: return "Đang chờ duyệt";
      case 2: return "Trong giai đoạn hiến máu";
      case 3: return "Đã được hoàn tất";
      case 4: return "Đã bị từ chối";
      case 5: return "Đã bị hủy đơn";
      default: return "Không xác định";
    }
  }

  // Hàm lấy tên trạng thái đơn nhận máu (placeholder - cần cập nhật theo JSON thực tế)
  const getReceiveStatusName = (status) => {
    switch (status) {
      case 1: return "Đang chờ duyệt";
      case 2: return "Đang xử lý";
      case 3: return "Đã được hoàn tất";
      case 4: return "Đã bị từ chối";
      case 5: return "Đã bị hủy đơn";
      default: return "Không xác định";
    }
  }

  // Tính toán thống kê túi máu
  const calculateBloodStatistics = () => {
    const stats = {
      totalBags: bloodBagInfo.length,
      totalVolume: 0,
      availableVolume: 0, // Chỉ tính từ túi còn hạn (status = 4)
      bloodTypeDistribution: {},
      volumeByType: {},
      availableVolumeByType: {}, // Thể tích còn hạn theo nhóm máu
      statusDistribution: {
        "Hết hạn": 0,
        "Đang vận chuyển": 0,
        "Không còn trong kho": 0,
        "Còn hạn": 0
      }
    };

    bloodBagInfo.forEach(bag => {
      // Tính tổng thể tích
      stats.totalVolume += bag.volumeMl || 0;

      // Tính thể tích còn hạn (chỉ status = 4)
      if (bag.status === 4) {
        stats.availableVolume += bag.volumeMl || 0;
      }

      // Phân bố theo nhóm máu
      const bloodType = bag.bloodType || 'Unknown';
      stats.bloodTypeDistribution[bloodType] = (stats.bloodTypeDistribution[bloodType] || 0) + 1;
      
      // Thể tích theo nhóm máu
      stats.volumeByType[bloodType] = (stats.volumeByType[bloodType] || 0) + (bag.volumeMl || 0);
      
      // Thể tích còn hạn theo nhóm máu
      if (bag.status === 4) {
        stats.availableVolumeByType[bloodType] = (stats.availableVolumeByType[bloodType] || 0) + (bag.volumeMl || 0);
      }

      // Phân bố theo trạng thái
      const statusName = getBloodBagStatusName(bag.status);
      stats.statusDistribution[statusName]++;
    });

    return stats;
  };

  // Tính toán thống kê đơn hiến máu
  const calculateDonationStatistics = () => {
    const stats = {
      totalOrders: donationOrders.length,
      totalAmountBlood: 0,
      bloodTypeDistribution: {},
      statusDistribution: {
        "Đang chờ duyệt": 0,
        "Trong giai đoạn hiến máu": 0,
        "Đã được hoàn tất": 0,
        "Đã bị từ chối": 0,
        "Đã bị hủy đơn": 0
      },
      monthlyDistribution: {},
      completedOrders: 0,
      pendingOrders: 0,
      rejectedOrders: 0,
      cancelledOrders: 0
    };

    donationOrders.forEach(order => {
      // Tính tổng lượng máu hiến
      stats.totalAmountBlood += order.amountBloodDonation || 0;

      // Phân bố theo nhóm máu
      const bloodType = order.bloodType || 'Unknown';
      stats.bloodTypeDistribution[bloodType] = (stats.bloodTypeDistribution[bloodType] || 0) + 1;

      // Phân bố theo trạng thái
      const statusName = getDonationStatusName(order.status);
      stats.statusDistribution[statusName]++;

      // Đếm theo trạng thái
      if (order.status === 1) stats.pendingOrders++;
      else if (order.status === 3) stats.completedOrders++;
      else if (order.status === 4) stats.rejectedOrders++;
      else if (order.status === 5) stats.cancelledOrders++;

      // Phân bố theo tháng
      if (order.createDate) {
        const date = new Date(order.createDate);
        const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
        stats.monthlyDistribution[monthYear] = (stats.monthlyDistribution[monthYear] || 0) + 1;
      }
    });

    return stats;
  };

  // Tính toán thống kê đơn nhận máu
  const calculateReceiveStatistics = () => {
    const stats = {
      totalOrders: receiveOrders.length,
      bloodTypeDistribution: {},
      statusDistribution: {
        "Đang chờ duyệt": 0,
        "Đang xử lý": 0,
        "Đã được hoàn tất": 0,
        "Đã bị từ chối": 0,
        "Đã bị hủy đơn": 0
      },
      completedOrders: 0,
      pendingOrders: 0,
      rejectedOrders: 0,
      cancelledOrders: 0
    };

    receiveOrders.forEach(order => {
      // Phân bố theo nhóm máu
      const bloodType = order.bloodType || 'Unknown';
      stats.bloodTypeDistribution[bloodType] = (stats.bloodTypeDistribution[bloodType] || 0) + 1;

      // Phân bố theo trạng thái
      const statusName = getReceiveStatusName(order.status);
      stats.statusDistribution[statusName]++;

      // Đếm theo trạng thái
      if (order.status === 1) stats.pendingOrders++;
      else if (order.status === 3) stats.completedOrders++;
      else if (order.status === 4) stats.rejectedOrders++;
      else if (order.status === 5) stats.cancelledOrders++;
    });

    return stats;
  };

  // Dữ liệu cho biểu đồ tròn (phân bố nhóm máu túi máu)
  const getBloodPieChartData = () => {
    const stats = calculateBloodStatistics();
    const labels = Object.keys(stats.bloodTypeDistribution);
    const data = Object.values(stats.bloodTypeDistribution);
    
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
      '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'
    ];

    return {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors.slice(0, labels.length),
        borderColor: colors.slice(0, labels.length).map(color => color + '80'),
        borderWidth: 2,
      }]
    };
  };

  // Dữ liệu cho biểu đồ cột (thể tích còn hạn theo nhóm máu)
  const getBloodBarChartData = () => {
    const stats = calculateBloodStatistics();
    const labels = Object.keys(stats.availableVolumeByType);
    const data = Object.values(stats.availableVolumeByType);

    return {
      labels: labels,
      datasets: [{
        label: 'Thể tích còn hạn (ml)',
        data: data,
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      }]
    };
  };

  // Dữ liệu cho biểu đồ tròn trạng thái túi máu
  const getBloodStatusPieChartData = () => {
    const stats = calculateBloodStatistics();
    const labels = Object.keys(stats.statusDistribution);
    const data = Object.values(stats.statusDistribution);
    
    const colors = [
      '#FF6B6B', // Hết hạn - đỏ
      '#FFA500', // Đang vận chuyển - cam
      '#808080', // Không còn trong kho - xám
      '#4ECDC4'  // Còn hạn - xanh
    ];

    return {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors,
        borderColor: colors.map(color => color + '80'),
        borderWidth: 2,
      }]
    };
  };

  // Dữ liệu cho biểu đồ tròn (phân bố nhóm máu đơn hiến)
  const getDonationPieChartData = () => {
    const stats = calculateDonationStatistics();
    const labels = Object.keys(stats.bloodTypeDistribution);
    const data = Object.values(stats.bloodTypeDistribution);
    
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
      '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'
    ];

    return {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors.slice(0, labels.length),
        borderColor: colors.slice(0, labels.length).map(color => color + '80'),
        borderWidth: 2,
      }]
    };
  };

  // Dữ liệu cho biểu đồ tròn trạng thái đơn hiến
  const getDonationStatusPieChartData = () => {
    const stats = calculateDonationStatistics();
    const labels = Object.keys(stats.statusDistribution);
    const data = Object.values(stats.statusDistribution);
    
    const colors = [
      '#FFA500', // Đang chờ duyệt - cam
      '#3498db', // Trong giai đoạn hiến máu - xanh dương
      '#4CAF50', // Đã được hoàn tất - xanh lá
      '#e74c3c', // Đã bị từ chối - đỏ
      '#95a5a6'  // Đã bị hủy đơn - xám
    ];

    return {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors,
        borderColor: colors.map(color => color + '80'),
        borderWidth: 2,
      }]
    };
  };

  // Dữ liệu cho biểu đồ cột (lượng máu hiến theo nhóm máu)
  const getDonationBarChartData = () => {
    const stats = calculateDonationStatistics();
    const bloodTypeAmounts = {};

    donationOrders.forEach(order => {
      if (order.status === 3) { // Chỉ tính đơn đã hoàn tất
        const bloodType = order.bloodType || 'Unknown';
        bloodTypeAmounts[bloodType] = (bloodTypeAmounts[bloodType] || 0) + (order.amountBloodDonation || 0);
      }
    });

    const labels = Object.keys(bloodTypeAmounts);
    const data = Object.values(bloodTypeAmounts);

    return {
      labels: labels,
      datasets: [{
        label: 'Lượng máu hiến (ml)',
        data: data,
        backgroundColor: 'rgba(76, 175, 80, 0.8)',
        borderColor: 'rgba(76, 175, 80, 1)',
        borderWidth: 1,
      }]
    };
  };

  // Dữ liệu cho biểu đồ tròn (phân bố nhóm máu đơn nhận)
  const getReceivePieChartData = () => {
    const stats = calculateReceiveStatistics();
    const labels = Object.keys(stats.bloodTypeDistribution);
    const data = Object.values(stats.bloodTypeDistribution);
    
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
      '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'
    ];

    return {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors.slice(0, labels.length),
        borderColor: colors.slice(0, labels.length).map(color => color + '80'),
        borderWidth: 2,
      }]
    };
  };

  // Dữ liệu cho biểu đồ tròn trạng thái đơn nhận
  const getReceiveStatusPieChartData = () => {
    const stats = calculateReceiveStatistics();
    const labels = Object.keys(stats.statusDistribution);
    const data = Object.values(stats.statusDistribution);
    
    const colors = [
      '#FFA500', // Đang chờ duyệt - cam
      '#3498db', // Đang xử lý - xanh dương
      '#4CAF50', // Đã được hoàn tất - xanh lá
      '#e74c3c', // Đã bị từ chối - đỏ
      '#95a5a6'  // Đã bị hủy đơn - xám
    ];

    return {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors,
        borderColor: colors.map(color => color + '80'),
        borderWidth: 2,
      }]
    };
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Thể tích máu còn hạn theo nhóm máu',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Thể tích (ml)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Nhóm máu'
        }
      }
    }
  };

  const donationBarChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Lượng máu hiến theo nhóm máu',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Lượng máu (ml)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Nhóm máu'
        }
      }
    }
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Phân bố túi máu theo nhóm máu',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
    },
  };

  const donationPieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Phân bố đơn hiến máu theo nhóm máu',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
    },
  };

  const receivePieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Phân bố đơn nhận máu theo nhóm máu',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
    },
  };

  const statusPieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Phân bố túi máu theo trạng thái',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
    },
  };

  const donationStatusPieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Phân bố đơn hiến máu theo trạng thái',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
    },
  };

  const receiveStatusPieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Phân bố đơn nhận máu theo trạng thái',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([getBloodType(), getBloodBag(), getDonationOrders(), getReceiveOrders()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const bloodStats = calculateBloodStatistics();
  const donationStats = calculateDonationStatistics();
  const receiveStats = calculateReceiveStatistics();

  if (loading) {
    return (
      <div className="blood-statistic">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Đang tải dữ liệu thống kê...</p>
        </div>
      </div>
    );
  }

  // Render Blood Statistics Container
  const renderBloodStatistics = () => (
    <div className="statistic-container">
      {/* Header */}
      <div className="statistic-header">
        <h1>Thống kê túi máu</h1>
        <p>Cập nhật lần cuối: {new Date().toLocaleString('vi-VN')}</p>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card total-bags">
          <div className="card-icon">🩸</div>
          <div className="card-content">
            <h3>Tổng số túi máu</h3>
            <p className="card-number">{bloodStats.totalBags}</p>
          </div>
        </div>

        <div className="summary-card total-volume">
          <div className="card-icon">💉</div>
          <div className="card-content">
            <h3>Tổng thể tích</h3>
            <p className="card-number">{bloodStats.totalVolume.toLocaleString()} ml</p>
          </div>
        </div>

        <div className="summary-card available-volume">
          <div className="card-icon">✅</div>
          <div className="card-content">
            <h3>Thể tích còn hạn</h3>
            <p className="card-number">{bloodStats.availableVolume.toLocaleString()} ml</p>
          </div>
        </div>

        <div className="summary-card blood-types">
          <div className="card-icon">🏥</div>
          <div className="card-content">
            <h3>Số nhóm máu</h3>
            <p className="card-number">{Object.keys(bloodStats.bloodTypeDistribution).length}</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-container">
          <div className="chart-card">
            <Pie data={getBloodPieChartData()} options={pieChartOptions} />
          </div>
        </div>

        <div className="chart-container">
          <div className="chart-card">
            <Bar data={getBloodBarChartData()} options={barChartOptions} />
          </div>
        </div>
      </div>

      {/* Status Chart */}
      <div className="charts-section">
        <div className="chart-container">
          <div className="chart-card">
            <Pie data={getBloodStatusPieChartData()} options={statusPieChartOptions} />
          </div>
        </div>
      </div>

      {/* Detailed Statistics Table */}
      <div className="detailed-stats">
        <h2>Chi tiết theo nhóm máu</h2>
        <div className="stats-table">
          <table>
            <thead>
              <tr>
                <th>Nhóm máu</th>
                <th>Số túi</th>
                <th>Tổng thể tích (ml)</th>
                <th>Thể tích còn hạn (ml)</th>
                <th>Thể tích trung bình (ml)</th>
                <th>Tỷ lệ (%)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(bloodStats.bloodTypeDistribution).map(([bloodType, count]) => {
                const volume = bloodStats.volumeByType[bloodType];
                const availableVolume = bloodStats.availableVolumeByType[bloodType] || 0;
                const avgVolume = Math.round(volume / count);
                const percentage = ((count / bloodStats.totalBags) * 100).toFixed(1);
                
                return (
                  <tr key={bloodType}>
                    <td><strong>{bloodType}</strong></td>
                    <td>{count}</td>
                    <td>{volume.toLocaleString()}</td>
                    <td>{availableVolume.toLocaleString()}</td>
                    <td>{avgVolume}</td>
                    <td>{percentage}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status Statistics Table */}
      <div className="detailed-stats">
        <h2>Thống kê theo trạng thái</h2>
        <div className="stats-table">
          <table>
            <thead>
              <tr>
                <th>Trạng thái</th>
                <th>Số túi</th>
                <th>Tỷ lệ (%)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(bloodStats.statusDistribution).map(([status, count]) => {
                const percentage = ((count / bloodStats.totalBags) * 100).toFixed(1);
                
                return (
                  <tr key={status}>
                    <td><strong>{status}</strong></td>
                    <td>{count}</td>
                    <td>{percentage}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Render Donation Statistics Container
  const renderDonationStatistics = () => (
    <div className="statistic-container">
      {/* Header */}
      <div className="statistic-header">
        <h1>Thống kê đơn hiến máu</h1>
        <p>Cập nhật lần cuối: {new Date().toLocaleString('vi-VN')}</p>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card total-orders">
          <div className="card-icon">📋</div>
          <div className="card-content">
            <h3>Tổng số đơn</h3>
            <p className="card-number">{donationStats.totalOrders}</p>
          </div>
        </div>

        <div className="summary-card completed-orders">
          <div className="card-icon">✅</div>
          <div className="card-content">
            <h3>Đơn hoàn tất</h3>
            <p className="card-number">{donationStats.completedOrders}</p>
          </div>
        </div>

        <div className="summary-card pending-orders">
          <div className="card-icon">⏳</div>
          <div className="card-content">
            <h3>Đang chờ duyệt</h3>
            <p className="card-number">{donationStats.pendingOrders}</p>
          </div>
        </div>

        <div className="summary-card total-blood">
          <div className="card-icon">🩸</div>
          <div className="card-content">
            <h3>Tổng lượng máu hiến</h3>
            <p className="card-number">{donationStats.totalAmountBlood.toLocaleString()} ml</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-container">
          <div className="chart-card">
            <Pie data={getDonationPieChartData()} options={donationPieChartOptions} />
          </div>
        </div>

        <div className="chart-container">
          <div className="chart-card">
            <Bar data={getDonationBarChartData()} options={donationBarChartOptions} />
          </div>
        </div>
      </div>

      {/* Status Chart */}
      <div className="charts-section">
        <div className="chart-container">
          <div className="chart-card">
            <Pie data={getDonationStatusPieChartData()} options={donationStatusPieChartOptions} />
          </div>
        </div>
      </div>

      {/* Detailed Statistics Table */}
      <div className="detailed-stats">
        <h2>Chi tiết theo nhóm máu</h2>
        <div className="stats-table">
          <table>
            <thead>
              <tr>
                <th>Nhóm máu</th>
                <th>Số đơn</th>
                <th>Tổng lượng máu (ml)</th>
                <th>Lượng trung bình (ml)</th>
                <th>Tỷ lệ (%)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(donationStats.bloodTypeDistribution).map(([bloodType, count]) => {
                const totalAmount = donationOrders
                  .filter(order => order.bloodType === bloodType)
                  .reduce((sum, order) => sum + (order.amountBloodDonation || 0), 0);
                const avgAmount = Math.round(totalAmount / count);
                const percentage = ((count / donationStats.totalOrders) * 100).toFixed(1);
                
                return (
                  <tr key={bloodType}>
                    <td><strong>{bloodType}</strong></td>
                    <td>{count}</td>
                    <td>{totalAmount.toLocaleString()}</td>
                    <td>{avgAmount}</td>
                    <td>{percentage}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status Statistics Table */}
      <div className="detailed-stats">
        <h2>Thống kê theo trạng thái</h2>
        <div className="stats-table">
          <table>
            <thead>
              <tr>
                <th>Trạng thái</th>
                <th>Số đơn</th>
                <th>Tỷ lệ (%)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(donationStats.statusDistribution).map(([status, count]) => {
                const percentage = ((count / donationStats.totalOrders) * 100).toFixed(1);
                
                return (
                  <tr key={status}>
                    <td><strong>{status}</strong></td>
                    <td>{count}</td>
                    <td>{percentage}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Render Receive Statistics Container
  const renderReceiveStatistics = () => (
    <div className="statistic-container">
      {/* Header */}
      <div className="statistic-header">
        <h1>Thống kê đơn nhận máu</h1>
        <p>Cập nhật lần cuối: {new Date().toLocaleString('vi-VN')}</p>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card total-orders">
          <div className="card-icon">📋</div>
          <div className="card-content">
            <h3>Tổng số đơn</h3>
            <p className="card-number">{receiveStats.totalOrders}</p>
          </div>
        </div>

        <div className="summary-card completed-orders">
          <div className="card-icon">✅</div>
          <div className="card-content">
            <h3>Đơn hoàn tất</h3>
            <p className="card-number">{receiveStats.completedOrders}</p>
          </div>
        </div>

        <div className="summary-card pending-orders">
          <div className="card-icon">⏳</div>
          <div className="card-content">
            <h3>Đang chờ duyệt</h3>
            <p className="card-number">{receiveStats.pendingOrders}</p>
          </div>
        </div>

        <div className="summary-card rejected-orders">
          <div className="card-icon">❌</div>
          <div className="card-content">
            <h3>Đơn bị từ chối</h3>
            <p className="card-number">{receiveStats.rejectedOrders}</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-container">
          <div className="chart-card">
            <Pie data={getReceivePieChartData()} options={receivePieChartOptions} />
          </div>
        </div>

        <div className="chart-container">
          <div className="chart-card">
            <Pie data={getReceiveStatusPieChartData()} options={receiveStatusPieChartOptions} />
          </div>
        </div>
      </div>

      {/* Detailed Statistics Table */}
      <div className="detailed-stats">
        <h2>Chi tiết theo nhóm máu</h2>
        <div className="stats-table">
          <table>
            <thead>
              <tr>
                <th>Nhóm máu</th>
                <th>Số đơn</th>
                <th>Tỷ lệ (%)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(receiveStats.bloodTypeDistribution).map(([bloodType, count]) => {
                const percentage = ((count / receiveStats.totalOrders) * 100).toFixed(1);
                
                return (
                  <tr key={bloodType}>
                    <td><strong>{bloodType}</strong></td>
                    <td>{count}</td>
                    <td>{percentage}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status Statistics Table */}
      <div className="detailed-stats">
        <h2>Thống kê theo trạng thái</h2>
        <div className="stats-table">
          <table>
            <thead>
              <tr>
                <th>Trạng thái</th>
                <th>Số đơn</th>
                <th>Tỷ lệ (%)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(receiveStats.statusDistribution).map(([status, count]) => {
                const percentage = ((count / receiveStats.totalOrders) * 100).toFixed(1);
                
                return (
                  <tr key={status}>
                    <td><strong>{status}</strong></td>
                    <td>{count}</td>
                    <td>{percentage}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="blood-statistic">
      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button 
          className={`tab-button ${activeTab === 'blood' ? 'active' : ''}`}
          onClick={() => setActiveTab('blood')}
        >
          🩸 Thống kê túi máu
        </button>
        <button 
          className={`tab-button ${activeTab === 'donation' ? 'active' : ''}`}
          onClick={() => setActiveTab('donation')}
        >
          📋 Thống kê đơn hiến máu
        </button>
        <button 
          className={`tab-button ${activeTab === 'receive' ? 'active' : ''}`}
          onClick={() => setActiveTab('receive')}
        >
          🏥 Thống kê đơn nhận máu
        </button>
      </div>

      {/* Render Active Container */}
      {activeTab === 'blood' && renderBloodStatistics()}
      {activeTab === 'donation' && renderDonationStatistics()}
      {activeTab === 'receive' && renderReceiveStatistics()}
    </div>
  );
}

export default AdminStatistic;
