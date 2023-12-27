import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ToyList } from '../cmps/ToyList.jsx'
import { loadToys, removeToyOptimistic, saveToy, setFilterBy} from '../store/actions/toy.actions.js'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToySort } from '../cmps/ToySort.jsx'
import Button from '@mui/material/Button';
export function ToyIndex() {

  const dispatch = useDispatch()
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)
  const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
  // const [filterBy, setFilterBy] = useState(toyService.getDefaultFilterBy())
  const [sort, setSort] = useState(toyService.getDefaultSort())

 function ButtonUsage() {
    return <Button variant="contained">Hello world</Button>
  }
  useEffect(() => {
    loadToys(sort)
        .catch(() => {
            showErrorMsg('Cannot show toys')
        })
}, [filterBy, sort])

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
  let toyName = prompt('enter a toy name')
  if(toyName === '') toyName = toyService.getRandomDollName()
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

function onSetFilter(filterBy) {
  // console.log('filterBy:', filterBy)
  setFilterBy(filterBy)
}

function onSetSort(sort) {
  setSort(sort)
}

  return (
    <div>
      {/* <ButtonUsage /> */}
      
      <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter}/>
      <ToySort sort={sort} onSetSort={onSetSort} />
      <main>
        <button onClick={onAddToy}>Add Toy 👽</button>
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
