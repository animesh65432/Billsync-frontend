import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { CookiesProvider } from 'react-cookie';
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <App />
    </CookiesProvider>
  </StrictMode>,
)
