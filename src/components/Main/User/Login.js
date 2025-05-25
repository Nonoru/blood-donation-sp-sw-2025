import './Login.scss';
function Login() {
    return (
        <main className='login-page'>
            <section className='login-section row'>
                <div className='login-form col-6'>
                    <div className='form-title'>
                        <h1>Đăng nhập</h1>
                    </div>
                    <form>
                        <div className='form-group'>
                            <label htmlFor='username'>Tên đăng nhập</label>
                            <input type='text' id='username' name='username' required />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'>Mật khẩu</label>
                            <input type='password' id='password' name='password' required />
                        </div>
                        <button type='submit'>Đăng nhập</button>
                    </form>
                </div>
            </section>
        </main>
    )
}
export default Login