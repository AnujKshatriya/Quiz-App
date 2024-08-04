import {configureStore} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import rootReducer from './rootreducer.js'; // Ensure this is the correct path

const persistConfig = {
    key: 'root',  // The key for the persisted data in storage
    storage,      // Storage engine to use (localStorage here)
  };

// Create a persisted reducer using persistConfig
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer
const store = configureStore({
    reducer: persistedReducer,
  });


// Create a persistor for the store
const persistor = persistStore(store);

export { store, persistor };