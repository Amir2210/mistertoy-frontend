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

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => {
                console.log('Loaded Toy:', toy);
                setToyToEdit(toy);
   
            })
            .catch(err => console.log('Error loading toy:', err));
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

    function onSaveToy(ev) {
        ev.preventDefault()
        saveToy(toyToEdit)
            .then(() => navigate('/toy'))
            .catch(err => console.log('err:', err))
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