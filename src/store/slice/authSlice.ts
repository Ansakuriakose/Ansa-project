import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAxiosFileInstance, getAxiosInstance } from '../../api/api';

type AppState = {
  token: string;
  gymDetails: any;
};

const initialState: AppState = {
  token: '',
  gymDetails: null,
};

export const loginGymApi = createAsyncThunk(
  'authReducer/loginGymApi',
  async (params: any, { rejectWithValue }) => {
    const api = await getAxiosInstance();
    try {
      const response = await api.post('/gym/sign_in', params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const registerFcm = createAsyncThunk(
  'authReducer/registerFcm',
  async (params: any, { rejectWithValue }) => {
    const api = await getAxiosInstance();
    try {
      const response = await api.post('/notification/register-fcm', params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const updateGymApi = createAsyncThunk(
  'authReducer/updateGymApi',
  async (params: any, { rejectWithValue }) => {
    const api = await getAxiosInstance();
    try {
      const response = await api.post('/gym/update', params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.data);
    }
  },
);

export const uploadGymImageApi = createAsyncThunk(
  'authReducer/uploadGymImageApi',
  async (params: any, { rejectWithValue }) => {
    const api = await getAxiosFileInstance();
    try {
      const response = await api.post('/gym/upload-logo', params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.data);
    }
  },
);

export const authSlice = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loginGymApi.pending, (state, action) => {});
    builder.addCase(loginGymApi.fulfilled, (state, action) => {
      state.token = action.payload?.data?.token;
      state.gymDetails = action.payload?.data?.data;
    });
    builder.addCase(loginGymApi.rejected, (state, action) => {});

    builder.addCase(updateGymApi.fulfilled, (state, action) => {
      state.gymDetails = action.payload?.data;
    });
    builder.addCase(uploadGymImageApi.fulfilled, (state, action) => {
      state.gymDetails = action.payload?.data;
    });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
