import { createSlice } from '@reduxjs/toolkit';

export const itemsSlice = createSlice({
  name: 'restaurant',
  initialState: { 
    restaurantList: [],
    productList: [],
    comboList: [],
    cuisineList: [],
    topOfferList: {
      product: [],
      combo: []
    },
    topBrandList: []
  },
  reducers: {
    addAllRestaurants: (state, action) => {
      state.restaurantList = action.payload;
    },
    addAllProducts: (state, action) => {
      state.productList = action.payload;
    },
    addAllCombo: (state, action) => {
      state.comboList = action.payload;
    },
    addAllCuisine: (state, action) => {
      state.cuisineList = action.payload;
    },
    addTopOffer: (state, action) => {
      if(action.payload.type === "PRODUCT")
        state.topOfferList.product = action.payload.list;
      else if(action.payload.type === "COMBO")
        state.topOfferList.combo = action.payload.list;
    },
    addTopBrands: (state, action) => {
      state.topBrandList = action.payload;
    },
  },
});

export const { addAllRestaurants, addAllProducts, addAllCombo, addAllCuisine, addTopOffer, addTopBrands } = itemsSlice.actions;

export default itemsSlice.reducer;
