
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NewsList from './pages/news';
import Summarize from './pages/summarize';
import Error from './pages/error';

const dummyData = {
  post: {
    date: "2024-07-21",
    title: "Sample Blog Post",
    image: "https://via.placeholder.com/720x405",
    body: {
      code: "<p>This is a sample blog post body content.</p>",
    },
  },
  authors: [
    {
      _id: "1",
      twitter: "author1",
      avatar: "https://via.placeholder.com/42",
      title: "Author One",
    },
    {
      _id: "2",
      twitter: "author2",
      avatar: "https://via.placeholder.com/42",
      title: "Author Two",
    },
  ],
};

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
          element: <Summarize params={dummyData} />,
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
