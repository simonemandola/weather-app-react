import React from 'react'
import ReactDOM from 'react-dom/client'
import { PrimeReactProvider } from 'primereact/api';
import App from './App.tsx'

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
      <PrimeReactProvider>
          <App />
      </PrimeReactProvider>
  </>,
)
