import { useState, useEffect } from 'react';
import * as StaffApi from '../services/StaffApi'
import { toast } from 'react-toastify';
import "../styles/Clinic.scss"
function Clinic() {
    const [clinicInfo, setClinicInfo] = useState([])
    const getList = async () => {
        const execute = async () => {
            try {
                const res = await StaffApi.getClinics();
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
                            const clinicList = [];
                            data.data.data.forEach(i => {
                                clinicList.push(i)
                            });
                            setClinicInfo(clinicList);
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
    return (
        <div className="clinic-page">
            <div>
                <p>Danh sách phòng khám</p>
                <table>
                    <thead>
                        <tr>
                            <th>Mã</th>
                            <th>Tên phòng khám</th>
                            <th>Trưởng phòng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clinicInfo.map((item, index) => (
                            <tr key={index}>
                                <th>{item.id}</th>
                                <th>{item.clinicName}</th>
                                <th>Huy</th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Clinic