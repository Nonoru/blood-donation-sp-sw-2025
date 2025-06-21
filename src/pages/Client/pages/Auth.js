import { useState } from 'react';
import {LoginInput} from '../components/LoginInput'
import {RegisterInput} from '../components/RegisterInput'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import * as AuthApi from '../services/AuthApi'
import '../styles/Login.scss'

function Login({userInfo, setUserInfo}) {
    const navigate = useNavigate();
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const toggleMode = () => {
        setIsRegisterMode(prev => !prev);
    }

    // REG

    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        password: '',
        passwordConfirm: '',
        email: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    // const [blurForm, setBlurForm] = useState(false)
    const handleRegister = async (e) => {
        e.preventDefault()
        try{
            const response = await AuthApi.register(formData);
            
            if (response.data.code === 200) {
                toast.success(response.data.message, { className: 'my-toast' })
                setTimeout(() => {
                    toggleMode();
                }, 2000)
                setFormData({
                    fullName: '',
                    username: '',
                    password: '',
                    passwordConfirm: '',
                    email: '',
                })
            }
        }catch(error){
            if (error.response) {
                toast.error(error.response.data.message || "Đăng ký thất bại!", {className : 'my-toast'});
            } else if (error.request) {
                toast.error("Không nhận được phản hồi từ server");
            } else {
                toast.error("Lỗi không xác định", error.message, { className: 'my-toast' });
            }
        }
    }

    const [formLogin, setFormLogin] = useState({
        tk: '',
        password: ''
    })
    const handleChangeLogin = (e) => {
        const { name, value } = e.target;
        setFormLogin(prev => ({ ...prev, [name]: value }));
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthApi.login(formLogin)
            if(response.data.data.authenticated === true){
                localStorage.removeItem("token");
                const token = response.data.data.token
                localStorage.setItem("token", token);
                const decoded = jwtDecode(token);
                if(userInfo.isAuthenticated === false)
                    setUserInfo(prev => ({...prev, isAuthenticated:true, username: decoded.sub}))
                    

                toast.success("Đăng nhập thành công" , {className : 'my-toast'})
                if(decoded.role === "ADMIN" || decoded.role === "STAFF") {
                    console.log(decoded.role);
                    setTimeout(() => {
                        navigate('/admin');
                    }, 2500);
                }
                else{
                    setTimeout(() => {
                        navigate('/');
                    }, 2500);
                }
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || "Đăng nhập thất bại!", {className : 'my-toast'});
            } else if (error.request) {
                toast.error("Không nhận được phản hồi từ server");
            } else {
                toast.error("Lỗi không xác định:", error.message);
            }
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
        <div className={`login-page ${isRegisterMode ? 'register-mode' : ''}`}>
            <div className='auth-container'>
                {/* Login Form */}
                <div className='form-section login-form-section'>
                    <h2>Đăng nhập</h2>
                    
                    <div className='social-login'>
                        <button className='social-btn google'>
                            <i className='fab fa-google'></i>
                        </button>
                    </div>

                    <div className='input-block'>
                        <LoginInput handleChangeLogin = {handleChangeLogin} formLogin = {formLogin}/>
                    </div>

                    <div className='remember-me'>
                        <label className='remember-checkbox'>
                            <input 
                                type="checkbox" 
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <span className='checkmark'></span>
                            Ghi nhớ đăng nhập
                        </label>
                    </div>

                    <a href='#' className='forget-pass'>
                        Quên mật khẩu?
                    </a>

                    <button className='auth-btn' onClick={e => handleLogin(e)}>Đăng nhập</button>
                </div>

                {/* REGISTER FORM */}

                <div className={`register-form `} >
                    {/* ${blurForm ? 'blur-form':''} */}
                    <form className='form-section register-form-section' onSubmit={handleRegister}>
                        <h2 className='text-3xl'>Đăng ký</h2>

                        <div className ='input-block'>
                            <RegisterInput formData={formData} handleChange={handleChange}/>
                        </div>

                        <button className='auth-btn' type='submit'>Đăng ký</button>
                    </form>
                </div>

                {/* Sliding Panels */}
                <div className='overlay-container'>
                    <div className='overlay'>
                        {/* Left Overlay Panel */}
                        <div className='overlay-panel overlay-left'>
                            <h2>Hãy đăng ký!</h2>
                            <p>Để tiếp tục kết nối với chúng tôi, vui lòng đăng ký với thông tin cá nhân của bạn</p>
                            <button className='ghost-btn' onClick={toggleMode}>
                                Đăng nhập
                            </button>
                        </div>
                        
                        {/* Right Overlay Panel */}
                        <div className='overlay-panel overlay-right'>
                            <h2>Hello, Donater!</h2>
                            <p>Chào mừng bạn đến với Blood Bridge</p>
                            <button className='ghost-btn' onClick={toggleMode}>
                                Đăng ký
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </motion.div>
    )
}
export default Login