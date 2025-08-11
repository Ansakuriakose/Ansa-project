import {createSlice} from '@reduxjs/toolkit';

type AppState = {
  onBoard?: boolean;
};

const initialState: AppState = {
  onBoard: false,
};

export const appSlice = createSlice({
  name: 'appReducer',
  initialState,
  reducers: {
    setOnboard: (state, action) => {
      console.log('DISP====', action.payload);
      state.onBoard = action.payload;
    },
  },
  extraReducers: builder => {},
});

export const {setOnboard} = appSlice.actions;
export default appSlice.reducer;
