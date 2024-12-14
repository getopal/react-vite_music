import {createBrowserRouter} from "react-router-dom";
import Layout from "../pages/Layout.tsx";
import Home from "../pages/Home.tsx";
import Tracks from "../pages/Tracks.tsx";
import Auth from "../pages/Auth.tsx";
import ErrorPage from "../pages/ErrorPage.tsx";
import {ProtectedRoute} from "../components/ProtectedRoute.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
              path: 'categories',
                element: <ProtectedRoute>
                    <Tracks />
                </ProtectedRoute>,
            },
            {
                path: 'auth',
                element: <Auth />,
            },
        ]
    }
]);