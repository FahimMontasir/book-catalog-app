import { IBook } from '@/types/globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IFavorite {
  books: IBook[];
  total: number;
}

const initialState: IFavorite = {
  books: [],
  total: 0,
};

const favoriteSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToFav: (state, action: PayloadAction<IBook>) => {
      const existing = state.books.find(
        (product) => product._id === action.payload._id
      );

      if (existing) {
        existing.quantity = existing.quantity! + 1;
      } else {
        state.books.push({ ...action.payload, quantity: 1 });
      }

      state.total += 1;
    },
    removeOne: (state, action: PayloadAction<IBook>) => {
      const existing = state.books.find(
        (product) => product._id === action.payload._id
      );

      if (existing && existing.quantity! > 1) {
        existing.quantity = existing.quantity! - 1;
      } else {
        state.books = state.books.filter(
          (product) => product._id !== action.payload._id
        );
      }

      state.total -= 1;
    },
    removeFromFav: (state, action: PayloadAction<IBook>) => {
      state.books = state.books.filter(
        (product) => product._id !== action.payload._id
      );

      state.total -= action.payload.quantity!;
    },
  },
});

export const { addToFav, removeFromFav, removeOne } = favoriteSlice.actions;

export default favoriteSlice.reducer;
