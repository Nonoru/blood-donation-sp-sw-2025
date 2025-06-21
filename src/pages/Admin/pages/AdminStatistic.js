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
    { name: 'Nhóm Máu A-', tiepNhan: 8000, truyenDi: 3000, conLai: 5000 },
    { name: 'Nhóm Máu A+', tiepNhan: 7000, truyenDi: 3000, conLai: 5000 },
    { name: 'Nhóm Máu B-', tiepNhan: 8600, truyenDi: 2500, conLai: 6100 },
    { name: 'Nhóm Máu B+', tiepNhan: 8600, truyenDi: 2500, conLai: 6100 },
    { name: 'Nhóm Máu AB-', tiepNhan: 11000, truyenDi: 4000, conLai: 7000 },
    { name: 'Nhóm Máu AB-', tiepNhan: 11000, truyenDi: 4000, conLai: 7000 },
    { name: 'Nhóm Máu O-', tiepNhan: 32000, truyenDi: 10000, conLai: 22000 },
    { name: 'Nhóm Máu O+', tiepNhan: 8400, truyenDi: 2900, conLai: 5500 },
  ];

  return (
    <div className="blood-statistic">
      <h2 className="section-title">TỔNG QUAN</h2>
      <div className="stat-boxes">
        <div className="box today">
          <h3>Hôm nay</h3>
          <p>Số đơn hiến máu: <strong>{todayStats.received}</strong></p>
          <p>Số lượng máu đã truyền: <strong>{todayStats.received * 150} ml</strong></p>
          <p>Số lượng máu đã tiếp nhận: <strong>{todayStats.received * 10} ml</strong></p>
        </div>
        <div className="box stock">
          <h3>Hôm qua</h3>
          <p>Số lượng máu còn: <strong>{todayStats.inStock}</strong></p>
          <p>Số lượng máu đã tiếp nhận: <strong>{todayStats.inStock * 4} ml</strong></p>
          <p>Số lượng máu đã truyền: <strong>{todayStats.inStock * 11} ml</strong></p>
        </div>
        <div className="box stock">
          <h3>Tuần này</h3>
          <p>Số lượng máu còn: <strong>{todayStats.totalReceived}</strong></p>
          <p>Số lượng máu đã tiếp nhận: <strong>{todayStats.totalReceived * 60} ml</strong></p>
          <p>Số lượng máu đã truyền: <strong>{todayStats.totalReceived * 48} ml</strong></p>
        </div>
        <div className="box stock">
          <h3>Tháng này</h3>
          <p>Số lượng máu còn: <strong>{todayStats.totalInStock}</strong></p>
          <p>Số lượng máu đã tiếp nhận: <strong>{todayStats.totalInStock * 400} ml</strong></p>
          <p>Số lượng máu đã truyền: <strong>{todayStats.totalInStock * 101} ml</strong></p>
        </div>
      </div>

      <div className="charts-row">
        <div className="chart-container">
          <p className="chart-caption">
            <strong>Số máu tiếp nhận nhiều nhất:</strong>
          </p>
          <ResponsiveContainer width="100%" height={300}>
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
