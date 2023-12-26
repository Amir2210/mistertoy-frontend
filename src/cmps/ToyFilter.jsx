import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { useEffectUpdate } from "./customHooks/useEffectUpdate.js"
import { toyService } from '../services/toy.service.js'

const toyLabel = toyService.getLabels()
export function ToyFilter({ filterBy, onSetFilter }) {
    
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter))

    useEffectUpdate(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        if (type === 'checkbox') value = target.checked
        if (type === 'select-multiple') value = Array.from(target.selectedOptions, (option) => option.value)
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return (
        <section className="car-filter full main-layout">
            <h2>Toys Filter</h2>
            <form >
                <label htmlFor="name">Name:</label>
                <input type="text"
                    id="name"
                    name="txt"
                    placeholder="By name"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />

                <label htmlFor="maxPrice">Max price:</label>
                <input type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="By max price"
                    value={filterByToEdit.maxPrice || ''}
                    onChange={handleChange}
                />

<label className='filter-label'>
                <span className='filter-label'>Filter By</span>
                <select
                    onChange={handleChange}
                    name="labels"
                    multiple
                    value={filterByToEdit.labels || []}>
                    <option value=""> All </option>
                    <>
                        {toyLabel.map(label => <option key={label} value={label}>{label}</option>)}
                    </>
                </select>
            </label>

            <label className='filter-label'>
                <span className='filter-label'>In stock</span>
                <select
                    onChange={handleChange}
                    name="inStock"
                    value={filterByToEdit.inStock || ''}>
                    <option value=""> All </option>
                    <option value={true}>In stock</option>
                    <option value={false}>Out of stock</option>
                </select>
            </label>
            </form>

        </section>
    )
}