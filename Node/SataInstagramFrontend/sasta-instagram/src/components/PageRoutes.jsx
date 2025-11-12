import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Feed from "./pages/Feed";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Post from "./pages/Post";
import UserAccount from "./pages/UserAccount";
import SinglePost from "./pages/SinglePost";

function PageRoutes() {
  let routes = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/feed",
        element: <Feed />,
    },
    {
        path: "/account",
        element: <Account />,
    },
    {
        path: "/post",
        element: <Post />,
    },
    {
        path: "/account/:id",
        element: <UserAccount />,
    },
    {
        path: "/post/:id",
        element: <SinglePost />,
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}


export default PageRoutes;