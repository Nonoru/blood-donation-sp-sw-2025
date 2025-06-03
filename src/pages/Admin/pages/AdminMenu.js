import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../styles/AdminMenu.scss'

const items = [
    {id: 1, name: 'Thống kê', path: '/statistic'},

    {id: 2, name: 'Tài khoản', path: '/account',
        child: [
            {id: 2.1, name: 'Danh sách', path: '/list-accounts'},
            {id: 2.2, name: 'Vai trò'},
            {id: 2.3, name: 'Phân quyền'}
        ]
    },
    {id: 3, name: 'Dịch vụ',
        child: [
            {id: 3.1, name: 'Đơn hiến máu'},
            {id: 3.2, name: 'Đơn nhận máu'},
        ]
    },
    {id: 4, name: 'Kho',
        child: [
            {id: 4.1, name: 'Kho vật tư'},
            {id: 4.2, name: 'Ngân hàng máu'},
        ]
    }
]
function AdminMenu() {
//   const [curClick, setCurClick] = useState(null);

//   const clickItem = (id) => {
//     if(id === curClick)
//        return setCurClick(null)
//     setCurClick(id);
//   };

    const [itemShow, setItemShow] = useState(new Array(items.length).fill(false));

    const clickItem = (index) => {
    setItemShow(prev => 
            prev.map((val, i) => i === index ? !val : val)
        )
    };

    return (
        <nav className="admin-navbar">
            <img src='/img/title.png'/>
            {items.map((item) => (
                <ul 
                    key={item.id} 
                    className={`menu-group ${itemShow[item.id-1]  ? 'active' : ''}`}
                >
                    <div className="menu-title"
                        onClick={() => clickItem(item.id-1)}
                    >
                        {
                            item.id === 1 ? 
                                <Link to={item.path}>
                                    {item.name}
                                </Link>
                                : item.name
                        }
                    </div>

                    { 
                        item.child && (item.child).map((child) => (
                            <li
                                key= {child.id}
                                className={`menu-item`}
                            >
                                <Link to={`${item.path}${child.path}`}>
                                    {child.name}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            ))}
        </nav>
    );
}
export default AdminMenu