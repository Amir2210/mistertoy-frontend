import { Link } from "react-router-dom"
import { toyService } from '../services/toy.service.js'
export function ToyPreview({toy, onRemoveToy, onEditToy, user}){
//   console.log('toy:', toy)
const fallbackImg = "https://res.cloudinary.com/dxm0sqcfp/image/upload/v1704134967/w2oux0x3q0knil68y5u6.png"
  return (
    <li className="toy-preview" key={toy._id}>
        <Link to={`/toy/${toy._id}`} >
            <h4>{toy.name}</h4>
            <img src={toy.photo || fallbackImg} alt={toy.name} 
            onError={event => {
            event.target.src = { fallbackImg }
            event.onerror = null}} />
        </Link>
        <p>Price: <span>${toy.price.toLocaleString()}</span></p>
        <p>In stock:{toy.inStock ? '✅' : '❌'}</p>
        <div>
        {user && user.isAdmin && (
            <>
             <button onClick={() => {
                onRemoveToy(toy._id)
            }}>x</button>           
<button><Link to={`/toy/edit/${toy._id}?`}>Edit</Link></button>
            </>
        )}

<button><Link to={`/toy/${toy._id}?`}>Details</Link></button>
        </div>
        {/* <button className="buy" onClick={() => {
            addToCart(car)
        }}>Add to Cart</button> */}

    </li>
)
}