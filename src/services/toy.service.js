import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'
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
  getDefaultFilter,
  getDefaultSort,
  getEmptyDefaultToy,
  getLabels
}

_createToys()

function query(filterBy) {
  return storageService.query(TOY_KEY)
      .then(toys => {
          if (filterBy.txt) {
              const regExp = new RegExp(filterBy.txt, 'i')
              toys = toys.filter(toy => regExp.test(toy.name))
          }
          if (filterBy.minPrice) {
              toys = toys.filter(toy => toy.maxPrice >= filterBy.minPrice)
          }
          return toys
      })
}

function getLabels() {
  return [...labels]
}

// function query(filterBy = {}) {
//   return httpService.get(BASE_URL, filterBy)
// }

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





function getEmptyToy(name = '',  maxPrice = 1, labels = []) {
  return {
    name,
    maxPrice,
    labels,
    createdAt: Date.now(),
    inStock: true
  }
}

function getEmptyDefaultToy(name='',){
  return {
    name,
    maxPrice : utilService.getRandomIntInclusive(1,1000),
    labels: [ 'Box game','Art','Baby',],
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
  return { txt: '',minPrice:'', maxPrice: '' }
}

function getDefaultSort() {
  return {
      by: 'name',
      asc: true
  }
}

function _createToy(name,  maxPrice, label) {
  const toy = getEmptyToy(name,  maxPrice, label)
  toy._id = utilService.makeId()
  return toy
}
