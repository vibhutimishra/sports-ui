// store/store.js

import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers'; 
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from './sagas'; 
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'root',
  storage: storageSession, 
  whitelist: ['user'], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
const persistor = persistStore(store);

export { store, persistor };