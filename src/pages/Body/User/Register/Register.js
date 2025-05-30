import { Link, useNavigate } from 'react-router-dom'
import * as RegisterRequest from '../../../../services/RegisterRequest'
import { RegisterInput } from '../../../../components/RegisterInput'
import { useState, useEffect } from 'react'
import './Register.scss'

function Register(){
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const [usernameTaken, setUsernameTaken] = useState('')

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordConfirm: '',
        email: '',
    })

    const [errorByUser, setErrorByUser] = useState({
        username : false,
        password : false,
        passwordConfirm: false,
        email: false,
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if(name === 'username'){
            setUsername(value)
            setErrorByUser(prev => ({...prev, username: value.length < 6 || value.length >12 || /[^a-zA-Z0-9]/.test(value)}))
        }
        if(name ==='password'){
            setPassword(value)
            setErrorByUser(prev => ({...prev, password: value.length < 6|| value.length >12 || /[^a-zA-Z0-9]/.test(value)}))
        }
        if(name ==='passwordConfirm'){
            setPasswordConfirm(value)
            setErrorByUser(prev => ({...prev, passwordConfirm: value !== password || value.length < 6}))
        }
        if(name === 'email'){
            setEmail(value)
            setErrorByUser(prev => ({...prev, email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)}))
        }
    }

    const [success, setSuccess] = useState(false)
    const [errors, setErrors] = useState({})
    const [blurForm, setBlurForm] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            if(!(errorByUser.username || errorByUser.password || errorByUser.passwordConfirm || errorByUser.email)){
                const response = await RegisterRequest.register(formData)
                if(response.status === 200 || response.status === 201){
                    setSuccess(true)
                    setBlurForm(true)
                    setTimeout(() =>{
                        navigate('/login')
                    },2000)
                }
            }else{
                alert('Nhập lại các trường bị lỗi')
            }
        }catch(error){
            if (error.response && error.response.data) {
                setErrors(error.response.data);
                setTimeout(() => {
                    setErrors({});
                }, 4000);
            }
        }
    }

    // useEffect(() => {
    //     if (username.trim().length > 2) {
    //         const delay = setTimeout(() => {
    //             const check = async () => {
    //                 const isTaken = await checkTaken(username);
    //                 setUsernameTaken(isTaken);
    //             };
    //   check();
    //         }, 500); // đợi 500ms sau khi ngừng gõ
    //         return () => clearTimeout(delay); // xóa timeout nếu gõ tiếp
    //     } else {
    //         setUsernameTaken(false);
    //     }
    // }, [username]);


    return(
        <div className='register-page'>
            <div className='show-status'>
                {Object.values(errors).map((msg, index) => (
                    <div key={index} className="err-status">
                        {msg} !
                    </div>
                ))}
            </div>
            <div className={`register-form ${blurForm ? 'blur-form':''}`} >

                <form className='register-input' onSubmit={handleSubmit}>
                    <h2>Đăng ký</h2>

                    <div className ='input-block'>
                        <div>
                            <RegisterInput formData={formData} handleChange={handleChange} errorByUser={errorByUser}/>
                        </div>
                        <div>
                            <RegisterInput formData={formData} handleChange={handleChange} errorByUser={errorByUser}/>
                        </div>
                    </div>

                    <button className='register-btn' type='submit'>Đăng ký</button>

                    <Link to="/login" className="back-to-login"><img src="/img/icons/login.svg" alt="login"/></Link>
                </form>
            </div>

            <div className='return-to-login' style={{visibility: blurForm ? 'visible' : 'hidden' } }>
                <p> Tạo tài khoản <span>thành công</span></p>
                <p> đang quay về trang login ... </p>    
            </div>

        </div>
    )
}
export default Register