import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, CategoryType, Order, SortBy } from 'utils/type';

const initialState: AppState = {
  categories: [],
  category: 'beauty',
  search: '',
  sortBy: 'title',
  order: 'asc',
  minPrice: '0',
  maxPrice: '999999999',
  cartCount: 0,
  modalVisible: false,
};

const productSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<CategoryType[]>) => {
      state.categories.push(...action.payload);
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortBy>) => {
      state.sortBy = action.payload;
    },
    setOrder: (state, action: PayloadAction<Order>) => {
      state.order = action.payload;
    },
    setMinPrice: (state, action: PayloadAction<string>) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<string>) => {
      state.maxPrice = action.payload;
    },
    incrementCart: (state) => {
      state.cartCount += 1;
    },
    toggleModal: (state) => {
      state.modalVisible = state.modalVisible ? false : true;
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
