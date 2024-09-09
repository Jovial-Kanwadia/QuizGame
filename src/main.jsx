import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Gates from './components/Gates.jsx'
import Home from './components/Home.jsx'
import FlipImage from './components/FlipImg.jsx'
const router=createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: 'gate',
        element: <Gates/>
      },
      {
        path: "",
        element: <Home/>
      },
      {
        path: 'img',
        element: <FlipImage/>
      }
    ]
  }
]);
createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
