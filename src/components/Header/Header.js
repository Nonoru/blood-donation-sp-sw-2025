import './Header.scss'
const items = [
  { class: 'home', name:'Trang chủ',link: ' ' },
  { class: 'blog', name:'Blog' , link: 'blog' },
  { class: 'doc', name:'Thông tin', link: 'doc' },
  { class: 'feature', name:'Tính năng', link:'feature' },
  { class: 'signin', name:'Đăng nhập', link: 'signin' },
]

const itemForward = (i) =>{
    if(i.link)
        return(
            <a href={`/${i.link}`} >
                {(i.class !== 'signin' && i.class !== 'signup') 
                && <img src={`./img/${i.class}.svg`}/>
                }
                <span>{i.name}</span>
            </a>
        );
    return 'Error'
}

function Header(){
    return(
        <header className="row m-0">
            <div className='logo col-6 m-0 p-0 row'>
                <div className='img-logo col-2'>
                    <img src='./img/logo.png' className='col-2 p-0'/>
                </div>
                <div className='logo-title col-3 p-0'>
                    <img src='./img/title.png'/>
                </div>
                <div className='logo-search col-7 p-0'>
                    <img src='./img/search.svg'/>
                    <input type='text' placeholder='Tìm kiếm'/>
                </div>
            </div>
            <div className="menu col-6 p-0 m-0 row">
                {items.map( i =>(
                    <div className={`col p-0 ${i.class}`}>
                        {itemForward(i)}
                    </div>
                ))}
            </div>
        </header>
    )
}
export default Header