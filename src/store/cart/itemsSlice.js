import { createSlice } from '@reduxjs/toolkit';

export const itemsSlice = createSlice({
  name: 'cart',
  initialState: { products: [] },
  reducers: {
    addToCart: (state, action) => {
      const newProduct = action.payload;
      const productIndex = state.products.findIndex(product => product.id === newProduct.id && product.type === newProduct.type);
      if (productIndex !== -1) {
        state.products[productIndex].quantity++;
      } else {
        state.products.push({ ...newProduct, quantity: 1 });
      }
    },
    increaseProductQuantity: (state, action) => {
      const { id, type } = action.payload;
      const productIndex = state.products.findIndex(product => product.id === id && product.type === type);
      if (productIndex !== -1) {
        state.products[productIndex].quantity++;
      }
    },
    decreaseProductQuantity: (state, action) => {
      const { id, type } = action.payload;
      const productIndex = state.products.findIndex(product => product.id === id && product.type === type);
      if (productIndex !== -1) {
        if (state.products[productIndex].quantity > 1) {
          state.products[productIndex].quantity--;
        } else {
          state.products.splice(productIndex, 1);
        }
      }
    },
    removeFromCart: (state, action) => {
        const { id, type } = action.payload;
        const productIndex = state.products.findIndex(product => product.id === id && product.type === type);
        if (productIndex !== -1) {
          state.products.splice(productIndex, 1);
        }
    },
    emptyCart: (state) => {
        state.products = [];
    },
  },
});

export const { addToCart, increaseProductQuantity, decreaseProductQuantity, removeFromCart, emptyCart } = itemsSlice.actions;

export default itemsSlice.reducer;
