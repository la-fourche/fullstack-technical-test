import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { initCart } from "reducer/cartSlice";

const store = configureStore({
    reducer: {
        cart: cartReducer
    }
});

store.dispatch(initCart());

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
