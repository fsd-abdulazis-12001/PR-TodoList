import './App.css'

import HomePage from './pages/home'
import Home from './home'
import DetailPage from './pages/detail'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
 
const App = () => {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <Home/>,
      children: [
        {
          index: true,
          element: <HomePage/>
        },
        {
          path: "detail",
          element: <DetailPage/>
        }
      ]
    }
  ]);

  return (

    <RouterProvider router={router} />
   


  )


}

export default App