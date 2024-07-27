import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../features/rootReducer.js';
import { persistStore,persistReducer, PAUSE, PERSIST, REGISTER, REHYDRATE, PURGE, FLUSH } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig,rootReducer)

const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:{
                ignoreActions:[PAUSE,PERSIST,REGISTER,REHYDRATE,PURGE,FLUSH]
            }
        })
})

export const persistor = persistStore(store);
export default store