import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: null,
  token: null
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.permissions = action.payload.permissions
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.permissions = null
    },
  },
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer