import { configureStore } from '@reduxjs/toolkit';
import shoppingCartReducer from './shoppingCartSlice';

export default configureStore({
  reducer: {
    counter: shoppingCartReducer,
  },
});
