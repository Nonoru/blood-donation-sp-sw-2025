export const LoginInput = ({handleChangeLogin, formLogin}) => {
    const inputs = [
<<<<<<< HEAD
        {key: 1, type: 'text', name: 'email', detail: 'Email', placeholder: 'Email'},
        {key: 2, type: 'password', name: 'password', detail: 'Password', placeholder: 'Password'},
=======
        {key: 1, type: 'type', name: 'tk', detail: 'Tên tài khoản hoặc gmail'},
        {key: 2, type: 'password', name: 'password', detail: 'Mật khẩu'},
>>>>>>> 559887d6f24e4a74a5cc597964dabafa2b21e017
    ]
    return(
        inputs.map(i => (
            <label key={i.key} className='input-field'>
                <input 
                    type={i.type} 
                    id={i.name} 
                    name={i.name}
                    placeholder={i.detail}
                    value={formLogin[i.name]}
                    onChange={e => handleChangeLogin(e)}
                    // autoComplete={i.type === 'password' ? 'current-password' : 'email'}
                />
            </label>
        ))
    )
}