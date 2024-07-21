
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NewsList from './pages/news';
import Summarize from './pages/summarize';
import Error from './pages/error';

function AppRoutes() {

  const router = createBrowserRouter([
    // {
    //   path: "/",
    //   element: <ProtectedRoute element={< div />} />,
    //   children: [],
    // },
    {
      path: "/news",
      errorElement:<Error />,
      children: [
        {
          path: "",
          element: <NewsList/>,
        },
        {
          path: "summarize",
          element: <Summarize  />,
        },
      ]
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default AppRoutes
