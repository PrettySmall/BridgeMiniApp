import NavItem from './NavItem'

const BottomMenus = [
  {
    name: "Tasks",
    path: "/tasks",
    icon: "tasks",
  },
  {
    name: "Boost",
    path: "/boosts",
    icon: "boosts",
  },
  {
    name: "Home",
    path: "/",
    icon: "home",
  },
  {
    name: "Frens",
    path: "/friends",
    icon: "friends",
  },
  {
    name: "Rank",
    path: "/rank",
    icon: "rank",
  },
  {
    name: "Exchnage",
    path: "/exchange",
    icon: "rank",
  }
]

export default function BottomNavbar() {
  return (
    <nav className="bg-[#131212] rounded-lg mx-6 flex px-8 h-[45px] justify-between items-center">
      {BottomMenus.map((item) => (
        <NavItem key={item.name} menu={item} />
      ))}
    </nav>
  )
}
