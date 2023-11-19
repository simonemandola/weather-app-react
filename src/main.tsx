import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
// @ts-ignore
import { store } from './store.jsx'

import { PrimeReactProvider } from 'primereact/api';
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
          <PrimeReactProvider value={{ unstyled: true, pt: {} }}>
              <App />
          </PrimeReactProvider>
      </Provider>
  </React.StrictMode>
)
