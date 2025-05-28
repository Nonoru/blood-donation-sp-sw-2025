import { useState } from "react"

const inputs = [
    {type: 'text', name:'username', detail:'Tài khoản'},
    {type: 'password', name: 'password', detail: 'Mật khẩu'},
    {type: 'email', name: 'email', detail:'Email'},
    {type: 'text', name: 'phone', detail:'Số điện thoại'}
]
export const RegisterForm = ({formData, handleChange}) => {
    return(
        inputs.map(i => (
            <label key={i.key} htmlFor={i.name} className='input-child'>
                <p>{i.detail}</p>
                <input type={
                    i.type} 
                    id={i.name} 
                    name={i.name} 
                    value={formData[i.name]}
                    onChange={e => handleChange(e)}
                    />
            </label>
            
        ))
    )
}