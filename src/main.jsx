import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home.jsx'
import Update from './Update.jsx'
import AddNominee from './AddNominee.jsx'
import ViewNomineePage from './ViewNomineePage.jsx'


const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/update/:id",
        element: <Update />
      },
      {
        path: '/add',
        element: <AddNominee />
      },
      {
        path : '/nominee/:id',
        element:<ViewNomineePage />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={myRouter}>
        <App />
    </RouterProvider>
  </StrictMode>,
)
