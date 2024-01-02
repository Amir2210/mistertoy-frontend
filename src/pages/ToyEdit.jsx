import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service'
import {useNavigate,useParams } from 'react-router-dom'
import { saveToy } from '../store/actions/toy.actions'


export function ToyEdit() {
    const navigate = useNavigate()
    const { toyId } = useParams();
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    

    useEffect(() => {
        if (toyId) {
            loadToy()
        }
    }, [])

   async function loadToy() {

    try {
       const toy =  await  toyService.getById(toyId)
       setToyToEdit(toy);
    //    console.log('Loaded Toy:', toy)
    } catch (error) {
        console.log('Error loading toy:', error);
    }
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }

        setToyToEdit(prevToy => ({ ...prevToy, [field]: value }))
    }

   async function onSaveToy(ev) {
        ev.preventDefault()
        try {
            await saveToy(toyToEdit)
            navigate('/toy')
        } catch (error) {
            console.log('error:', error)
        }
    }
    const { name, price } = toyToEdit
        return (
            <section className="toy-edit">
                <h1>Edit Toy</h1>
                <form onSubmit={onSaveToy}>
                    <label htmlFor="name">Name</label>
                    <input onChange={handleChange} value={name} type="text" name="name" id="name"/>
    
                    <label htmlFor="price">Price</label>
                    <input onChange={handleChange} value={price} type="number" name="price" id="price" />
                    <button disabled={!name}>Save</button>
                </form>
    
            </section>
        )
}