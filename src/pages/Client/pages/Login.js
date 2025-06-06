import { Link } from 'react-router-dom';
import { useState } from 'react';
import {loginForm} from '../components/LoginInput'
import {RegisterInput} from '../components/RegisterInput'
import '../styles/Login.scss'

function Login() {
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordConfirm: '',
        email: '',
        roleId: 3
    });
    const [errorByUser, setErrorByUser] = useState({
        username: true,
        password: true,
        passwordConfirm: true,
        email: true,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        if(name === 'username'){
            setErrorByUser(prev => ({...prev, username: value.length < 6 || value.length > 12 || /[^\w]/.test(value)}))
        }
        if(name === 'password'){
            setErrorByUser(prev => ({...prev, password: value.length < 6 || value.length > 12 || /[^\w_!"#$%&'()*+,\-./:;<=>?@[\\\]^`{|}~]/.test(value)}))
        }
        if(name === 'passwordConfirm'){
            setErrorByUser(prev => ({...prev, passwordConfirm: value !== formData.password || value.length < 6}))
        }
        if(name === 'email'){
            setErrorByUser(prev => ({...prev, email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)}))
        }
    }

    const toggleMode = () => {
        setIsRegisterMode(prev => !prev);
    }

    return (
        <div className={`login-page ${isRegisterMode ? 'register-mode' : ''}`}>
            <div className='auth-container'>
                {/* Login Form */}
                <div className='form-section login-form-section'>
                    <h2>Đăng nhập</h2>
                    
                    <div className='social-login'>
                        <button className='social-btn facebook'>
                            <i className='fab fa-facebook-f'></i>
                        </button>
                        <button className='social-btn google'>
                            <i className='fab fa-google'></i>
                        </button>
                        <button className='social-btn linkedin'>
                            <i className='fab fa-linkedin-in'></i>
                        </button>
                    </div>

                    <p className='or-text'>Hoặc đăng nhập với</p>
                      <div className='input-block'>
                        {loginForm()}
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

                    <button className='auth-btn'>Đăng nhập</button>
                </div>

                {/* Register Form */}
                <div className='form-section register-form-section'>
                    <h2>Đăng ký</h2>
                    
                    <div className='input-block'>
                        <RegisterInput formData={formData} handleChange={handleChange} errorByUser={errorByUser}/>
                    </div>

                    <button className='auth-btn'>Đăng ký</button>
                </div>

                {/* Sliding Panels */}
                <div className='overlay-container'>
                    <div className='overlay'>
                        {/* Left Overlay Panel */}
                        <div className='overlay-panel overlay-left'>
                            <h2>Chào mừng trở lại!</h2>
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
    )
}
export default Login