import { useEffect, useState } from "react"
import * as AdminRequest from "../services/AdminRequest"
import { AdminAddAccount } from "../components/AdminAddAccount"
import '../styles/AdminListAccount.scss'

const attrTableHead = ['Mã tài khoản','Tên tài khoản','Địa chỉ Email', 'Vai trò']

function AdminListAccount(){
    const [userAccounts, setUserAccounts] = useState([])
    const [empAccounts, setEmpAccounts] = useState([])
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        const getList = async () => {
            try{
                const response = await AdminRequest.listAccount()
                const userList = []
                const empList = []
                response.data.map( acc => {
                    if(acc.roleId === 3){
                        userList.push(acc)
                    }else{
                        empList.push(acc)
                    }
                    setUserAccounts(userList)
                    setEmpAccounts(empList)
                } )
            }catch{

            }
        }
        getList();
    }, [refreshKey]);

    const [stateAddBtn, setStateAddBtn] = useState(false)
    return(
        <div className="list-account-page">  
            <div className="form-add-account" style={{display: stateAddBtn ? 'block':'none'}}>
                <AdminAddAccount/>   
                <button type="none" onClick={e => setStateAddBtn(!stateAddBtn)}>Thoát</button>
            </div>
            {/* <button onClick={e => console.log(userAccounts)}>test</button> */}
            <div style={{pointerEvents : stateAddBtn ? 'none':'auto', filter: stateAddBtn ? 'blur(1px)' : 'none'}}>
                Đây là bảng nhân viên
                <button onClick={e => setStateAddBtn(!stateAddBtn)}>Thêm tài khoản nhân viên</button>
                <table>
                    <thead>
                        <tr>
                            {attrTableHead.map((a, index) => (
                                <th key={index}> {a} </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            empAccounts.map( acc =>
                                <tr key={acc.id}>
                                    <th>{acc.id}</th>
                                    <th>{acc.username}</th>
                                    <td>{acc.email}</td>
                                    <td>{acc.roleName}</td>
                                    <td><button>Chỉnh sửa</button></td>
                                </tr>
                            )
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Số lượng tài khoản</td>
                            <td>{empAccounts.length}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <br/>
            <div style={{pointerEvents : stateAddBtn ? 'none':'auto', filter: stateAddBtn ? 'blur(1px)' : 'none'}}>
                Đây là bảng user
                <table>
                    <thead>
                        <tr>
                            {attrTableHead.map((a, index) => (
                                <th key={index}> {a} </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userAccounts.map( acc =>
                                <tr key={acc.id}>
                                    <th>{acc.id}</th>
                                    <th>{acc.username}</th>
                                    <td>{acc.email}</td>
                                    <td>{acc.roleName}</td>
                                </tr>
                            )
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Số lượng tài khoản</td>
                            <td>{userAccounts.length}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}
export default AdminListAccount