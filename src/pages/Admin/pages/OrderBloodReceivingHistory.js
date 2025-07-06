import React, { useState, useEffect } from 'react';
import * as StaffApi from '../services/StaffApi'
import { toast } from 'react-toastify';
import '../styles/OrderBloodDonation.scss';
function OrderBloodReceivingHistory() {
  const tHeadItems =
    ["Mã", "Tên khách hàng", "Số điện thoại", "Nhóm máu", "Lượng máu(ml)", "Trạng thái", "Ngày tạo", "Địa điểm", "Xem thêm", "Trạng thái"];

  const [moreInfo, setMoreInfo] = useState(false);
  const [orderInfo, setOrderInfo] = useState([]);

  const getList = async () => {
    const execute = async () => {
      try {
        const res = await StaffApi.getAllOrderReceive();
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
  useEffect(() => {
    getList();
  }, []);

  const [chooseUserInfo, setChooseUserInfo] = useState({})
  const watchUserInfo = (info) => {
    setMoreInfo(prev => !prev);
    setChooseUserInfo(info)
  }
  const renderStatusDiv = (statusCode) => {
    switch (statusCode) {
      case 1:
        return <div className="bg-yellow-500 text-white px-2 py-1 rounded font-semibold">Chờ xác nhận</div>;
      case 2:
        return <div className="bg-blue-500 text-white px-2 py-1 rounded font-semibold">Đã xác nhận</div>;
      case 3:
        return <div className="bg-green-500 text-white px-2 py-1 rounded font-semibold">Đã hoàn tất</div>;
      case 4:
        return <div className="bg-red-600 text-white px-2 py-1 rounded font-semibold">Đã từ chối đơn</div>;
      case 5:
        return <div className="bg-red-400 text-white px-2 py-1 rounded font-semibold">Đã hủy đơn</div>;
      default:
        return <div className="bg-gray-400 text-white px-2 py-1 rounded font-semibold">Không xác định</div>;
    }
  };


  const [sortDirection, setSortDirection] = useState('asc');

  const sortRow = (row) => {
    const direction = sortDirection === 'asc' ? 1 : -1;

    switch (row) {
      case 1:
        setOrderInfo([...orderInfo].sort((a, b) => (a.orderId - b.orderId) * direction));
        break;

      case 4:
        setOrderInfo([...orderInfo].sort((a, b) => a.bloodType.localeCompare(b.bloodType) * direction));
        break;

      case 5:
        setOrderInfo([...orderInfo].sort((a, b) => (a.amountBloodMl - b.amountBloodMl) * direction));
        break;

      case 7:
        setOrderInfo([...orderInfo].sort((a, b) => {
          return (new Date(a.createDate) - new Date(b.createDate)) * direction;
        }));
        break;

      case 10:
        setOrderInfo([...orderInfo].sort((a, b) => (a.status - b.status) * direction));
        break;

      default:
        break;
    }
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };


  return (
    <div className="order-blood-donation-page">
      <div className='count-order'>
        <span>Tổng số đơn</span>
        <span>{orderInfo.length}</span>
      </div>
      <div
        className={`order-more-info ${moreInfo ? 'show' : 'hidden'}`}
      >
        <h2>Thông tin khách hàng</h2>
        <div>
          <span>Mã đơn</span>
          <span>{chooseUserInfo.orderId}</span>
        </div>
        <div>
          <span>Tạo bởi username</span>
          <span>{chooseUserInfo.createdByUsername}</span>
        </div>
        <div>
          <span>Họ tên</span>
          <span>{chooseUserInfo.fullName}</span>
        </div>
        <div>
          <span>CCCD</span>
          <span>{chooseUserInfo.cccdNumber}</span>
        </div>
        <div>
          <span>Địa chỉ</span>
          <span>{chooseUserInfo.address}</span>
        </div>
        <div>
          <span>Lý do</span>
          <span>{chooseUserInfo.reason}</span>
        </div>
        <div>
          <span>Ngày tạo</span>
          <span>{chooseUserInfo.createDate}</span>
        </div>
        <button type="none" className="close-btn" onClick={e => setMoreInfo(!moreInfo)}></button>
      </div>
      <p className={`title-table`}>Lịch sử các đơn nhận máu</p>
      <table className={`${moreInfo ? 'prevent-ui' : 'normal-ui'}`}>
        <thead>
          <tr>
            {tHeadItems.map((item, index) => (
              <th key={index}>
                {
                  (index + 1) === 1 || (index + 1) === 4 || (index + 1) === 5 || (index + 1) === 10 || (index + 1) === 7 ?
                    <div onClick={e => sortRow(index + 1)} className='cursor-pointer'>
                      {item}
                      <img src='/img/icons/sort.svg' className='img-sort'></img>
                    </div>
                    :
                    <div>
                      {item}
                    </div>
                }
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            orderInfo.map((item, index) => (
              <tr key={index}>
                <td>{item.orderId}</td>
                <td>{item.fullName}</td>
                <td>{item.phone}</td>
                <td>{item.bloodType}</td>
                <td>{item.amountBloodMl}</td>
                <td>
                  {item.type === 'normal' ? 'Bình thường' : 'Khẩn cấp'}
                </td>
                <td>{item.createDate}</td>
                <td>{item.clinicName}</td>
                <td
                  className="more-info"
                  onClick={() => watchUserInfo(item)}>
                  <span>Thông tin khách hàng</span>
                </td>
                <td>
                  {renderStatusDiv(item.status)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export default OrderBloodReceivingHistory;