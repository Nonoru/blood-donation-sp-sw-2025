const inputs = [
    {id: 'upd-1', type: 'text', name: 'id', detail:'ID'},
    {id: 'upd-2', type: 'text', name:'username', detail:'Tài khoản'},
    {id: 'upd-5', type: 'text', name: 'email', detail:'Email'},
    {id: 'upd-6', type: 'text', name: 'fullName', detail:'Họ tên'},
    {id: 'upd-7', type: 'text', name: 'roleId', detail:'Vai trò'},
]
export const AdminUpdateAccount = ({formUpdData, handleUpdChange}) => {
    return (
        inputs.map(i => (
            <label
                key={i.id}
                className={`${i.name === 'roleId' ? 'label-role' : ''}`}
            >
                {i.name === 'id' || i.name === 'username' ?
                 <div className="flex items-center gap-2 ">
                    <span>{i.detail}</span>
                    <span className="text-sky-700">{formUpdData[i.name]}</span>
                 </div>
                :
                 <span>{i.detail}</span> 
                }
                {(i.name !== "roleId" && i.name !=="id" && i.name !=="username") &&
                    <input 
                        type={i.type}
                        value={formUpdData[i.name] ?? ''}
                        name={i.name}
                        onChange={ e => handleUpdChange(e)}
                    />
                }
                {i.name === "roleId" && 
                    <select name="roleId" 
                        value={formUpdData[i.name]} onChange={e => handleUpdChange(e)} 
                    >
                        <option value="1">Admin</option>
                        <option value="2">Staff</option>
                    </select>
                }
            </label>
        ))
    )
}