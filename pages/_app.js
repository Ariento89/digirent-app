/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

import 'bootstrap/dist/css/bootstrap.css';
import rootReducer from 'ducks';
import 'react-day-picker/lib/style.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'shared/storage';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import '../styles/main.scss';

export const STORAGE_KEY = 'digirent';

const persistConfig = {
  key: STORAGE_KEY,
  storage,
  blacklist: ['_persist'],
  keyPrefix: '',
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, {});

const App = ({ Component, pageProps }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore(store)}>
      <Component {...pageProps} />
    </PersistGate>
  </Provider>
);

export default App;
