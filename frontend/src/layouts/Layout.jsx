import { Outlet } from 'react-router-dom'

export default function Layout() {

  return (
    <main className="h-screen text-foreground">
      <img src='/images/common/background.png' className='fixed top-0 -z-10 w-screen h-screen' alt='effect' />
      <img src='/images/common/effect.png' className='fixed top-0 -z-10 w-screen h-screen' alt='effect' />
      <Outlet />
      {/* {!hiddenNavBar && <BottomNavbar />} */}
    </main>
  )
}
