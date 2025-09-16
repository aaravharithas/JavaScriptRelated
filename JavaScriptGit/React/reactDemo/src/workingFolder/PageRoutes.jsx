import {
  createBrowserRouter,
  Link,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./PageForRoutes/Home";
import About from "./PageForRoutes/About";
import Contact from "./PageForRoutes/Contact";
import Register from "./PageForRoutes/Register";
import Courses from "./PageForRoutes/Courses";
import Python from "./PageForRoutes/CourseChildren/Python";
import Cpp from "./PageForRoutes/CourseChildren/Cpp";
import Java from "./PageForRoutes/CourseChildren/Java";
import Javascript from "./PageForRoutes/CourseChildren/Javascript";
import Navigation from "./PageForRoutes/Navigation";
import ApiDemo from "./PageForRoutes/ApiProduct/ApiDemo";
import Product from "./PageForRoutes/ApiProduct/Product";

function PageRoutes() {
  let routes = createBrowserRouter([
    {
      path: "/",
      element: <Navigation />,
      children: [
        {
          index:true,
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/register",
          element: <Register/>,
        },
        {
          path: "/apidemo",
          element: <ApiDemo/>,
        },
        {
          path: "/product/:id",
          element: <Product/>,
        },
        {
          path: "/courses",
          element: <Courses />,
          children: [
            {
              path: "python",
              element: <Python />,
            },
            {
              path: "cpp",
              element: <Cpp />,
            },
            {
              path: "java",
              element: <Java />,
            },
            {
              path: "javascript",
              element: <Javascript />,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}


export default PageRoutes;