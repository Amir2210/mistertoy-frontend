
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
// import './assets/style/main.css'
import './assets/style/main.scss'

import { AppHeader } from './cmps/AppHeader'
// import { AppFooter } from './cmps/AppFooter'

import { HomePage } from './pages/HomePage'
import { AboutUs } from './pages/AboutUs'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { store } from './store/store'
import { ToyEdit } from "./pages/ToyEdit.jsx"
import { ToyDetails } from './pages/ToyDetails.jsx'
import { MyChart } from './pages/MyChart.jsx'
import { Map } from './pages/Map.jsx'


export function App() {
  return (
    <Provider store={store}>
    <Router>
      {/* <section className='main-layout app'> */}
      <section className='main-layout'>
        <AppHeader />
        <main>
          <Routes>
            <Route element={<HomePage />} path='/' />
            <Route element={<AboutUs />} path='/about' />
            <Route element={<ToyIndex />} path='/toy' />
            <Route element={<ToyEdit />} path="/toy/edit/:toyId"  />
            <Route element={<ToyDetails />} path='/toy/:toyId' />
            <Route element={<MyChart />} path='/toyCharts' />
            <Route element={<Map />} path='/map' />
          </Routes>
        </main>
        {/* <AppFooter /> */}
      </section>
    </Router>
     </Provider>
  )
}

// export default App
