import { Link } from 'react-router-dom';
import {loginForm} from '../components/LoginInput'
import '../styles/Login.scss'
function Login() {
    return (
        <div className="login-page">
            <div className='login-form row'>
                <div className='login-title col-6'>
                </div>
                <div className='login-input col-6'>
                    <h2 className='text-3xl'>Đăng nhập</h2>
                    
                    <div className='input-block'>
                        {loginForm()}
                    </div>

                    <a href='#' className='forget-pass'>
                        Quên mật khẩu ?
                    </a>

                    <button className='login-btn'>Đăng nhập</button>
                    <div className='go-to-register'>
                        Bạn chưa có tài khoản ? 
                        <Link to ="/register" className="" >
                            Đăng ký
                        </Link>
                    </div>
                    

                    <div className='login-google'>
                        <p>hoặc đăng nhập với google</p>
                        <img src="/img/icons/google.svg"></img>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login