import { createSlice } from '@reduxjs/toolkit'

export const itemsSlice = createSlice({
	name: 'cart',
	initialState: [],
	reducers: {
        setCart: (state, action) => {
            state.products = action.payload
        },
        emptyCart: (state) => {
            state.products = []
        }
	},
})

export const { setCart, emptyCart } = itemsSlice.actions

export default itemsSlice.reducer