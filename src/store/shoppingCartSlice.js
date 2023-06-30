import { createSlice } from '@reduxjs/toolkit';
import { createSale } from '../sections/@dashboard/products/DB/dbFiles';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: [],
    total: {},
  },
  reducers: {
    increment: (state, action) => {
      console.log(action.payload);
      state.value.push(action.payload);
    },
    decrement: (state, action) => {
      const element = state.value.findIndex((item) => item.id === action.payload.id);
      console.log(element);
      if (element >= 0) state.value.splice(element, 1);
    },
    purchase: (state) => {
      state.value = [];
    },
  },
});
// Action creators are generated for each case reducer function
export const { increment, decrement, purchase } = counterSlice.actions;
export const selectCount = (state) => state.counter.value?.length;
export const selectTotal = (state) =>
  state.counter.value.reduce((acc, item) => {
    return acc + item.price;
  }, 0);
export const selectProducts = (state) => state.counter.value;

export default counterSlice.reducer;
