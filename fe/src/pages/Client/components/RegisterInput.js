import { useState } from "react"
const inputs = [
    {type: 'text', name:'username', detail:'Tài khoản', require:'Username phải có độ dài từ 6-12 và không chứa kí tự đặc biệt'},
    {type: 'password', name: 'password', detail: 'Mật khẩu', require:'Mật khẩu phải có độ dài từ 6-12 và không chứa lạ và khoảng trắng'},
    {type: 'password', name: 'passwordConfirm', detail: 'Nhập lại mật khẩu', require:'Nhập lại mật khẩu chính xác'},
    {type: 'text', name: 'email', detail:'Email', require:'Nhập địa chỉ có đuôi @gmail.com'},
    {type: 'text', name:'fullName', detail:'Họ và tên', require:''},
]

export const RegisterInput = ({formData, handleChange, /*errorByUser*/}) =>{
    const [showPass, setShowPass] = useState(false)
    const [showPassConfirm, setShowPassConfirm] = useState(false)
    return(
        inputs.map(i => (
            <label key={i.name} htmlFor={i.name} className='input-child'>
                <input 
                    type={i.name !== 'password' ? (i.name != 'passwordConfirm' ?  i.type : showPassConfirm ? 'text':'password' ):(showPass ? 'text':'password')} 
                    id={i.name} 
                    value={formData[i.name]}
                    name = {i.name}
                    placeholder={i.detail}
                    onChange={e => handleChange(e)}
                />
                {/* {errorByUser[i.name] && 
                    <div className="error-input"></div>
                } */}
                {i.require && 
                    <div className={`guide ${showPass  && i.name === 'password' ? 'show' : ''}  ${showPassConfirm && i.name === 'passwordConfirm' ? 'show' : ''}`} 
                        onClick={() => {
                            if(i.name === 'password'){
                                setShowPass(prev => !prev) 
                            }else if(i.name === 'passwordConfirm')
                                setShowPassConfirm(prev => !prev)
                            }} 
                        style={{
                            backgroundImage: (() => {
                                if (i.name === 'password') {
                                    return showPass ? 'url("/img/icons/passwordguideshow.svg")' : 'url("/img/icons/passwordguide.svg")';
                                }
                                else if (i.name === 'passwordConfirm') {
                                    return showPassConfirm ? 'url("/img/icons/passwordguideshow.svg")' : 'url("/img/icons/passwordguide.svg")';
                                }
                                return `url("/img/icons/${i.name}guide.svg")`;
                            })()
                            }}
                    >
                        <div className="guide-text">{i.require}</div>
                    </div>
                }
            </label>
        ))
    )
}