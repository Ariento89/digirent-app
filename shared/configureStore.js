import rootReducer from 'ducks';
import { applyMiddleware, compose, createStore } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'sagas';
import { STORAGE_KEY } from './storage';

export default function configureStore(initialState = {}) {
  const persistConfig = {
    key: STORAGE_KEY,
    storage,
    blacklist: ['_persist'],
    keyPrefix: '',
  };

  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];

  const enhancers = [applyMiddleware(...middlewares)];
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(persistedReducer, initialState, compose(...enhancers));

  // run saga middleware
  sagaMiddleware.run(rootSaga);

  return store;
}
