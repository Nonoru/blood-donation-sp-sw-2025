import { useState } from "react"
const inputs = [
    {type: 'text', name:'username', detail:'Tài khoản', require:'Username phải có độ dài từ 6-12 và không chứa kí tự đặc biệt'},
    {type: 'password', name: 'password', detail: 'Mật khẩu', require:'Mật khẩu phải có độ dài từ 6-12 và không chứa lạ và khoảng trắng'},
    {type: 'password', name: 'passwordConfirm', detail: 'Nhập lại mật khẩu'},
    {type: 'email', name: 'email', detail:'Email', require:'Nhập địa chỉ có đinh dạng của một email'},
]

export const RegisterInput = ({formData, handleChange, /*errorByUser*/}) =>{
    const [showPass, setShowPass] = useState(false)
    return(
        inputs.map(i => (
            <label key={i.name} htmlFor={i.name} className='input-child'>
                <p>{i.detail}</p>
                <input 
                    type={i.name !== 'password' ? i.type: (showPass ? 'text':'password')} 
                    id={i.name} 
                    value={formData[i.name]}
                    name = {i.name}
                    onChange={e => handleChange(e)}
                />
                {/* {errorByUser[i.name] && 
                    <div className="error-input"></div>
                } */}
                {i.require && 
                    <div className={`guide ${showPass  && i.name === 'password' ? 'show' : ''}`} 
                        onClick={() => {
                            if(i.name === 'password'){
                                setShowPass(prev => !prev) 
                            }}} 
                        style={{
                            backgroundImage : i.type !== 'password' ? 
                                `url("/img/icons/${i.name}guide.svg")` :  (showPass ? 
                                    `url("/img/icons/passwordguideshow.svg")`: `url("/img/icons/${i.name}guide.svg")`) }}
                    >
                        <div className="guide-text">{i.require}</div>
                    </div>
                }
            </label>
        ))
    )
}