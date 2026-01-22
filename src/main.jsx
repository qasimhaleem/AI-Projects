import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GithubFinder from './components/Pojects/TenthDayProject'
createRoot(document.getElementById('root'))
  .render(

    <StrictMode>
      <GithubFinder />
    </StrictMode>,
  )
