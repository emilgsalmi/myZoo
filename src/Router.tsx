
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { AnimalDetailsPage } from "./components/AnimalDetailPage/AnimalDetailPage";
import { Animals } from "./components/AnimalList/AnimalList";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<App />,
        children: [
            {
                path:"/",
                element:<Animals/>,
                index:true
            },
            {
                path:"/:id",
                element:<AnimalDetailsPage/>
            }
        ]
    }
])