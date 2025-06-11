export const LoginInput = ({handleChangeLogin, formLogin}) => {
    const inputs = [
        {key: 1, type: 'type', name: 'tk', detail: 'Tên tài khoản hoặc gmail'},
        {key: 2, type: 'password', name: 'password', detail: 'Mật khẩu'},
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