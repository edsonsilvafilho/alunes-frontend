import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducers = persistReducer(
    {
      key: 'REACT-API',
      storage,
      whitelist: ['auth', 'register'],
    },
    reducers
  );
  return persistedReducers;
};
