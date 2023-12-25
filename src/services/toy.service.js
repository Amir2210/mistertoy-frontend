import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const TOY_KEY = 'toyDB'
const labels = [
  'On wheels',
  'Box game',
  'Art',
  'Baby',
  'Doll',
  'Puzzle',
  'Outdoor',
  'Battery Powered'
]

export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
  getDefaultFilter
}

_createToys()

function query(filterBy = 'all') {
  if (!filterBy) filterBy = 'all'
  return storageService.query(TOY_KEY).then((toys) => {
    return toys
  })
}

function getById(toyId) {
  return storageService.get(TOY_KEY, toyId)
}

function remove(toyId) {
  return storageService.remove(TOY_KEY, toyId)
}

function save(toy) {
  if (toy._id) {
    return storageService.put(TOY_KEY, toy)
  } else {
    // toy.owner = userService.getLoggedinUser()
    return storageService.post(TOY_KEY, toy)
  }
}

function getEmptyToy(name = '', price = 1, labels = []) {
  return {
    name,
    price,
    labels,
    createdAt: Date.now(),
    inStock: true
  }
}

function _createToys() {
  let toys = storageService.loadFromStorage(TOY_KEY)
  if (!toys || !toys.length) {
    toys = []
    toys.push(
      _createToy('Talking Doll', 123, ['Doll', 'Battery Powered', 'Baby'])
    )
    toys.push(_createToy('Monopol', 555, ['Box game']))
    storageService.saveToStorage(TOY_KEY, toys)
  }
}

function getDefaultFilter() {
  return { txt: '', maxPrice: '' }
}

function _createToy(name, price, label) {
  const toy = getEmptyToy(name, price, label)
  toy._id = utilService.makeId()
  return toy
}
