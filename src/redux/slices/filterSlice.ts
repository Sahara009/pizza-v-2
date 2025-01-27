import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type SortItem = {
  name: string;
  sort: string;
};

interface FilterSliceState {
  categoryId: number;
  sort: SortItem;
  inputValue: string;
  currentPage: number;
}

const initialState: FilterSliceState = {
  categoryId: 0,
  sort: { name: "популярности", sort: "rating" },
  inputValue: "",
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortType(state, action: PayloadAction<SortItem>) {
      state.sort = action.payload;
    },
    setInputValue(state, action: PayloadAction<string>) {
      state.inputValue = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setUrlFilters(state, action: PayloadAction<FilterSliceState>) {
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const {
  setCategoryId,
  setSortType,
  setInputValue,
  setPage,
  setUrlFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
