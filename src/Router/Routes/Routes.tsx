import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../Layout/MainLayout/MainLayout";
import Home from "../../pages/Home";
import Product from "../../pages/Product/Product";
import Register from "../../pages/Register/Register";
import Login from "../../pages/Login/Login";
import Error from "../../pages/Shared/Error/Error";
import About from "../../pages/About/About";
import SignUp from "../../pages/SignUp/SignUp";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/product",
        element: <Product />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);
