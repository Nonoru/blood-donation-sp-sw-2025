const inputs = [
    {type: 'text', name:'username', detail:'Tài khoản'},
    {type: 'password', name: 'password', detail: 'Mật khẩu'},
    {type: 'password', name: 'passwordConfirm', detail: 'Nhập lại mật khẩu'},
    {type: 'text', name: 'email', detail:'Email'},
    {type: 'text', name: 'fullName', detail:'Họ tên'},
    {type: 'text', name: 'roleId', detail:'Vai trò'},
]
export const AdminAddAccount = ({formData, handleChange}) => {
    return (
        inputs.map(i => (
            <label
                key={i.name}
                className={`${i.name === 'roleId' ? 'label-role' : ''}`}
            >
                <span>{i.detail}</span>
                {i.name !== "roleId" &&
                    <input 
                        type={i.type}
                        value={formData[i.name]}
                        name={i.name}
                        onChange={ e => handleChange(e)}
                    />
                }
                {i.name === "roleId" && 
                    <select name="roleId" value={formData[i.name]} onChange={e => handleChange(e)} >
                        <option value="1">Admin</option>
                        <option value="2">Staff</option>
                    </select>
                }
            </label>
        ))
    )
}