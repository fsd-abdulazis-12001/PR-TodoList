import './App.css'

import TodoUstate from './pages/TodoUstate'
import TodoZustand from './pages/TodoZustand'
import Home from './home'
import DetailPage from './pages/detail'
import MainPage from './pages/main'
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
          element: <MainPage/>
        },
        {
          path: "detail",
          element: <DetailPage/>
        }
      ]
    }
    ,{
      path:"/TodoUstate",
      element: <TodoUstate/>
    }
    ,{
      path:"/TodoZustand",
      element: <TodoZustand/>
    }
  ]);

  return (

    <RouterProvider router={router} />
   


  )


}

export default App