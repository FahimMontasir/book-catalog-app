import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IUser {
  userToken: string;
}

const initialState: IUser = {
  userToken: '',
};

const localUserSlice = createSlice({
  name: 'localUser',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<IUser>) => {
      state.userToken = action.payload.userToken;
    },
    removeUserInfo: (state) => {
      state.userToken = '';
    },
  },
});

export const { setUserInfo, removeUserInfo } = localUserSlice.actions;

export default localUserSlice.reducer;
