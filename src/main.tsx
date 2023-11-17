import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
import { store } from './store.jsx'

import { PrimeReactProvider } from 'primereact/api';
import App from './App.tsx'

// theme
import "primereact/resources/themes/soho-light/theme.css";
import 'primeicons/primeicons.css';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
      <Provider store={store}>
          <PrimeReactProvider value={{ unstyled: true, pt: {} }}>
              <App />
          </PrimeReactProvider>
      </Provider>
  </>,
)
