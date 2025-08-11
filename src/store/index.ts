import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { MMKVStorage } from '@app/services/storageService';
import { appSlice } from './slice/appSlice';
import { authSlice } from './slice/authSlice';
import { memberSlice } from './slice/memberSlice';
import { transactionSlice } from './slice/transactionSlice';

const persistConfig = {
  key: 'root',
  storage: MMKVStorage,
  blacklist: [],
  whitelist: [
    'appReducer',
    'authReducer',
    'memberReducer',
    'transactionReducer',
  ],
};

const allReducer: any = combineReducers({
  appReducer: appSlice,
  authReducer: authSlice,
  memberReducer: memberSlice,
  transactionReducer: transactionSlice,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'LOGOUT') {
    state.authReducer = undefined;
    state.memberReducer = undefined;
    state.transactionReducer = undefined;
  }
  return allReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
