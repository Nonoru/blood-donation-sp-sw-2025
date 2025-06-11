import { useState } from 'react';
import {LoginInput} from '../components/LoginInput'
import {RegisterInput} from '../components/RegisterInput'
import * as RegisterRequest from '../services/RegisterRequest'
import '../styles/Login.scss'

function Login() {
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const toggleMode = () => {
        setIsRegisterMode(prev => !prev);
    }

    // REG

    const [formData, setFormData] = useState({
        fullname: '',
        username: '',
        password: '',
        passwordConfirm: '',
        email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const [errors, setErrors] = useState({})
    // const [blurForm, setBlurForm] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await RegisterRequest.register(formData)
            if(response.status === 200 || response.status === 201){
                // setBlurForm(true)
            }
        }catch(error){
            if (error.response && error.response.data) {
                setErrors(error.response.data);
                setTimeout(() => {
                    setErrors({});
                }, 4000);
            }
            console.log(errors)
        }
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
                        <LoginInput/>
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

                {/* REGISTER FORM */}

                <div className={`register-form `} >
                    {/* ${blurForm ? 'blur-form':''} */}
                    <form className='form-section register-form-section' onSubmit={handleSubmit}>
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
            <div className='show-status'>
                {Object.values(errors).map((msg, index) => (
                    <div key={index} className="err-status">
                        {msg} !
                    </div>
                ))}
            </div> 
        </div>
    )
}
export default Login