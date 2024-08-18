import { createBrowserRouter } from "react-router-dom";
import WeatherFinder from "./views/WeatherFinder";

const router = createBrowserRouter([
    {
        path: '/',
        element: <WeatherFinder/>
    }
])

export default router;