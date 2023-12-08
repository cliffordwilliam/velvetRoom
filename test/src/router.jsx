import { createBrowserRouter, redirect } from "react-router-dom"
// import views
import Home from "./views/Home"
import MainLayout from "./components/MainLayout"
import Detail from "./views/Detail"


const router = createBrowserRouter([
    {
        element:<MainLayout/>,
        children: [
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"/lodging/:id",
                element:<Detail/>
            }
        ]
    }
])

export default router