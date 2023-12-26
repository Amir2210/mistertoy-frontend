import { NavLink, useNavigate } from 'react-router-dom'
export function AppHeader() {
  const navigate = useNavigate()
  return (
    <header className='app-header full main-layout'>
      <section className='header-container'>
        <h1>React Toy App</h1>
        <nav className='app-nav'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/about'>About</NavLink>
          <NavLink to='/toy'>Toys</NavLink>
          <NavLink to='/toyCharts'>Toys Chart</NavLink>
          {/* <a onClick={onToggleCart} href="#">🛒 Cart</a> */}
        </nav>
      </section>
    </header>
  )
}
