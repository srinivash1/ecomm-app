import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: []
    },
    reducers: {
        addToCart: (state,action) => {
            state.cartItems.push(action.payload)
        },
        removeFromCart: (state,action) => {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload)
        }
    }
})

//Importing the actions
export const { addToCart, removeFromCart } = cartSlice.actions;

//Importing the reducer
export default cartSlice.reducer;
