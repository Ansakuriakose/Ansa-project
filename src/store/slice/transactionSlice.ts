import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAxiosInstance } from '../../api/api';

type AppState = {
  transactionCollection: {
    pagination: any;
    data: any[];
  };
  transactionData: {
    monthAmtFromActiveMember: number;
    totalMonthlyFees: number;
    totalAdmissionFees: number;
    totalAdditionalAmount: number;
    totalWithdrawals: number;
  };

  reportData: {
    graph: any[];
    fees: {
      monthlyFees: number;
      admissionFees: number;
      additionalAmount: number;
      withdrawAmount: number;
    };
    listCollection: {
      list: any[];
      pagination: any;
    };
  };
};

const initialState: AppState = {
  transactionCollection: {
    pagination: {},
    data: [],
  },

  transactionData: {
    monthAmtFromActiveMember: 0,
    totalMonthlyFees: 0,
    totalAdmissionFees: 0,
    totalAdditionalAmount: 0,
    totalWithdrawals: 0,
  },

  reportData: {
    graph: [],
    fees: {
      monthlyFees: 0,
      admissionFees: 0,
      additionalAmount: 0,
      withdrawAmount: 0,
    },
    listCollection: {
      list: [],
      pagination: {},
    },
  },
};

export const getTransactionListApi = createAsyncThunk(
  'transactionReducer/getTransactionListApi',
  async (params: any, { rejectWithValue }) => {
    const api = await getAxiosInstance();
    try {
      const response = await api.get('/transaction', { params });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getTransactionScreen = createAsyncThunk(
  'transactionReducer/getTransactionScreen',
  async (params: any, { rejectWithValue }) => {
    const api = await getAxiosInstance();
    try {
      const response = await api.get('/transaction/screen-app');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.data);
    }
  },
);

export const createTransactionApi = createAsyncThunk(
  'transactionReducer/createTransactionApi',
  async (params: any, { rejectWithValue }) => {
    const api = await getAxiosInstance();
    try {
      const response = await api.post('/transaction/add', params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.data);
    }
  },
);

export const deleteTransactionApi = createAsyncThunk(
  'transactionReducer/deleteTransactionApi',
  async (params: any, { rejectWithValue }) => {
    const api = await getAxiosInstance();
    try {
      const response = await api.post('/transaction/delete', params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getStatisticReportApi = createAsyncThunk(
  'transactionReducer/getStatisticReportApi',
  async (params: any, { rejectWithValue }) => {
    const api = await getAxiosInstance();
    try {
      const response = await api.get('/report/statistic');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getReportListApi = createAsyncThunk(
  'transactionReducer/getReportListApi',
  async (params: any, { rejectWithValue }) => {
    const api = await getAxiosInstance();
    try {
      const response = await api.get('/report/gymReport');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getCurrentMonthReportPDF = createAsyncThunk(
  'transactionReducer/getCurrentMonthReportPDF',
  async (params: any, { rejectWithValue }) => {
    const api = await getAxiosInstance();
    try {
      const response = await api.get('/report/download-current-month');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.data);
    }
  },
);

export const getTransactionMonthReportPDF = createAsyncThunk(
  'transactionReducer/getTransactionMonthReportPDF',
  async (params: any, { rejectWithValue }) => {
    const api = await getAxiosInstance();
    try {
      const response = await api.get('/report/download-current-tran');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.data);
    }
  },
);

export const downloadReportPDFApi = createAsyncThunk(
  'transactionReducer/downloadReportPDFApi',
  async (params: any, { rejectWithValue }) => {
    const api = await getAxiosInstance();
    try {
      const response = await api.get(params.url);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.data);
    }
  },
);

export const transactionSlice = createSlice({
  name: 'transactionReducer',
  initialState,
  reducers: {
    setTransactionCollection: (state, action) => {
      state.transactionCollection = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getTransactionListApi.fulfilled, (state, action) => {
      if (action?.meta?.arg?.page == 1) {
        const payload = {
          pagination: action?.payload?.pagination,
          data: action?.payload?.data,
        };
        state.transactionCollection = payload;
      }
    });
    builder.addCase(getTransactionScreen.fulfilled, (state, action) => {
      state.transactionData = action?.payload?.data;
    });
    builder.addCase(getStatisticReportApi.fulfilled, (state, action) => {
      state.reportData = {
        ...state.reportData,
        graph: action?.payload?.data?.graph,
        fees: action?.payload?.data?.fees,
      };
    });

    builder.addCase(getReportListApi.fulfilled, (state, action) => {
      state.reportData = {
        ...state.reportData,
        listCollection: {
          pagination: action?.payload?.pagination,
          list: action?.payload?.data,
        },
      };
    });
    builder.addCase(getReportListApi.rejected, (state, action) => {
      state.reportData = {
        ...state.reportData,
        listCollection: {
          list: [],
          pagination: {},
        },
      };
    });
  },
});

export const { setTransactionCollection } = transactionSlice.actions;
export default transactionSlice.reducer;
