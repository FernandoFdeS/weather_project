import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import router from './Router.tsx'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
