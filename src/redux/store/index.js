import { configureStore } from '@reduxjs/toolkit'
import borrowerSlice from '../slices/borrowerSlice'

export default configureStore({
  reducer: {
    borrowers:borrowerSlice,
  },
})