import { Link } from 'react-router-dom'
import {RegisterForm} from '../../../../components/RegisterForm'
import {register} from '../../../../services/register'
import { useState } from 'react'
import './Register.scss'
function Register(){
    const [formData, setFormData] = useState(
        {
            username: '',
            password: '',
            email: '',
        }
    )
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }
    const handleSubmit = async () => {
    try {
        console.log("Dữ liệu gửi đi:", JSON.stringify(formData));
        const result = await register(formData);
        alert("Đăng ký thành công!");
        console.log("Kết quả:", result);
    } catch (error) {
        alert("Lỗi đăng ký: " + error.message);
    }
    };
    return(
        <div className='register-page'>
            <div className='register-form row'>
                <div className="register-input col-8">
                    <h2>Đăng ký</h2>
                    <div className ='input-block'>
                        <div>
                            <RegisterForm formData={formData} handleChange={handleChange}/>
                        </div>
                    </div>
                    <button className='register-btn' onClick={handleSubmit}>Đăng ký</button>
                    <Link to="/login" className="back-to-login">
                        <img src="/img/icons/login.svg" alt="login"/>
                    </Link>
                </div>
                <div className='register-title col-4'></div>
            </div>
        </div>
    )
}
export default Register