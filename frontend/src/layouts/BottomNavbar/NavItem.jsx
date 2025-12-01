import { useLocation, Link } from 'react-router-dom'

function NavItem({menu}) {
  const { pathname } = useLocation()

  const active = pathname === menu.path

  return (
    <Link to={menu.path}>
      <button className={`flex flex-col justify-center items-center h-[36px] w-[36px] ${active ? 'bg-active rounded-[5px]' : 'text-[#888888]'}`}>
        <img src={`/images/common/${menu.icon}${active ? '_active' : ''}.svg`} className='h-[16px]'  alt={menu.name}/>
        <p className="text-[8px] mt-1 leading-[8px]">{menu.name}</p>
      </button>
    </Link>
  )
}

export default NavItem
