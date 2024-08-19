import { createBrowserRouter } from "react-router-dom";
import WeatherFinder from "./views/WeatherFinder";
import FavoriteLocations from "./views/FavoriteLocations";

const router = createBrowserRouter([
    {
        path: '/',
        element: <WeatherFinder/>
    },
    {
        path: '/favorite',
        element: <FavoriteLocations/>
    }
])

export default router;