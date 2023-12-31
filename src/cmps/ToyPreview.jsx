import { Link } from "react-router-dom"
import { toyService } from '../services/toy.service.js'
export function ToyPreview({toy, onRemoveToy, onEditToy, user}){
//   console.log('toy:', toy)
  return (
    <li className="toy-preview" key={toy._id}>
        <Link to={`/toy/${toy._id}`} >
            <h4>{toy.name}</h4>
            <h1>{toy.photo}</h1>
        </Link>
        <p>Price: <span>${toy.price.toLocaleString()}</span></p>
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