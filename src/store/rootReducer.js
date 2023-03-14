import { combineReducers } from 'redux'
import auth from './auth'
import base from './base'
import cart from './cart'

const rootReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        auth,
        base,
        cart,
        ...asyncReducers,
    })
    return combinedReducer(state, action)
}
  
export default rootReducer
