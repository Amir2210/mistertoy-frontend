import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { LoginSignup } from './LoginSignup.jsx'
import { logout } from '../store/actions/user.actions.js'
export function AppHeader() {
  const navigate = useNavigate()
  const user = useSelector((storeState) => storeState.userModule.loggedinUser)
  async function onLogout() {
    try {
      await logout()
      // showSuccessMsg('Logout successfully')
      navigate('/')
    } catch (err) {
      console.log('err:', err)
      // showErrorMsg('Cannot logout')
    }
  }
  return (
    <header className='app-header full '>
      <section className=''>
        <h1>Amazing Toys</h1>
        <nav className='app-nav'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/about'>About</NavLink>
          <NavLink to='/toy'>Toys</NavLink>
          <NavLink to='/toyCharts'>Toys Chart</NavLink>
          <NavLink to='/map'>Map</NavLink>
          {user && (
        <section className="user-info">
          <button onClick={onLogout}>Logout</button>
        </section>
      )}
      {!user && (
        <section className="user-info">
          <LoginSignup />
        </section>
      )}
        </nav>
      </section>
    </header>
  )
}
