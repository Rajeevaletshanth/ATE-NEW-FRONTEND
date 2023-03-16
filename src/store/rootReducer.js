import { combineReducers } from 'redux'
import auth from './auth'
import base from './base'
import cart from './cart'
import restaurant from './restaurant'

const rootReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        auth,
        base,
        cart,
        restaurant,
        ...asyncReducers,
    })
    return combinedReducer(state, action)
}
  
export default rootReducer
