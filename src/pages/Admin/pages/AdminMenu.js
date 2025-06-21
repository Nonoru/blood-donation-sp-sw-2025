import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import title from '../../../assets/logo/title.png'
import '../styles/AdminMenu.scss'
import { path } from 'framer-motion/client';

const items = [
    { id: 1, name: 'Thống kê', path: '/admin/' },

    {
        id: 2, name: 'Tài khoản', path: '/admin/manage',
        child: [
            { id: 2.1, name: 'Tài khoản nhân viên', path: '/accounts' },
            { id: 2.2, name: 'Vai trò', path: '/roles' },
        ]
    },
    {
        id: 3, name: 'Dịch vụ', path: '/admin/manage',
        child: [
            { id: 3.1, name: 'Đơn yêu cầu hiến máu', path: '/orders/donate' },
            { id: 3.2, name: 'Lịch hẹn hiến máu' },
            { id: 3.3, name: 'Lịch sử đơn hiến máu' },
            { id: 3.4, name: 'Đơn yêu cầu nhận máu' },
            { id: 3.5, name: 'Lịch hẹn nhận máu' },
            { id: 3.6, name: 'Lịch sử nhận máu' },
        ]
    },
    {
        id: 4, name: 'Kho',
        child: [
            { id: 4.1, name: 'Kho vật tư' },
            { id: 4.2, name: 'Ngân hàng máu' },
        ]
    }
]
function AdminMenu() {
    const [itemShow, setItemShow] = useState(new Array(items.length).fill(false));

    const clickItem = (index) => {
        setItemShow(prev =>
            prev.map((val, i) => i === index ? !val : val)
        )
    };

    return (
        <nav className="admin-navbar">
            <img src={title} />
            {items.map((item) => (
                <ul
                    key={item.id}
                    className={`menu-group ${itemShow[item.id - 1] ? 'active' : ''}`}
                >
                    <div className="menu-title"
                        onClick={() => clickItem(item.id - 1)}
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
                                key={child.id}
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