import { configureStore, combineReducers, createSlice } from "@reduxjs/toolkit"
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import localforage from "localforage"
import productReducer from "./product"
import cartReducer from"./cart"
import userReducer from "./user"


const rootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
  cart: cartReducer,
})

const persistConfig = {
  key: "root",
  storage: localforage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export default store

export const persistor = persistStore(store)
  