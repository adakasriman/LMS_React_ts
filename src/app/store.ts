// src/app/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import authReducer from '@features/auth/authSlice';
import { baseApi, baseApiWithAuth } from '@api/baseApi';

// ✅ Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  [baseApi.reducerPath]: baseApi.reducer,
  [baseApiWithAuth.reducerPath]: baseApiWithAuth.reducer,
});

// ✅ Persist only auth state
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // only persist auth
};

// ✅ Wrap reducer with persistence
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      // ✅ attach both middlewares safely
      .concat(baseApi.middleware, baseApiWithAuth.middleware),
  devTools: import.meta.env.MODE !== 'production',
});

// ✅ Persistor
export const persistor = persistStore(store);

// ✅ Type helpers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
