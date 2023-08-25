import React from "react";
// import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Users from "../pages/admin/Users";
import ErrorBoundary from "../pages/ErrorBoundary";
import SignUp from "../pages/signUp/SignUp";
import Login from "../pages/login/Login";

export default function Router() {
  const Layout = () => {
    return (
      <>
        <Outlet />
      </>
    );
  };

  const BrowserRoutes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: "/",
          element: <Users />,
        },
       
      ],
    },
    {
      path: "sign-up",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={BrowserRoutes} />;
}
