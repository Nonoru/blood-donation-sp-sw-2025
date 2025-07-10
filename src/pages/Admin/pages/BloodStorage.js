import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as StaffApi from '../services/StaffApi'
import '../styles/BloodStorage.scss'
function BloodStorage() {
    const [bloodInfo, setBloodInfo] = useState([])
    const getList = async () => {
        const execute = async () => {
            try {
                const res = await StaffApi.getBlood();
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
                            const list = [];
                            data.data.data.forEach(i => {
                                list.push(i)
                            });
                            setBloodInfo(list);
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
    const [bloodChangeShow, setBloodChangeShow] = useState(false)
    const [bloodChangeInfo, setBloodChangeInfo] = useState([])
    const handleClick = (item) => {
        setBloodChangeShow(prev => !prev)
        setBloodChangeInfo(item)
    }
    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };
    return (
        <div className="blood-storage-page">
            <div className={`count-order ${bloodChangeShow ? 'prevent-ui' : 'normal-ui'}`}>
                <span>Tổng số nhóm máu</span>
                <span>{bloodInfo.length}</span>
            </div>
            <div className={`blood-storage ${bloodChangeShow ? 'prevent-ui' : 'normal-ui'}`}>
                <p>Kho máu</p>
                <table>
                    <thead>
                        <tr>
                            <th>Mã máu</th>
                            <th>Nhóm máu</th>
                            <th>Trong kho(ml)</th>
                            <th>Thay đổi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bloodInfo.map((item, index) => (
                            <tr key={index}>
                                <th>{item.id}</th>
                                <th>{item.bloodType}</th>
                                <th>{item.amount}</th>
                                <th>
                                    <button onClick={e => handleClick(item)}>Lịch sử thay đổi</button>

                                </th>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
            <div className={`blood-history ${bloodChangeShow ? 'block' : 'hidden'}`}>
                <h2>Lịch sử thay đổi nhóm {bloodChangeInfo.bloodType}</h2>
                <button type="none" className="close-btn" onClick={e => setBloodChangeShow(!bloodChangeShow)}></button>
                <table>
                    <thead>
                        <tr>
                            <th>Ngày</th>
                            <th>Khách hàng</th>
                            <th>Loại</th>
                            <th>Số lượng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bloodChangeInfo?.change?.map((item, index) => (
                            <tr key={index}>
                                <th>{formatDate(item.date)}</th>
                                <th>{item.createBy}</th>
                                <th>{item.type === 'Donate' ? 'Hiến máu' : 'Nhận máu'}</th>
                                <th>{item.type === 'Donate' ? '+' : '-'}{item.amount}</th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default BloodStorage