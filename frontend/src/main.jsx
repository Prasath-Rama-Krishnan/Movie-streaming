import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './router/Routing.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router/>
  </StrictMode>,
)
