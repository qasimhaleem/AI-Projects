import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ThemeToggle from './components/Pojects/SeventhDayProject.jsx'
createRoot(document.getElementById('root'))
  .render(

    <StrictMode>
      <ThemeToggle />
    </StrictMode>,
  )
