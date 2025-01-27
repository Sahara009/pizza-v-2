import { configureStore } from "@reduxjs/toolkit";

import filterSlice from "./slices/filterSlice";
import cartSlice from "./slices/cartSlice";
import pizzaSlice from "./slices/pizzaSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    cart: cartSlice,
    pizza: pizzaSlice,
  },
});

// возвращает тип корвневого стэйта
export type RootState = ReturnType<typeof store.getState>;

// правильный тип диспетчеризации ваших асинхронных экшенов
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
