
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './protected';

function AppRoutes() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute element={< div/>} />,
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
