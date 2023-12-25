import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ToyList } from '../cmps/ToyList.jsx'
import { loadToys, removeToyOptimistic, saveToy } from '../store/actions/toy.actions.js'
export function ToyIndex() {

  const dispatch = useDispatch()
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)
  const filterBy = useSelector(storeState => storeState.toyModule.filterBy)

  useEffect(() => {
    loadToys()
        .catch(() => {
            showErrorMsg('Cannot show toys')
        })
}, [filterBy])

function onRemoveToy(toyId) {
  removeToyOptimistic(toyId)
      .then(() => {
          showSuccessMsg('Toy removed')
      })
      .catch(err => {
          console.log('Cannot remove toy', err)
          showErrorMsg('Cannot remove toy')
      })
}

function onAddToy() {
  const toyName = prompt('enter a toy name')
  const toyToSave = toyService.getEmptyDefaultToy( toyName)
  saveToy(toyToSave)
      .then((savedToy) => {
          console.log('savedToy:', savedToy)
          showSuccessMsg(`Toy added (vendor: ${savedToy.vendor})`)
          // dispatch({ type: ADD_CAR, toy: savedToy })
      })
      .catch(err => {
          console.log('Cannot add toy', err)
          showErrorMsg('Cannot add toy')
      })
}

function onEditToy(toy) {
  const price = +prompt('New price?')
  const toyToSave = { ...toy, price }

  saveToy(toyToSave)
      .then((savedToy) => {
          // dispatch({ type: UPDATE_CAR, toy: savedToy })
          showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
      })

      .catch(err => {
          console.log('Cannot update toy', err)
          showErrorMsg('Cannot update toy')
      })
}

  return (
    <div>
      <h3>Toys App</h3>
      <main>
        <button onClick={onAddToy}>Add Toy 🧸</button>
      {!isLoading && <ToyList
                    toys={toys}
                    onRemoveToy={onRemoveToy}
                    onEditToy={onEditToy}
                />}
                {isLoading && <div>Loading...</div>}
      </main>
    </div>
  )
}
