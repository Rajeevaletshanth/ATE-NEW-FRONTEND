import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import  { getAllRestaurantApi } from 'services/apiServices'

export const getRestaurant = createAsyncThunk('manageRestaurant/data/getRestaurant',async () => {
    const response = await getAllRestaurantApi()
    return response.data
})

export const initialFilterData = {
    status: '',
}

export const restarantSlice = createSlice({
    name: 'manageRestaurant/data',
    initialState: {
        loading: true,
        restaurant: {},
    },
    reducers: {   
    },
    extraReducers: {
        [getRestaurant.fulfilled]: (state, action) => {
            state.restaurant = action.payload
            state.loading = false
        },
        [getRestaurant.pending]: (state) => {
            state.loading = true
        }
    }
});

export default restarantSlice.actions;


