export const loginForm = () => {
    const inputs = [
        {key: 1, type: 'email', name: 'email', detail: 'Email', placeholder: 'Email'},
        {key: 2, type: 'password', name: 'password', detail: 'Password', placeholder: 'Password'},
    ]
    return(
        inputs.map(i => (
            <div key={i.key} className='input-field'>
                <input 
                    type={i.type} 
                    id={i.name} 
                    name={i.name}
                    placeholder={i.placeholder}
                    autoComplete={i.type === 'password' ? 'current-password' : 'email'}
                />
            </div>
        ))
    )
}