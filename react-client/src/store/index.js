import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
// import axios from 'axios'

const initialState = {
  data: []
}

function Reducer(state = initialState, action) {
  return state
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(Reducer, composeEnhancers(applyMiddleware(thunk)))

export default store