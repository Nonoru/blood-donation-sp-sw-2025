import { useState, useEffect } from 'react';
import * as StaffApi from '../services/StaffApi'
import { toast } from 'react-toastify';
import "../styles/OrderDateDonation.scss"

function OrderDateDonation() {
    const [orderDateInfo, setOrderDateInfo] = useState([])
    const [clinicInfo, setClinicInfo] = useState([])
    
    // Group data by date and sort by time
    const groupByDate = (data) => {
        const grouped = {};
        data.forEach(item => {
            const date = item.orderDate;
            if (!grouped[date]) {
                grouped[date] = [];
            }
            grouped[date].push(item);
        });
        
        // Sort each date group by time (earliest to latest)
        Object.keys(grouped).forEach(date => {
            grouped[date].sort((a, b) => {
                return a.orderTime.localeCompare(b.orderTime);
            });
        });
        
        return grouped;
    };

    const getList = async () => {
        const execute = async () => {
            try {
                const res = await StaffApi.getOrderDates();
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
                            const orderDateList = [];
                            data.data.data.forEach(i => {
                                orderDateList.push(i)
                            });
                            setOrderDateInfo(orderDateList);
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
    
    const [stateAddBtn, setStateAddBtn] = useState(false)
    const clickAddBtn = async () => {
        const res = await StaffApi.getClinics();
        const clinicList = [];
        res.data.data.forEach(i => {
            clinicList.push(i)
        });
        setClinicInfo(clinicList);
        setStateAddBtn(prev => !prev)
    }
    
    const [formDate, setFormDate] = useState({
        orderDate: '',
        orderTime: '',
        clinicId: ''
    })
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDate(prev => ({
            ...prev,
            [name]: name === "clinicId" ? parseInt(value, 10) : value
        }));
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await StaffApi.addOrderDate(formDate);

            if (response.data.code === 200) {
                toast.success(response.data.message, { className: 'my-toast' })
                setFormDate({
                    orderDate: '',
                    orderTime: '',
                    clinicId: ''
                })
                setStateAddBtn(prev => !prev)
                getList();
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

    const groupedData = groupByDate(orderDateInfo);
    const sortedDates = Object.keys(groupedData).sort();

    return (
        <div className="clinic-page">
            <div className="header-section">
                {/* CREATE */}
                <div className="schedule-list">
                    <h3>Danh sách lịch khám</h3>
                </div>
                <button className="add-btn btn" onClick={clickAddBtn}>
                    <img src="/img/icons/add.svg"></img>
                    <span>Thêm thời gian</span>
                </button>
            </div>

            <div className={`create-date-container ${stateAddBtn ? 'show' : 'hidden'}`}>
                <h2>Tạo lịch khám mới</h2>
                <form className="create-date" onSubmit={handleSubmit}>
                    <label>
                        Ngày
                        <input type='date' name='orderDate' value={formDate.orderDate} required onChange={e => handleChange(e)}></input>
                    </label>
                    <label>
                        Thời gian
                        <input type='time' name='orderTime' value={formDate.orderTime} required onChange={e => handleChange(e)}></input>
                    </label>
                    <label>
                        Phòng khám
                        <select required name='clinicId' value={formDate.clinicId} onChange={e => handleChange(e)}>
                            <option value="">-- Chọn phòng khám --</option>
                            {clinicInfo.map((item, index) => (
                                <option value={item.id} key={index}>
                                    {item.clinicName}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button type="submit">Tạo lịch</button>
                </form>
                <button type="none" className="close-btn" onClick={e => setStateAddBtn(!stateAddBtn)}>
                </button>
            </div>

            <div className="schedule-content">
                {sortedDates.length === 0 ? (
                    <div className="no-data">
                        <p>Chưa có lịch khám nào</p>
                    </div>
                ) : (
                    <div className="date-groups">
                        {sortedDates.map((date, dateIndex) => (
                            <div key={dateIndex} className="date-group">
                                <div className="date-header">
                                    <h4>📅 Ngày: {date}</h4>
                                    <span className="schedule-count">
                                        {groupedData[date].length} lịch khám
                                    </span>
                                </div>
                                
                                <div className="schedule-cards">
                                    {groupedData[date].map((item, itemIndex) => (
                                        <div key={itemIndex} className="schedule-card">
                                            <div className="card-header">
                                                <span className="schedule-id">Khung giờ #{itemIndex + 1}</span>
                                            </div>
                                            <div className="card-content">
                                                <div className="info-grid">
                                                    <div className="info-item">
                                                        <span className="label">🕐 Thời gian</span>
                                                        <span className="value">{item.orderTime}</span>
                                                    </div>
                                                    <div className="info-item">
                                                        <span className="label">🏥 Phòng khám</span>
                                                        <span className="value">{item.clinicName}</span>
                                                    </div>
                                                    <div className="info-item">
                                                        <span className="label">👥 Số lượng</span>
                                                        <span className="value">{item.numberOfPeople} người</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default OrderDateDonation