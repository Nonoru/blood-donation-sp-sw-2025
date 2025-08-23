import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as AuthApi from '../services/AuthApi'
import '../styles/ForgotPassword.scss'
function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [token, setToken] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [hasOtp, setHasOtp] = useState(false)

    const handleSubmitEmail = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthApi.forgotPassword(email);
            if (response.data.code === 200) {
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
    const handleSubmitOtp = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthApi.checkOtp(email, otp);
            if (response.data.code === 200) {
                setHasOtp(true)
                setToken(response.data.data.token)
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
    const handleSubmitChangePassword = async (e) => {
        e.preventDefault();

        try {
            const response = await AuthApi.resetPassword(token, newPassword, confirmPassword);
            if (response.data.code === 200) {
                navigate('/login')
                toast.success(response.data.message, { className: 'my-toast' })
            }
        } catch (error) {
            if (error.response.status === 401) {
                toast.error("Bạn bị cấm sử dụng lệnh này", { className: 'my-toast' });
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
        <div className="forgot-password-page">
            <div className="banner">
                <div className="banner-title-content">
                    <h2 className="main-title">
                        <span className="blood-bridge">Blood Bridge</span>
                        <span className="features-text">Quên mật khẩu</span>
                    </h2>
                    <div className="title-decoration">
                        <div className="decoration-line"></div>
                        <div className="decoration-circle">🩸</div>
                        <div className="decoration-line"></div>
                    </div>
                </div>
            </div>
            <div className={`forgot-container max-w-md mx-auto mt-10 space-y-8 bg-white p-6 rounded-xl shadow-lg
                ${!hasOtp ? 'block' : 'hidden'}
            `}>
                <form className="space-y-4 forgot-form" onSubmit={handleSubmitEmail}>
                    <label className="block">
                        <span className="text-gray-700 font-medium">Nhập email tài khoản</span>
                        <input
                            type="email"
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                            placeholder="your@email.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <button
                        type="submit"
                        className="forgot-btn w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition duration-200"
                    >
                        Gởi OTP
                    </button>
                </form>

                <form className="space-y-4 forgot-form" onSubmit={handleSubmitOtp}>
                    <label className="block">
                        <span className="text-gray-700 font-medium">Nhập mã OTP</span>
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                            placeholder="Nhập mã OTP"
                            value={otp}
                            onChange={e => setOtp(e.target.value)}
                            required
                        />
                    </label>
                    <button
                        type="submit"
                        className="forgot-btn w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold transition duration-200"
                    >
                        Xác nhận
                    </button>
                </form>
            </div>
            <div className={`${hasOtp ? 'block' : 'hidden'} max-w-md mx-auto mt-10 space-y-8 bg-white p-6 rounded-xl shadow-lg`}>
                <form className="space-y-4 changePass-form" onSubmit={handleSubmitChangePassword}>
                    <label className="block">
                        <span className="text-gray-700 font-medium">Nhập mật khẩu mới</span>
                        <input
                            type="password"
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                            name='newPassword'
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700 font-medium">Nhập lại mật khẩu mới</span>
                        <input
                            type="password"
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                        />
                    </label>
                    <button
                        type="submit"
                        className="forgot-btn w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-md font-semibold transition duration-200"
                    >
                        Tạo mới mật khẩu
                    </button>
                </form>
            </div>
        </div >
    )
}
export default ForgotPassword