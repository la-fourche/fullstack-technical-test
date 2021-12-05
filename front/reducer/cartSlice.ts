import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type Item = {
  objectID: number,
  name: string,
  price: number
}

interface CartState {
  id: string,
  items: Array<Item>
}

const initialState: CartState = {
  id: "0",
  items: []
}

export const initCart = createAsyncThunk('cart/init', async () => {
  const cartID = window.localStorage.getItem("cartID");
  const url = cartID ? `http://localhost:4000/cart/${cartID}` : "http://localhost:4000/cart/";
  const method = cartID ? "GET" : "POST";
  const response = await fetch(url, { method });
  const cart = await response.json();
  if (!cartID || cartID !== cart.id) window.localStorage.setItem("cartID", cart.id)
  return cart;
})

export const addItem = createAsyncThunk('cart/addItem', async ({ cartID, data }: { cartID: string; data: { items: Array<Item>} }) => {
  const response = await fetch(`http://localhost:4000/cart/${cartID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
  );
  return await response.json()
})

export const removeItem = createAsyncThunk('cart/removeItem', async ({ cartID, data }: { cartID: string; data: { objectIDs: Array<string>} }) => {
  const response = await fetch(`http://localhost:4000/cart/${cartID}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
  );
  return await response.json()
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: builder => {
      builder.addCase(initCart.fulfilled, (state, action: PayloadAction<CartState>) => {
        state.id = action.payload.id
        state.items = action.payload.items
      }),
      builder.addCase(addItem.fulfilled, (state, action: PayloadAction<CartState>) => {
        state.items = action.payload.items
      }),
      builder.addCase(removeItem.fulfilled, (state, action: PayloadAction<CartState>) => {
        state.items = action.payload.items
      })
    },
});

export default cartSlice.reducer;