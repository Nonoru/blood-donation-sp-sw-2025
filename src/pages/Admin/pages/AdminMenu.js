import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import title from '../../../assets/logo/title.png'
import '../styles/AdminMenu.scss'
import { path } from 'framer-motion/client';

const items = [
    { id: 1, name: 'Thống kê', path: '/admin/' },
    { id: 2, name: 'Tài khoản', path: '/admin/accounts' },

    {
        id: 3, name: 'Quản lý', path: '/admin/manage',
        child: [
            { id: 3.1, name: 'Phòng khám', path: '/clinics' },
            { id: 3.2, name: 'Lịch trình ', path: '/schedules' }, 
        ]
    },
    {
        id: 4, name: 'Dịch vụ', path: '/admin/orders',
        child: [
            { id: 4.1, name: 'Đơn yêu cầu hiến máu', path: '/donate' },
            { id: 4.2, name: 'Đơn hiến máu đã duyệt', path:'/donate/accept' },
            { id: 4.3, name: 'Lịch sử đơn hiến máu', path:'/donate/history'},
            { id: 4.4, name: 'Đơn yêu cầu nhận máu', path: '/receive'},
            { id: 4.5, name: 'Đơn nhận máu đã duyệt', path: '/receive/accept'},
            { id: 4.6, name: 'Lịch sử đơn nhận máu', path: '/receive/history'},
        ]
    },
    { id: 5, name: 'Kho máu', path: '/admin/blood' },
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
                            item.id === 1 || item.id === 2 || item.id === 5 ?
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