import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Showcase from './Showcase.jsx'

const isShowcase = window.location.pathname === '/showcase'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isShowcase ? <Showcase /> : <App />}
  </StrictMode>,
)
