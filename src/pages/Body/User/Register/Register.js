import { Link } from 'react-router-dom'
import {registerForm} from '../../../../components/RegisterCall'
import './Register.scss'
function Register(){
    return(
        <div className='register-page'>
            <div className='register-form row'>
                <div className="register-input col-8">
                    <h2>Đăng ký</h2>
                    <div className ='input-block'>
                        <div>
                            {registerForm()}
                        </div>
                        <div>
                            {registerForm()}
                        </div>
                    </div>
                    <button className='register-btn'>Đăng ký</button>
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