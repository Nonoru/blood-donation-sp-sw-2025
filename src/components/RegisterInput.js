import { useState } from "react"
const inputs = [
    {key: 1, type: 'text', name:'username', detail:'Tài khoản'},
    {key: 2, type: 'password', name: 'passwordConfirm', detail: 'Nhập lại mật khẩu'},
    {key: 3, type: 'password', name: 'password', detail: 'Mật khẩu'},
    {key: 4, type: 'email', name: 'email', detail:'Email'}
]
export const RegisterInput = ({formData, handleChange}) =>{
    return(
        inputs.map(i => (
            <label key={i.key} htmlFor={i.name} className='input-child'>
                <p>{i.detail}</p>
                <input 
                    type={i.type} 
                    id={i.name} 
                    value={formData[i.name]}
                    name = {i.name}
                    onChange={e => handleChange(e)}
                />
            </label>
        ))
    )
    

}