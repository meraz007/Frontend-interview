import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: []
};
  
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload);
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload);
        }
    }
});

export const { addProduct, deleteProduct } = productSlice.actions;

export default productSlice.reducer