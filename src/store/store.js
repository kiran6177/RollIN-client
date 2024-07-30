import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../features/rootReducer.js';
import { persistStore,persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig,rootReducer);


const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            immutableCheck:false,
            serializableCheck:false
        })
})

export const persistor = persistStore(store);
export default store