import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import store, { persistor }  from './store/store';
import ErrorBoundary from './utils/ErrorBoundary';
import { PersistGate } from 'redux-persist/integration/react';
import SocketProvider from './Provider/SocketProvider';
import LoadingProvider from './Provider/LoadingProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} >
          <LoadingProvider>
            <SocketProvider>
              <App />
            </SocketProvider>
          </LoadingProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>

  // </React.StrictMode>
);


