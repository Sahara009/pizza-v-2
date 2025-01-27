import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ItemsType } from "../../pages/HomePage";

export type FeatchType = {
  url: string;
  search: string;
  sortBy: string;
  descOrAsc: string;
  categories: string;
  currentPage: number;
};

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async ({
    url,
    search,
    sortBy,
    descOrAsc,
    categories,
    currentPage,
  }: FeatchType) => {
    const { data } = await axios.get<ItemsType[]>(
      `${url}${categories}&sortBy=${sortBy}&order=${descOrAsc}&page=${currentPage}&limit=4&${search}`
    );
    return data;
  }
);

export enum Status {
  LOADING = "loading",
  SUCCESS = "succeeded",
  ERROR = "failed",
}

interface PizzaSliceState {
  items: ItemsType[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.items = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.items = [];
        console.log(action.error.message);
      });
  },
});

// export const { setPizzas } = pizzaSlice.actions

export default pizzaSlice.reducer;
