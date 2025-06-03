export const loginForm = () => {
    const inputs = [
        {key: 1, type: 'text', name: 'username', detail: 'Tài khoản'},
        {key: 2, type: 'password', name: 'password', detail: 'Mật khẩu'},
    ]
    return(
        inputs.map(i => (
            <label key={i.key} htmlFor={i.name} className='input-child'>
                <p>{i.detail}</p>
                <input type={i.type} id={i.name} name={i.name}/>
            </label>
        ))
    )
}