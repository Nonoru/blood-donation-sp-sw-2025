import { useState, useEffect } from 'react';
import * as StaffApi from '../services/StaffApi'
import { toast } from 'react-toastify';
import "../styles/OrderDateDonation.scss"
function OrderDateDonation() {
    const [orderDateInfo, setOrderDateInfo] = useState([])
    const [clinicInfo, setClinicInfo] = useState([])
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
    return (
        <div className="clinic-page">
            {/* CREATE */}
            <button className="add-btn btn" onClick={clickAddBtn}>
                <img src="/img/icons/add.svg"></img>
                <span>Thêm thời gian</span>
            </button>

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

            <div>
                <p>Danh sách lịch khám</p>
                <table>
                    <thead>
                        <tr>
                            <th>Mã</th>
                            <th>Ngày khám</th>
                            <th>Thời gian khám</th>
                            <th>Phòng khám</th>
                            <th>Số lượng người khám</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderDateInfo.map((item, index) => (
                            <tr key={index}>
                                <th>{item.orderDateId}</th>
                                <th>{item.orderDate}</th>
                                <th>{item.orderTime}</th>
                                <th>{item.clinic.clinicName}</th>
                                <th>{item.numberOfPeople}</th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default OrderDateDonation