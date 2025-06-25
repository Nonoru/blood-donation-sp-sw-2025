import React, { useState, useEffect } from 'react';
import * as StaffApi from '../services/StaffApi'
import { toast } from 'react-toastify';
import '../styles/OrderBloodDonation.scss';
function OrderBloodDonationGetAll() {
  const tHeadItems =
    ["Mã", "Tên khách hàng", "Số điện thoại", "Nhóm máu", "Lượng máu(ml)", "Ngày hẹn", "Giờ hẹn", "Xem thêm", "Trạng thái"];

  const [moreInfo, setMoreInfo] = useState(false);
  const [orderInfo, setOrderInfo] = useState([]);

  const getList = async () => {
    const execute = async () => {
      try {
        const res = await StaffApi.getAllOrderDonate();
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

  const parseDate = (str) => {
    if (!str) return new Date(0);
    const [day, month, year] = str.split('/');
    return new Date(`${year}-${month}-${day}`);
  };
  const [sortDirection, setSortDirection] = useState('asc');

  const sortRow = (row) => {
    const direction = sortDirection === 'asc' ? 1 : -1;

    switch (row) {
      case 1:
        setOrderInfo([...orderInfo].sort((a, b) => (a.orderDonationId - b.orderDonationId) * direction));
        break;

      case 4:
        setOrderInfo([...orderInfo].sort((a, b) => a.bloodType.localeCompare(b.bloodType) * direction));
        break;

      case 5:
        setOrderInfo([...orderInfo].sort((a, b) => (a.amountBloodMl - b.amountBloodMl) * direction));
        break;

      case 6:
        setOrderInfo([...orderInfo].sort((a, b) => {
          const dateA = parseDate(a.orderDate);
          const dateB = parseDate(b.orderDate);
          return (dateA - dateB) * direction;
        }));
        break;

      case 9:
        setOrderInfo([...orderInfo].sort((a, b) => (a.statusCode - b.statusCode) * direction));
        break;

      default:
        break;
    }
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };


  return (
    <div className="order-blood-donation-page">
      <div
        className={`order-more-info ${moreInfo ? 'show' : 'hidden'}`}
      >
        <h2>Thông tin khách hàng</h2>
        <div>
          <span>Mã đơn</span>
          <span>{chooseUserInfo.orderDonationId}</span>
        </div>
        <div>
          <span>Tạo bởi username</span>
          <span>{chooseUserInfo.createByUsername}</span>
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
          <span>Giới tính</span>
          <span>{chooseUserInfo.gender}</span></div>
        <div>
          <span>Cân nặng</span>
          <span>{chooseUserInfo.weight}</span>
        </div>
        <div>
          <span>Ngày sinh</span>
          <span>{chooseUserInfo.dob}</span>
        </div>
        <div>
          <span>Địa chỉ</span>
          <span>{chooseUserInfo.address}</span>
        </div>
        <div>
          <span>Ngày tạo</span>
          <span>{chooseUserInfo.createDate}</span>
        </div>
        <button type="none" className="close-btn" onClick={e => setMoreInfo(!moreInfo)}></button>
      </div>
      <p className={`title-table`}>Đơn đã được duyệt</p>
      <table className={`${moreInfo ? 'prevent-ui' : 'normal-ui'}`}>
        <thead>
          <tr>
            {tHeadItems.map((item, index) => (
              <th key={index}>
                {
                  (index + 1) === 1 || (index + 1) === 4 || (index + 1) === 5 || (index + 1) === 9 || (index + 1) === 6 ?
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
                <td>{item.orderDonationId}</td>
                <td>{item.fullName}</td>
                <td>{item.phone}</td>
                <td>{item.bloodType}</td>
                <td>{item.amountBloodMl}</td>
                <td>{item.orderDate}</td>
                <td>{item.orderTime}</td>
                <td
                  className="more-info"
                  onClick={() => watchUserInfo(item)}>
                  <span>Thông tin khách hàng</span>
                </td>
                <td>
                  {renderStatusDiv(item.statusCode)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export default OrderBloodDonationGetAll;