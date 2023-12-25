import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ToyList } from '../cmps/ToyList.jsx'
import { loadToys, removeToyOptimistic } from '../store/actions/toy.actions.js'
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

  return (
    <div>
      <h3>Toys App</h3>
      <main>
      {!isLoading && <ToyList
                    toys={toys}
                    onRemoveToy={onRemoveToy}
                />}
                {isLoading && <div>Loading...</div>}
      </main>
    </div>
  )
}
