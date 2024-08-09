import React from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import RootLayout from './components/RootLayout'
import Home from './components/Home'
import Form from './components/Form'
import 'bootstrap/dist/css/bootstrap.min.css'

function App(){
  const router=createBrowserRouter([
    {
      path:'/',
      element:<RootLayout/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/network-anomaly-detector',
          element:<Form/>
        }
      ]
    }
  ])
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App