import { createBrowserRouter, redirect } from "react-router-dom"
// import views
import Home from "./views/Home"
import MainLayout from "./components/MainLayout"
import Detail from "./views/Detail"
import Login from "./views/Login"
import LodgingForm from "./views/LodgingForm"
import Type from "./views/Type"
import LodgingPatchImageUrlForm from "./views/LodgingPatchImageUrlForm"
import UserForm from "./views/UserForm"


const router = createBrowserRouter([
    {
        element:<MainLayout/>,
        loader: () => {
            if (!localStorage.access_token) {
                return redirect("/login")
            }
            return null
        },
        children: [
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"/lodging/:id",
                element:<Detail/>
            },
            {
                path:"/post-lodging",
                element:<LodgingForm/>
            },
            {
                path:"/edit-lodging/:id",
                element:<LodgingForm/>
            },
            {
                path:"/type",
                element:<Type/>
            },
            {
                path:"/patch-lodging/:id",
                element:<LodgingPatchImageUrlForm/>
            },
            {
                path:"/add-user",
                element:<UserForm/>
            }
        ]
    },
    {
        path: "/login",
        element:<Login/>
    }
])

export default router