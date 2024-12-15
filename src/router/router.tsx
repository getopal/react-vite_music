import { createBrowserRouter } from 'react-router-dom'
import Layout from '../pages/Layout.tsx'
import Home from '../pages/Home.tsx'
import Tracks from '../pages/tracks/Tracks.tsx'
import Auth from '../pages/Auth.tsx'
import ErrorPage from '../pages/ErrorPage.tsx'
import { ProtectedRoute } from '../components/ProtectedRoute.tsx'
import AddTrack from '../pages/tracks/AddTrack.tsx'

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
        path: 'addtrack',
        element: (
          <ProtectedRoute>
            <AddTrack />
          </ProtectedRoute>
        ),
      },
      {
        path: 'tracks',
        element: (
          <ProtectedRoute>
            <Tracks />
          </ProtectedRoute>
        ),
      },
      {
        path: 'auth',
        element: <Auth />,
      },
    ],
  },
])
