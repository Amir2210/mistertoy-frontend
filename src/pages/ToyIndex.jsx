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

async function onRemoveToy(toyId) {
  try {
    await removeToyOptimistic(toyId)
           showSuccessMsg('Toy removed')  
  } catch (error) {
    console.log('Cannot remove toy', error)
    showErrorMsg('Cannot remove toy')
  }
}

async function onAddToy() {
  let toyName = prompt('enter a toy name')
  if(toyName === '') toyName = toyService.getRandomDollName()
  const toyToSave = toyService.getEmptyDefaultToy( toyName)
try {
  await saveToy(toyToSave)
  showSuccessMsg(`Toy added (toy: ${toyToSave.name})`)
  console.log('savedToy:', toyToSave)
  // dispatch({ type: ADD_CAR, toy: toyToSave })
} catch (error) {
  console.log('Cannot add toy', error)
  showErrorMsg('Cannot add toy')
}
}

 async function onEditToy(toy) {
  const price = +prompt('New price?')
  const toyToSave = { ...toy, price }
  try {
    await saveToy(toyToSave)
    console.log('toyToSave:', toyToSave)
    showSuccessMsg(`Toy updated to price: $${toyToSave.price}`)
  } catch (error) {
    console.log('Cannot update toy', error)
    showErrorMsg('Cannot update toy')
  }
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
