import logoPng from '../assets/img/logo.png'
import { useDispatch, useSelector } from 'react-redux'

export function HomePage() {
  return (
    <section>
      <h2>home page</h2>
      <img src={logoPng} />
    </section>
  )
}
