import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Portfolio from './App.jsx'
import BusinessCard from './components/Pojects/SecondDayProjec.jsx'
import App from './components/Pojects/ThirdDayProject.jsx'
createRoot(document.getElementById('root')).render(

  <StrictMode>
    <App />
  </StrictMode>,
)
