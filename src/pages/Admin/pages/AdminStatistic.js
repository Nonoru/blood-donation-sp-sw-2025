import React from 'react';
import '../styles/AdminStatistic.scss';

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid,
} from 'recharts';

function AdminStatistic() {
  const todayStats = {
    received: 120,
    inStock: 540,
    totalReceived: 1500,
    totalInStock: 3000,
  };

  const topProductsByRevenue = [
    { name: 'Nhóm Máu A-', tiepNhan: 1000, truyenDi: 3000, conLai: 5000 },
    { name: 'Nhóm Máu A+', tiepNhan: 1000, truyenDi: 3000, conLai: 5000 },
    { name: 'Nhóm Máu B-', tiepNhan: 1600, truyenDi: 2500, conLai: 6100 },
    { name: 'Nhóm Máu B+', tiepNhan: 8600, truyenDi: 2500, conLai: 6100 },
    { name: 'Nhóm Máu AB-', tiepNhan: 8000, truyenDi: 4000, conLai: 7000 },
    { name: 'Nhóm Máu AB-', tiepNhan: 8000, truyenDi: 4000, conLai: 7000 },
    { name: 'Nhóm Máu O-', tiepNhan: 32000, truyenDi: 8000, conLai: 8000 },
    { name: 'Nhóm Máu O+', tiepNhan: 8400, truyenDi: 2900, conLai: 5500 },
  ];

  return (
    <div className="blood-statistic">
      <h2 className="section-title">TỔNG QUAN</h2>
      <div className="stat-boxes">
        <div className="box today">
          <h3>Hôm nay</h3>
          <p>Số đơn hiến máu: <strong>{todayStats.received}</strong></p>
          <p>Số lượng máu đã tiếp nhận: <strong>{todayStats.received} ml</strong></p>
          <p>Số lượng máu đã gởi đi: <strong>{todayStats.received} ml</strong></p>
        </div>
        <div className="box stock">
          <h3>Hôm qua</h3>
          <p>Số đơn hiến máu: <strong>{todayStats.inStock}</strong></p>
          <p>Số lượng máu đã tiếp nhận: <strong>{todayStats.inStock} ml</strong></p>
          <p>Số lượng máu đã gởi đi: <strong>{todayStats.inStock} ml</strong></p>
        </div>
        <div className="box stock">
          <h3>Tuần này</h3>
          <p>Số đơn hiến máu: <strong>{todayStats.totalReceived}</strong></p>
          <p>Số lượng máu đã tiếp nhận: <strong>{todayStats.totalReceived} ml</strong></p>
          <p>Số lượng máu đã gởi đi: <strong>{todayStats.totalReceived} ml</strong></p>
        </div>
        <div className="box stock">
          <h3>Tháng này</h3>
          <p>Số đơn hiến máu: <strong>{todayStats.totalInStock}</strong></p>
          <p>Số lượng máu đã tiếp nhận: <strong>{todayStats.totalInStock} ml</strong></p>
          <p>Số lượng máu đã gởi đi: <strong>{todayStats.totalInStock} ml</strong></p>
        </div>
      </div>

      <div className="charts-row">
        <div className="chart-container">
          <p className="chart-caption">
            <strong>Số máu tiếp nhận:</strong>
          </p>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={topProductsByRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tiepNhan" name="Tiếp nhận" fill="#4285F4" />
              <Bar dataKey="truyenDi" name="Truyền đi" fill="#EA4335" />
              <Bar dataKey="conLai" name="Còn lại" fill="#FBBC05" />
            </BarChart>
          </ResponsiveContainer>
        </div>



      </div>
    </div>
  );
}

export default AdminStatistic;
