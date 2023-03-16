import { combineReducers } from '@reduxjs/toolkit'
import restaurant from './restaurantSlice'

const reducer = combineReducers({
    restaurant
})

export default reducer