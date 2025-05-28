import { Link } from 'react-router-dom';
export const items = [
    { key: 1, class: 'blog', name:'Blog' , path: 'blog' },
    { key: 2, class: 'doc', name:'Nghiên cứu', path: 'doc' },
    { key: 3, class: 'feature', name:'Tính năng', path:'feature' },
    { key: 4, class: 'login', name:'Đăng nhập', path: 'login' },
]
export const itemMenu = (a,b) => {
    return(
        items.slice(a,b).map( i => (
            <div key={i.key} className={i.class} >
                <Link to ={`/${i.path}`} className="link">
                    <img src={`/img/icons/${i.class}.svg`} className ='icon'/>
                    <span>{i.name}</span>
                </Link>
            </div>
        ))
    )
}