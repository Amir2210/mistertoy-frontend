// const { useState, useEffect } = React
// const { useSelector, useDispatch } = ReactRedux

import { useDispatch, useSelector } from 'react-redux'
import { CarFilter } from '../cmps/CarFilter.jsx'
import { CarList } from '../cmps/CarList.jsx'
import { carService } from '../services/car.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadCars, removeCar, removeCarOptimistic, saveCar, setFilterBy } from '../store/actions/car.actions.js'
import { ADD_CAR_TO_CART } from '../store/reducers/car.reducer.js'
import { useEffect } from 'react'

export function CarIndex() {
    const dispatch = useDispatch()
    const cars = useSelector(storeState => storeState.carModule.cars)
    const cart = useSelector(storeState => storeState.carModule.shoppingCart)
    const isLoading = useSelector(storeState => storeState.carModule.isLoading)
    const filterBy = useSelector(storeState => storeState.carModule.filterBy)

    useEffect(() => {
        loadCars()
            .catch(() => {
                showErrorMsg('Cannot show cars')
            })
    }, [filterBy])

    function onRemoveCar(carId) {
        removeCarOptimistic(carId)
            .then(() => {
                showSuccessMsg('Car removed')
            })
            .catch(err => {
                console.log('Cannot remove car', err)
                showErrorMsg('Cannot remove car')
            })
    }

    function onAddCar() {
        const carToSave = carService.getEmptyCar()
        saveCar(carToSave)
            .then((savedCar) => {
                console.log('savedCar:', savedCar)
                showSuccessMsg(`Car added (vendor: ${savedCar.vendor})`)
                // dispatch({ type: ADD_CAR, car: savedCar })
            })
            .catch(err => {
                console.log('Cannot add car', err)
                showErrorMsg('Cannot add car')
            })
    }

    function onEditCar(car) {
        const price = +prompt('New price?')
        const carToSave = { ...car, price }

        saveCar(carToSave)
            .then((savedCar) => {
                // dispatch({ type: UPDATE_CAR, car: savedCar })
                showSuccessMsg(`Car updated to price: $${savedCar.price}`)
            })

            .catch(err => {
                console.log('Cannot update car', err)
                showErrorMsg('Cannot update car')
            })
    }

    function onSetFilter(filterBy) {
        console.log('filterBy:', filterBy)
        // setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
        setFilterBy(filterBy)
    }

    function addToCart(car) {
        console.log('car:', car)
        console.log(`Adding ${car.vendor} to Cart`)
        dispatch({ type: ADD_CAR_TO_CART, car })
        showSuccessMsg('Added to Cart')
    }


    return (
        <div>
            <h3>Cars App</h3>
            <main>
                <button onClick={onAddCar}>Add Car ⛐</button>
                <CarFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                {!isLoading && <CarList
                    cars={cars}
                    onEditCar={onEditCar}
                    onRemoveCar={onRemoveCar}
                    addToCart={addToCart}
                    txt={'999'}
                    nums={[1, 2, 3]}
                />}
                {isLoading && <div>Loading...</div>}
                <hr />
                <pre>{JSON.stringify(cart, null, 2)}</pre>
            </main>
        </div>
    )

}