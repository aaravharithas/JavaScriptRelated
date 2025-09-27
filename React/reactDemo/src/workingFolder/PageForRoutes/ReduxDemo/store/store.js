import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from '../slicer/CountSlice'
import { cartSlicer } from '../../ApiProduct/cartSlicer/cartSlicer'

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    cart: cartSlicer.reducer,
  },
})