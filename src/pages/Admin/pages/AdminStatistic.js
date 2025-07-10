import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as StaffApi from '../services/StaffApi'
import '../styles/AdminStatistic.scss';

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid,
} from 'recharts';
import { m } from 'framer-motion';

function AdminStatistic() {

  const topProductsByRevenue = [
    { name: 'Nhóm Máu A+', tiepNhan: 1000, truyenDi: 3000, conLai: 5000 },
    { name: 'Nhóm Máu A-', tiepNhan: 1000, truyenDi: 3000, conLai: 5000 },
    { name: 'Nhóm Máu B+', tiepNhan: 1600, truyenDi: 2500, conLai: 6100 },
    { name: 'Nhóm Máu B-', tiepNhan: 8600, truyenDi: 2500, conLai: 6100 },
    { name: 'Nhóm Máu AB+', tiepNhan: 8000, truyenDi: 4000, conLai: 7000 },
    { name: 'Nhóm Máu AB-', tiepNhan: 8000, truyenDi: 4000, conLai: 7000 },
    { name: 'Nhóm Máu O+', tiepNhan: 32000, truyenDi: 8000, conLai: 8000 },
    { name: 'Nhóm Máu O-', tiepNhan: 8400, truyenDi: 2900, conLai: 5500 },
  ];

  const [todayDonateInfo, setTodayDonateInfo] = useState([])
  const [yesterdayDonateInfo, setYesterdaDonateInfo] = useState([])
  const [monthDonateInfo, setMonthDonateInfo] = useState([])

  const [todayReceiveInfo, setTodayReceiveInfo] = useState([])
  const [yesterdayReceiveInfo, setYesterdaReceiveInfo] = useState([])
  const [monthReceiveInfo, setMonthReceiveInfo] = useState([])

  const getInfo = async () => {
    try {
      const responseToday = await StaffApi.getBloodDonateToday();
      const responseYesterday = await StaffApi.getBloodDonateYesterday();
      const responseMonth = await StaffApi.getBloodDonateMonth();
      const responseTodayReceive = await StaffApi.getBloodDonateTodayReceive();
      const responseYesterdayReceive = await StaffApi.getBloodDonateYesterdayReceive();
      const responseMonthReceive = await StaffApi.getBloodDonateMonthReceive();

      if (responseYesterday.data.code === 200 && responseToday.data.code === 200 && responseMonth.data.code === 200) {
        setTodayDonateInfo(responseToday.data.data);
        setYesterdaDonateInfo(responseYesterday.data.data);
        setMonthDonateInfo(responseMonth.data.data);
        setTodayReceiveInfo(responseTodayReceive.data.data);
        setYesterdaReceiveInfo(responseYesterdayReceive.data.data);
        setMonthReceiveInfo(responseMonthReceive.data.data);
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
  useEffect(() => {
    getInfo()
  }, []);

  const today = new Date();

  const yesterday = new Date(new Date().setDate(today.getDate() - 1));

  const formatDate = (date) => {
    if (date === null) return ''
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className='tooltip-box'>
          <p><strong>{label}</strong></p>
          {payload.map((item, index) => (
            <p key={index} style={{ color: item.fill }}>
              {item.name}: {item.value}
            </p>
          ))}
        </div>
      );
    }

    return null;
  };
  return (
    <div className="blood-statistic">
      <h2 className="section-title">TỔNG QUAN</h2>
      <div className='stat-container'>
        <h2>Thống kê đơn hiến máu</h2>
        <div className="stat-boxes">
          <div className="box">
            <h3>Hôm nay {formatDate(today)}</h3>
            <p>Số đơn hiến máu đang đã được tạo: <strong>{todayDonateInfo.countAllOrderDonation || 0}</strong></p>
            <p>Số đơn hiến máu đang chờ xử lý: <strong>{todayDonateInfo.countAllOrderDonationWaiting || 0}</strong></p>
            <p>Số đơn hiến máu đã bị hủy: <strong>{todayDonateInfo.countAllOrderDonationDenied || 0}</strong></p>
            <p>Số đơn hiến máu đã hoàn thành: <strong>{todayDonateInfo.countAllOrderDonationCompleted || 0}</strong></p>
            <p>Lượng máu đã được thêm vào kho: <strong>+{todayDonateInfo.donationBloodAmount || 0} ml</strong></p>
          </div>
          <div className="box">
            <h3>Hôm qua {formatDate(yesterday)}</h3>
            <p>Số đơn hiến máu đang đã được tạo: <strong>{yesterdayDonateInfo.countAllOrderDonation || 0}</strong></p>
            <p>Số đơn hiến máu đang chờ xử lý:  <strong>{yesterdayDonateInfo.countAllOrderDonationWaiting || 0}</strong></p>
            <p>Số đơn hiến máu đã bị hủy: <strong>{yesterdayDonateInfo.countAllOrderDonationDenied || 0}</strong></p>
            <p>Số đơn hiến máu đã hoàn thành: <strong>{yesterdayDonateInfo.countAllOrderDonationCompleted || 0}</strong></p>
            <p>Lượng máu đã được thêm vào kho: <strong>+{yesterdayDonateInfo.donationBloodAmount || 0} ml</strong></p>
          </div>
          <div className="box">
            <h3>Tháng này</h3>
            <p>Số đơn hiến máu đang đã được tạo: <strong>{monthDonateInfo.countAllOrderDonation || 0}</strong></p>
            <p>Số đơn hiến máu đang chờ xử lý: <strong>{monthDonateInfo.countAllOrderDonationWaiting || 0}</strong></p>
            <p>Số đơn hiến máu đã bị hủy: <strong>{monthDonateInfo.countAllOrderDonationDenied || 0}</strong></p>
            <p>Số đơn hiến máu đã hoàn thành: <strong>{monthDonateInfo.countAllOrderDonationCompleted || 0}</strong></p>
            <p>Lượng máu đã được thêm vào kho: <strong>+{monthDonateInfo.donationBloodAmount || 0} ml</strong> </p>
          </div>
        </div>
      </div>

      <div className='stat-container'>
        <h2>Thống kê đơn trung chuyển máu</h2>
        <div className="stat-boxes">
          <div className="box">
            <h3>Hôm nay {formatDate(today)}</h3>
            <p>Số đơn nhận máu đã được tạo: <strong>{todayReceiveInfo.countAllOrderReceive || 0}</strong></p>
            <p>Số đơn nhận máu đang chờ xử lý: <strong>{todayReceiveInfo.countAllOrderReceiveWaiting || 0}</strong></p>
            <p>Số đơn nhận máu đã bị hủy: <strong>{todayReceiveInfo.countAllOrderReceiveDenied || 0}</strong></p>
            <p>Số đơn nhận máu đã hoàn thành trong ngày: <strong>{todayReceiveInfo.countAllOrderReceiveCompleted || 0}</strong></p>
            <p>Lượng máu đã được thêm vào kho: <strong>-{todayReceiveInfo.receiveBloodAmount || 0} ml</strong></p>
          </div>
          <div className="box">
            <h3>Hôm qua {formatDate(yesterday)}</h3>
            <p>Số đơn nhận máu đang đã được tạo: <strong>{yesterdayReceiveInfo.countAllOrderReceive || 0}</strong></p>
            <p>Số đơn nhận máu đang chờ xử lý: <strong>{yesterdayReceiveInfo.countAllOrderReceiveWaiting || 0}</strong></p>
            <p>Số đơn nhận máu đã bị hủy: <strong>{yesterdayReceiveInfo.countAllOrderReceiveDenied || 0}</strong></p>
            <p>Số đơn nhận máu đã hoàn thành trong ngày: <strong>{yesterdayReceiveInfo.countAllOrderReceiveCompleted || 0}</strong></p>
            <p>Lượng máu đã được thêm vào kho: <strong>-{yesterdayReceiveInfo.receiveBloodAmount || 0} ml</strong></p>
          </div>
          <div className="box">
            <h3>Tháng này</h3>
            <p>Số đơn nhận máu đã được tạo: <strong>{monthReceiveInfo.countAllOrderReceive || 0}</strong></p>
            <p>Số đơn nhận máu đang chờ xử lý: <strong>{monthReceiveInfo.countAllOrderReceiveWaiting || 0}</strong></p>
            <p>Số đơn nhận máu đã bị hủy: <strong>{monthReceiveInfo.countAllOrderReceiveDenied || 0}</strong></p>
            <p>Số đơn nhận máu đã hoàn thành: <strong>{monthReceiveInfo.countAllOrderReceiveCompleted || 0}</strong></p>
            <p>Lượng máu đã được thêm vào kho: <strong>-{monthReceiveInfo.receiveBloodAmount || 0} ml</strong> </p>
          </div>
        </div>
      </div>

      <h2 className="section-title">Bảng thống kê trên từng nhóm máu</h2>
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
              <Tooltip content={<CustomTooltip />} />
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
