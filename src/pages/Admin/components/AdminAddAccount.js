const inputs = [
    {type: 'text', name:'username', detail:'Tài khoản'},
    {type: 'password', name: 'password', detail: 'Mật khẩu'},
    {type: 'email', name: 'email', detail:'Email'},
]
export const AdminAddAccount = (stateAddBtn) => {
    return (
        inputs.map(i => (
            <label>
                {i.name}
                <input type="text"/>
            </label>
        ))
    )
}