import {createBrowserRouter} from "react-router-dom";
import Layout from "../pages/Layout.tsx";
import Home from "../pages/Home.tsx";
import Categories from "../pages/Categories.tsx";
import Auth from "../pages/Auth.tsx";
import ErrorPage from "../pages/ErrorPage.tsx";

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
              element: <Categories />,
            },
            {
                path: 'auth',
                element: <Auth />,
            },
        ]
    }
]);