import 'bootstrap/dist/css/bootstrap.css';
import 'react-day-picker/lib/style.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import configureAxios from 'shared/configureAxios';
import configureStore from 'shared/configureStore';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import '../styles/main.scss';

// Initialize Store
const store = configureStore();

// Initialize Interceptors
configureAxios(store);

const App = ({ Component, pageProps }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore(store)}>
      <Component {...pageProps} />
    </PersistGate>
  </Provider>
);

export default App;
