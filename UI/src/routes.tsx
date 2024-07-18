
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/home/dashboard';
import ProtectedRoute from './protected';
import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import Playground from './pages/home/playground';
import Home from './pages/home/home';
import Settings from './pages/home/settings';
function AppRoutes() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute element={<Home />} />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
      ],
    },
    {
      path: "/editor",
      element: <ProtectedRoute element={<Playground />} />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default AppRoutes
