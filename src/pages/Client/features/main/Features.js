import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Token from '../../../../util/Token';
import '../../styles/Features.scss';
import { toast } from 'react-toastify';

const Features = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  const features = [
    {
      id: 1,
      title: 'Hiến Máu',
      icon: '🩸',
      description: 'Đăng ký hiến máu và cứu sống những người cần giúp đỡ',
      color: '#B63B3B',
      path: '/feature/donate-blood',
    },
    {
      id: 2,
      title: 'Nhận Máu',
      icon: '🏥',
      description: 'Yêu cầu máu cho các trường hợp cấp cứu y tế',
      color: '#ff6b6b',
      path: '/feature/receive-blood',
    },
    {
      id: 3,
      title: 'Xem Đơn Hàng',
      icon: '📋',
      description: 'Theo dõi lịch sử hiến máu và yêu cầu của bạn',
      color: '#4CAF50',
      path: '/feature/order-history',
    },
    {
      id: 4,
      title: 'Comming soon',
      icon: '🔧',
      description: 'Chức năng sắp ra mắt, hãy theo dõi!',
      color: '#FF9800',
      path: '/feature/gift-exchange',
    }
  ];

  const handleFeatureClick = (featurePath) => {
    if(Token.getToken() === null) {
      toast.error("Bạn cần đăng nhập để sử dụng tính năng này", { className: 'my-toast' });
      return;
    }
    navigate(featurePath);
  };

  return (
    <motion.div
      className="feature"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className={`features-container ${isLoaded ? 'loaded' : ''}`}>
        {/* Title Section - Top Half */}
        <div className="title-section">
          <div className="title-content">
            <h1 className="main-title">
              <span className="blood-bridge">Blood Bridge</span>
              <span className="features-text">Tính Năng</span>
            </h1>
            <p className="subtitle">
              Kết nối người hiến và người nhận, xây dựng cầu nối hy vọng
            </p>
            <div className="title-decoration">
              <div className="decoration-line"></div>
              <div className="decoration-circle">❤️</div>
              <div className="decoration-line"></div>
            </div>
          </div>
          <div className="floating-elements">
            <div className="floating-element element-1">🩸</div>
            <div className="floating-element element-2">❤️</div>
            <div className="floating-element element-3">🏥</div>
            <div className="floating-element element-4">🎁</div>
          </div>
        </div>

        {/* Features Section - Bottom Half */}
        <div className="features-section">
          <div className="features-grid">
            {features.map((feature) => (
              <div 
                key={feature.id} 
                className={`feature-card ${feature.id === 4 ? 'pointer-events-none' :''}`}
                onClick={() => handleFeatureClick(feature.path)}
                style={{ '--feature-color': feature.color }}
              >
                <div className="feature-header">
                  <div className="feature-icon">{feature.icon}</div>
                  <div className="feature-info">
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                  </div>
                  <div className="expand-icon">
                    {'+'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Features;

