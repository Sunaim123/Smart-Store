import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  products: []
}

export const productSlice = createSlice({
  name: "product",
  initialState, 
  reducers: {
    pushProducts: (state, action) => {
      state.products = action.payload
    },
  },
})

export const { pushProducts } = productSlice.actions
export default productSlice.reducer