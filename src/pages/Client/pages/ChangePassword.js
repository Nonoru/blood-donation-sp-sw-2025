import { useState } from 'react';
import { toast } from 'react-toastify';
import * as AuthApi from '../services/AuthApi'
import '../styles/ChangePassword.scss'

function ChangePassword() {
    const [formChangePass, setFromChangePass] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFromChangePass(prev => ({ ...prev, [name]: value }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthApi.changePassword(formChangePass);
            if (response.data.code === 200) {
                setFromChangePass({
                    oldPassword: '',
                    newPassword: '',
                    confirmNewPassword: ''
                })
                localStorage.removeItem('token');
                window.location.href = '/login';
                toast.success(response.data.message, { className: 'my-toast' })
            }
        } catch (error) {
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
        <div className='change-pass-page'>
            <div className="banner">
                <div className="banner-title-content">
                    <h2 className="main-title">
                        <span className="blood-bridge">Blood Bridge</span>
                        <span className="features-text">Thay đổi mật khẩu</span>
                    </h2>
                    <div className="title-decoration">
                        <div className="decoration-line"></div>
                        <div className="decoration-circle">🩸</div>
                        <div className="decoration-line"></div>
                    </div>
                </div>
            </div>
            <form className={`form-changePassword`} onSubmit={e => handleSubmit(e)}>
                <label>
                    <span>Nhập mật khẩu cũ</span>
                    <input type='password' value={formChangePass.oldPassword} name='oldPassword' onChange={e => handleChange(e)} />
                </label>
                <label>
                    <span>Nhập mật khẩu mới</span>
                    <input type='password' value={formChangePass.newPassword} name='newPassword' onChange={e => handleChange(e)} />
                </label>
                <label>
                    <span>Nhập lại mật khẩu mới</span>
                    <input type='password' value={formChangePass.confirmNewPassword} name='confirmNewPassword' onChange={e => handleChange(e)} />
                </label>
                <button type='submit'>Đổi mật khẩu</button>
            </form>
        </div>

    )
}
export default ChangePassword