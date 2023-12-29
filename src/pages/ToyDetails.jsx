import { toyService } from '../services/toy.service.js'
import { useEffect, useState } from 'react'
import {useNavigate,useParams } from 'react-router-dom'
export function ToyDetails(){
  const [toy, setToy] = useState(null)
  const { toyId } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    loadToy()
}, [])

async function loadToy() {
try {
   const toy = await toyService.getById(toyId)
   setToy(toy)
} catch (error) {
  console.log('error:', error)
  navigate('/')
}
}

function onBack() {
  navigate('/toy')
}

if (!toy) return <div>Loading...</div>
  return (
    <section className='toy-details'>
            <h1>Toy Name: {toy.name}</h1>
            <h1>Toy Price: {toy.maxPrice}</h1>
            <h2>Toy Labels: </h2>
            {toy.labels.map((label, index) =>{
               return <h4 key={index}>{label}</h4>
            })}
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis quae fuga eveniet, quisquam ducimus modi optio in alias accusantium corrupti veritatis commodi tenetur voluptate deserunt nihil quibusdam. Expedita, architecto omnis?</p>
            <button onClick={onBack}>Back</button>
    </section>
  )
}