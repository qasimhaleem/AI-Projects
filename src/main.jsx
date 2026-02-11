import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import MovieApp from './components/Pojects/12MovieSearch'
import RecipeBook from './components/Pojects/13Recipe'
import CryptoTracker from './components/Pojects/14CurruncyTrcker'
import DictionaryApp from './components/Pojects/15Dectionary'
createRoot(document.getElementById('root'))
  .render(

    <StrictMode>
      <DictionaryApp />
    </StrictMode>,
  )
