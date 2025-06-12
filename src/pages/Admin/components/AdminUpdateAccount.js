const inputs = [
    {type: 'text', name: 'id', detail:'ID'},
    {type: 'text', name:'username', detail:'Tài khoản'},
    {type: 'password', name: 'password', detail: 'Mật khẩu mới'},
    {type: 'password', name: 'passwordConfirm', detail: 'Nhập lại mật khẩu mới'},
    {type: 'text', name: 'email', detail:'Email'},
    {type: 'text', name: 'fullName', detail:'Họ tên'},
    {type: 'text', name: 'roleId', detail:'Vai trò'},
]
export const AdminUpdateAccount = ({formUpdData}) => {
    return (
        inputs.map(i => (
            <label
                key={i.name}
                className={`${i.name === 'roleId' ? 'label-role' : ''}`}
            >
                <span>{i.detail}<br/>
                    {i.name === 'id' && formUpdData[i.name]}
                    {i.name === 'username' && formUpdData[i.name]}
                </span>
                {(i.name !== "roleId" && i.name !=="id" && i.name !=="username") &&
                    <input 
                        type={i.type}
                        value={formUpdData[i.name]}
                        name={i.name}
                        // onChange={ e => handleChange(e)}
                    />
                }
                {i.name === "roleId" && 
                    <select name="roleId" 
                        // value={formData[i.name]} onChange={e => handleChange(e)} 
                    >
                        <option value="1">Admin</option>
                        <option value="2">Staff</option>
                    </select>
                }
            </label>
        ))
    )
}