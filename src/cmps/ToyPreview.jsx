import { Link } from "react-router-dom"
export function ToyPreview({toy, onRemoveToy, onEditToy}){
//   console.log('toy:', toy)
  return (
    <li className="car-preview" key={toy._id}>
        <Link to={`/toy/${toy._id}`} >
            <h4>{toy.name}</h4>
            <h1>🧸</h1>
        </Link>
        <p>Price: <span>${toy.price.toLocaleString()}</span></p>
        <div>
             <button onClick={() => {
                onRemoveToy(toy._id)
            }}>x</button>

            {/* <button onClick={() => {
                onEditToy(toy)
            }}>Edit</button>  */}
<button><Link to={`/toy/edit/${toy._id}?`}>Edit</Link></button>
<button><Link to={`/toy/${toy._id}?`}>Details</Link></button>
        </div>
        {/* <button className="buy" onClick={() => {
            addToCart(car)
        }}>Add to Cart</button> */}

    </li>
)
}