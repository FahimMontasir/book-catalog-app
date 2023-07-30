import { configureStore } from '@reduxjs/toolkit';
import localUserSlice from './features/user/userSlice';
import favoriteReducer from './features/favorite/favoriteSlice';
import { api } from './api/apiSlice';

const store = configureStore({
  reducer: {
    localUser: localUserSlice,
    favorite: favoriteReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
