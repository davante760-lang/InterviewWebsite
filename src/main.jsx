import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Showcase from './Showcase.jsx'
import StartPage from './StartPage.jsx'

const path = window.location.pathname
const Page = path === '/showcase' ? Showcase : path === '/start' ? StartPage : App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)
