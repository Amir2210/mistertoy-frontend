import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toyService } from '../services/toy.service.js'
import { ToyList } from '../cmps/ToyList.jsx'
import { loadToys } from '../store/actions/toy.actions.js'
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

  return (
    <div>
      <h3>Toys App</h3>
      <main>
      {!isLoading && <ToyList
                    toys={toys}
                />}
                {isLoading && <div>Loading...</div>}
      </main>
    </div>
  )
}
