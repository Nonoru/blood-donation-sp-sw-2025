import { Link } from 'react-router-dom'
import { register , checkTaken } from '../../../../services/RegisterRequest'
import { RegisterInput } from '../../../../components/RegisterInput'
import { useState, useEffect } from 'react'
import './Register.scss'

function Register(){

    const [username, setUsername] = useState('')
    const [usernameTaken, setUsernameTaken] = useState('')
    const [email, setEmail] = useState('')

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordConfirm: '',
        email: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if(name === 'username'){
            setUsername(value)
        }
        if(name === 'email'){
            setEmail(value)
        }
    }
    const handleSubmit = async () => {
        console.log("Dữ liệu gửi đi:", JSON.stringify(formData));
        const result = await register(formData);
    }
    useEffect(() => {
        if (username.trim().length > 2) {
            const delay = setTimeout(() => {
                const check = async () => {
                    const isTaken = await checkTaken(username);
                    setUsernameTaken(isTaken);
                };
      check();
            }, 500); // đợi 500ms sau khi ngừng gõ
            return () => clearTimeout(delay); // xóa timeout nếu gõ tiếp
        } else {
            setUsernameTaken(false);
        }
    }, [username]);

    console.log(usernameTaken)


    return(
        <div className='register-page'>
            <div className='register-form row'>
                <div className="register-input col-6">
                    <h2>Đăng ký</h2>
                    <div className ='input-block'>
                        <RegisterInput formData={formData} handleChange={handleChange}/>
                    </div>

                    {usernameTaken && <h1>Da co r</h1>}

                    <button className='register-btn' onClick={handleSubmit}>Đăng ký</button>

                    <Link to="/login" className="back-to-login"><img src="/img/icons/login.svg" alt="login"/></Link>
                </div>

                <div className='register-title col-6'>


                </div>
            </div>
        </div>
    )
}
export default Register