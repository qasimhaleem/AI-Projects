import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import UnitConverter from './components/Pojects/FifthDayProject.jsx'
createRoot(document.getElementById('root'))
.render(

  <StrictMode>
    <UnitConverter />
  </StrictMode>,
)
