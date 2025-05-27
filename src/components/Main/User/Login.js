import { useState } from 'react';
import { register } from '../../../services/register.js' ;
import './Login.scss';
const info = [
    {form: 'signin', class: 'signin-form',title: 'Đăng nhập'},
    {form: 'signup', class: 'signup-form', title: 'Đăng ký'}
]
function Login() {
    const [userName, setUserName] = useState('');
    const [userPasswordHash, setPassword] = useState('');
    const [userEmail, setEmail] = useState('');
    const submitForm = () =>{
         register({ 
            userName, userPasswordHash, userEmail
        });
    }

    return (
        <div style={{height: '80vh'}}>
        <input key={1} type='text' onChange={(e) => setUserName(e.target.value)}/>
        <input key={2} type='password' onChange={(e) => setPassword(e.target.value)}/>
        <input key={3} type='text' onChange={(e) => setEmail(e.target.value)}/>
        <button key={4} onClick={() => submitForm()}>Submit</button>


        {/* <main className='login-page' style={{display: 'none'}}>
            <div className='login-slider'>
                <div className='login-list'>
                    <div className='signin-form'>
                        <div className='signin-header'>
                        <h1>Đăng nhập</h1>
                        <p>Vui lòng nhập thông tin đăng nhập của bạn</p>
                        </div>
                        <div className='signin-input'> 
                            <div className=''>
                            <label htmlFor='username'>Username</label>
                            <input type='text' id='username' name='username' required />
                            </div>

                            <div className=''>
                                <label htmlFor='password'>Password</label>
                                <input type='password' id='password' name='password' required />
                            </div>

                            <button type='submit' className=''>Đăng nhập</button>
                        </div>
                    </div>

                    <div className='signup-form'>
                        
                        <div className='signup-input'> 
                            <div className=''>
                                <label htmlFor='username'>Username</label>
                                <input type='text' id='username' name='username' required />
                            </div>

                            <div className=''>
                                <label htmlFor='password'>Password</label>
                                <input type='password' id='password' name='password' required />
                            </div>

                            <div className=''>
                                <label htmlFor='password'>Password Confirm</label>
                                <input type='password' id='password' name='password' required />
                            </div>

                            <div className=''>
                                <label htmlFor='password'>Password Confirm</label>
                                <input type='password' id='password' name='password' required />
                            </div>

                            <button type='submit' className=''>Đăng ký</button>
                        </div>
                        <div className='signup-header'>
                            <h1>Đăng ký</h1>
                            <p>Vui lòng nhập thông tin đăng nhập của bạn</p>
                        </div>
                    </div>
                </div>
            </div>
        </main> */}
        </div>

    )
}
export default Login;