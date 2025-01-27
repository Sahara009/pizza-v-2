import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getPizzaFromLS } from "../../utils/getPizzaFromLS";

export type CartProduct = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  products: CartProduct[];
}

const { products, totalPrice } = getPizzaFromLS();
const initialState: CartSliceState = {
  totalPrice,
  products,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<CartProduct>) {
      const findProduct = state.products.find(
        (prod) => prod.id === action.payload.id
      );
      if (findProduct) {
        findProduct.count++;
      } else {
        state.products.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.products.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    decrementProduct(state, action: PayloadAction<string>) {
      const findProduct = state.products.find(
        (prod) => prod.id === action.payload
      );
      if (findProduct) {
        if (findProduct.count > 1) {
          findProduct.count--;
        } else {
          findProduct.count = 1;
        }
      }
      state.totalPrice = state.products.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    incrementProduct(state, action: PayloadAction<string>) {
      const findProduct = state.products.find(
        (prod) => prod.id === action.payload
      );
      if (findProduct) {
        findProduct.count = findProduct.count + 1;
      }
      state.totalPrice = state.products.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );

      state.totalPrice = state.products.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    clearCart(state) {
      state.products = [];
      state.totalPrice = 0;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  clearCart,
  incrementProduct,
  decrementProduct,
} = cartSlice.actions;

export default cartSlice.reducer;
