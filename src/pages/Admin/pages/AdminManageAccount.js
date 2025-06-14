import { useEffect, useState } from "react"
import * as AdminRequest from "../services/AdminRequest"
import { toast } from 'react-toastify';
import { AdminAddAccount } from "../components/AdminAddAccount"
import { AdminUpdateAccount } from "../components/AdminUpdateAccount"
import '../styles/AdminManageAccount.scss'

const attrTableHead = ['ID','Tên tài khoản','Địa chỉ Email','Họ và tên', 'Vai trò', 'Ngày tạo']

function AdminManageAccount(){
    const [userAccounts, setUserAccounts] = useState([])
    const [empAccounts, setEmpAccounts] = useState([])
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        const getList = async () => {
            try{
                const response = await AdminRequest.listAccount()
                const userList = []
                const empList = []
                response.data.data.map( acc => {
                    if(acc.role.roleId === 3){
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

    const getList = async () => {
        const execute = async () => {
            try {
                const res = await AdminRequest.listAccount();
                await new Promise(resolve => setTimeout(resolve, 1000));
                return res;
            } catch (err) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                throw err; 
            }
        };

        try {
            await toast.promise(
                execute(),
            {
                pending: {
                    render() {
                        return 'Đang tải danh sách tài khoản...';
                    },
                    className: 'my-toast',
                    },
                success: {
                    render({ data }) {
                        const userList = [];
                        const empList = [];

                        data.data.data.forEach(acc => {
                            if (acc.role.roleId === 3) userList.push(acc);
                            else empList.push(acc);
                        });

                        setUserAccounts(userList);
                        setEmpAccounts(empList);
                        return 'Đã tải danh sách thành công!';
                    },
                className: 'my-toast',
                },
                error: {
                    render() {
                        return 'Có lỗi xảy ra khi tải danh sách!';
                    },
                    className: 'my-toast',
                }
            }
            );
        } catch (err) {
            console.error('Lỗi khi lấy danh sách:', err);
        }
    };

    const [stateAddBtn, setStateAddBtn] = useState(false)

    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        password: '',
        passwordConfirm: '',
        email: '',
        roleId: 1
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }
    const handleCreateAccount = async (e) => {
        console.log(formData)
        e.preventDefault()
        try{
            const response = await AdminRequest.createAccount(formData);
            
            if (response.data.code === 200) {
                setFormData({
                    fullName: '',
                    username: '',
                    password: '',
                    passwordConfirm: '',
                    email: '',
                    roleId: 1
                })
                setStateAddBtn(prev => !prev)
                toast.success("Tạo tài khoản thành công", { className: 'my-toast' })
                toast.success("Tải lại trang để cập nhật", { className: 'my-toast' })
            }
        }catch(error){
            if (error.response) {
                toast.error(error.response.data.message || "Tạo tài khoản thất bại!", {className : 'my-toast'});
            } else if (error.request) {
                toast.error("Không nhận được phản hồi từ server");
            } else {
                toast.error("Lỗi không xác định", error.message, { className: 'my-toast' });
            }
        }
    }

    const [stateUpdBtn, setStateUpdBtn] = useState(false)
    const [formUpdData, setFormUpdData] = useState({
        id: '',
        fullName: '',
        username: '',
        password: '',
        passwordConfirm: '',
        email: '',
        roleId: 0
    })
    const clickToUpdForm = (e, acc) => {
        e.preventDefault()
        setStateUpdBtn(prev => !prev)
        setFormUpdData(acc)
    }
    const handleUpdAccount = (e) => {
        e.preventDefault()
        console.log(formUpdData)
    }

    const [setTable, setSetTable] = useState(false)
    const swithchBtn = () => {
        document.querySelector('.switch-btn').classList.toggle('active')
        setSetTable(prev => !prev)
    }
    return(
        <div className="list-account-page">  
            {/* BUTTON */}
            <div className={`function-btn ${stateAddBtn ? 'prevent-ui' : 'normal-ui'}`}>
                <button className="add-btn btn" onClick={e => setStateAddBtn(!stateAddBtn)}>    
                    <img src="/img/icons/add.svg"></img>
                <span>Thêm tài khoản</span>
                </button>
                
                <button className="search-btn btn" >    
                    <img src="/img/icons/search.svg"></img>
                <span>Tìm tài khoản</span>
                </button>
                <button className="refresh-btn btn" onClick= {getList} >    
                    <img src="/img/icons/refresh.svg"></img>
                    <span>Tải lại trang</span>
                </button>
                <div className="account-count">
                    <span>Số tài khoản</span>
                    {!setTable ? <span>{empAccounts.length}</span> : <span>{userAccounts.length}</span>}
                </div>
                
                <button onClick={swithchBtn} className={`switch-btn ${stateAddBtn ? 'prevent-ui' : 'normal-ui'}`}>
                    <div></div>
                    <span>Emp</span>
                    <span>User</span>
                </button>
            </div>
            {/* CREATE */}
            <div className="form-create-container" style={{display: stateAddBtn ? 'block':'none'}}>
                <h2>Tạo tài khoản mới</h2>
                <div className="form-create">
                    <AdminAddAccount formData={formData} handleChange={handleChange}/>   
                    <button type="none" onClick={handleCreateAccount}>Tạo tài khoản</button>
                </div>
                <button type="none" className="close-btn" onClick={e => setStateAddBtn(!stateAddBtn)}>
                </button>
            </div>
            {/* UPDATE */}
            <div className="form-update-container" style={{display: stateUpdBtn ? 'block':'none'}}>
                <h2>Tạo tài khoản mới</h2>
                <div className="form-upd">
                    <AdminUpdateAccount formUpdData={formUpdData}/>   
                    <button type="none" onClick={handleUpdAccount}>Cập nhật tài khoản</button>
                </div>
                <button type="none" className="close-btn" onClick={e => setStateUpdBtn(!stateUpdBtn)}>
                </button>
            </div>
            {/* TABLE EMPLOYEE */}
            <div className={`
                        ${stateAddBtn ? 'prevent-ui' : 'normal-ui'}
                        ${setTable === true && 'hide-table'}
                    `}
            >
                <p>Danh sách nhân viên</p>
                <table>
                    <thead>
                        <tr>
                            {attrTableHead.map((a, index) => (
                                <th key={index}> {a} </th>
                            ))}
                            <th>Chỉnh sửa</th>
                            <th>Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            empAccounts.map( acc =>
                                <tr key={acc.id}>
                                    <th>{acc.id}</th>
                                    <th>{acc.username}</th>
                                    <td>{acc.email}</td>
                                    <th>{acc.fullName}</th>
                                    <th>{acc.role.roleName}</th>
                                    <th>{acc.createAt}</th>
                                    <td>
                                        <button onClick={e => clickToUpdForm(e, acc)}>
                                            Chỉnh sửa
                                        </button>
                                    </td>
                                    <td>
                                        <button className="delete-btn" >    
                                            <img src="/img/icons/delete.svg"></img>
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

            <div className={`${setTable === false && 'hide-table'}
                 ${stateAddBtn ? 'prevent-ui' : 'normal-ui'}`}
            >
            <p>Danh sách người dùng</p>
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
                                <th>{acc.fullName}</th>
                                <th>{acc.role.roleName}</th>
                                <th>{acc.createAt}</th>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
        </div>
    )
}
export default AdminManageAccount 