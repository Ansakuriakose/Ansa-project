import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAxiosFileInstance, getAxiosInstance } from '../../api/api';

type AppState = {
  memberCollection: {
    pagination: any;
    data: any[];
  };
  dashboard: {
    activeMembersCount: number;
    totalMembersCount: number;
    expiredMembersCount: any[];
    expiringMembersCount: any[];
    newAdmissions: any[];
  };
};

const initialState: AppState = {
  memberCollection: {
    pagination: {},
    data: [],
  },
  dashboard: {
    activeMembersCount: 0,
    totalMembersCount: 0,
    expiredMembersCount: [],
    expiringMembersCount: [],
    newAdmissions: [],
  },
};

export const getDashboardApi = createAsyncThunk(
  'memberReducer/getDashboardApi',
  async (params: any, { rejectWithValue }) => {
    const api = await getAxiosInstance();
    try {
      const response = await api.get('/gym/dashboard');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.data);
    }
  },
);

export const searchMemberGymApi = createAsyncThunk(
  'memberReducer/searchMemberGymApi',
  async (params: any, { rejectWithValue }) => {
    const api = await getAxiosInstance();
    try {
      const response = await api.post('/user/trans-user', params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.data);
    }
  },
);

export const searchMemberList = createAsyncThunk(
  'memberReducer/searchMemberList',
  async (params: any, { rejectWithValue }) => {
    const api = await getAxiosInstance();
    try {
      const response = await api.post('/user/search', params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getMemberAllTransaction = createAsyncThunk(
  'memberReducer/getMemberAllTransaction',
  async (params: any, { rejectWithValue }) => {
    const api = await getAxiosInstance();
    try {
      const response = await api.get(`/transaction/member/${params.id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getAllMembers = createAsyncThunk(
  'memberReducer/getAllMembers',
  async (params: any, { rejectWithValue }) => {
    const api = await getAxiosInstance();
    try {
      const response = await api.get(`/user`, { params });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.data);
    }
  },
);

export const registerMemberApi = createAsyncThunk(
  'memberReducer/registerMemberApi',
  async (params: any, { rejectWithValue }) => {
    const api = await getAxiosInstance();
    try {
      const response = await api.post(`/user/register`, params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const updateUserDetailsApi = createAsyncThunk(
  'memberReducer/updateUserDetailsApi',
  async (params: any, { rejectWithValue }) => {
    const api = await getAxiosInstance();
    try {
      const response = await api.post(`/user/update`, params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

export const getUserDetailsApi = createAsyncThunk(
  'memberReducer/getUserDetailsApi',
  async (params: any, { rejectWithValue }) => {
    const api = await getAxiosInstance();
    try {
      const response = await api.post(`/user/profile`, params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.data);
    }
  },
);
export const deleteMemberApi = createAsyncThunk(
  'memberReducer/deleteMemberApi',
  async (params: any, { rejectWithValue }) => {
    const api = await getAxiosInstance();
    try {
      const response = await api.post(`user/delete`, params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.data);
    }
  },
);

export const uploadUserProfileImageApi = createAsyncThunk(
  'memberReducer/uploadUserProfileImageApi',
  async (params: any, { rejectWithValue }) => {
    const api = await getAxiosFileInstance();
    try {
      const response = await api.post('/user/upload-profile', params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.data);
    }
  },
);

export const memberSlice = createSlice({
  name: 'memberReducer',
  initialState,
  reducers: {
    setMemberCollection: (state, action) => {
      state.memberCollection = action.payload;
    },
    setDashboard: (state, action) => {
      state.dashboard = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getDashboardApi.fulfilled, (state, action) => {
      state.dashboard = action?.payload?.data;
    });
  },
});

export const { setMemberCollection, setDashboard } = memberSlice.actions;
export default memberSlice.reducer;
