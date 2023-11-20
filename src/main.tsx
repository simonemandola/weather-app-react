import React from "react"
import ReactDOM from "react-dom/client"

import { Provider } from "react-redux"
// @ts-ignore
import { store } from "./store.jsx"

import { PrimeReactProvider } from "primereact/api"
import Tailwind from "primereact/passthrough/tailwind"
import App from "./App.tsx"

// theme
import "primereact/resources/themes/soho-light/theme.css";
import "primeicons/primeicons.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
          <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
              <App />
          </PrimeReactProvider>
      </Provider>
  </React.StrictMode>
)
