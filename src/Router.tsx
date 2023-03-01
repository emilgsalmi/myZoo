import path from "path";
import { Children } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { AnimalDetailsPage } from "./components/AnimalDetailPage/AnimalDetailPage";
import { Animals } from "./components/AnimalList/AnimalList";
import { HomePage } from "./components/HomePage/HomePage";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<App />,
        children: [
            {
                path:"/",
                element:<HomePage/>
            },
            {
                path:"/animals",
                element: <Animals/>,
            },
            {
                path:"/animals/:id",
                element:<AnimalDetailsPage/>
            }
        ]
    },
])