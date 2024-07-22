import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from './routes.tsx'
import './index.css'
import { AuthProvider } from './lib/auth-provider.tsx';
import { StoreProvider } from './lib/store-proveider.tsx';
import { Toaster } from 'react-hot-toast';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider >
    </StoreProvider>
    <Toaster/>
  </React.StrictMode>,
)
