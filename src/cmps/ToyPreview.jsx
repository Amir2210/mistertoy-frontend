import { Link } from "react-router-dom"
export function ToyPreview({toy, onRemoveToy}){
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
                onEdittoy(toy)
            }}>Edit</button>  */}
        </div>
        {/* <button className="buy" onClick={() => {
            addToCart(car)
        }}>Add to Cart</button> */}

    </li>
)
}