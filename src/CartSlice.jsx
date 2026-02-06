import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], // Initialize items as an empty array
        noOfQuantity: 0
    },
    reducers: {
        addItem: (state, action) => {
            const { name } = action.payload;
            const isExisting = state.items.find(item => item.name === name)
            if (isExisting) {
                isExisting.quantity++;
            }
            else {
                state.items.push({ ...action.payload, quantity: 1 })
            }
            state.noOfQuantity++;

        },
        removeItem: (state, action) => {
            const {name,quantity} = action.payload;
            state.items = state.items.filter(item=>item.name!==name) 
            state.noOfQuantity -= quantity;
            if(state.noOfQuantity<0) {
                state.noOfQuantity = 0
            }

        },
        updateQuantity: (state, action) => {
            const { name, quantity } = action.payload;
            const existingItem = state.items.find(item => item.name === name);
            if (existingItem) {
                const differenceInQunatity = quantity - existingItem.quantity;
                existingItem.quantity = quantity
                state.noOfQuantity += differenceInQunatity
            }

        },
    },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
