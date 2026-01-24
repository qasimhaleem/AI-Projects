import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import MovieApp from './components/Pojects/12MovieSearch'
import RecipeBook from './components/Pojects/13Recipe'
createRoot(document.getElementById('root'))
  .render(

    <StrictMode>
      <RecipeBook />
    </StrictMode>,
  )
