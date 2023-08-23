import React from "react";
// import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { createBrowserRouter, RouterProvider,Outlet } from "react-router-dom"
import Users from "../pages/admin/Users";
import ErrorBoundary from "../pages/ErrorBoundary";

export default function Router() {
  const Layout = () => {
    return (
      <>
        <Outlet />
      </>
    );
  };

  const BrowserRoutes=createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        errorElement:<ErrorBoundary/>,
        children:[
            {
                path:"/",
                element:<Users/>
            }
        ]
    }
  ]);

  return(
    <RouterProvider router={BrowserRoutes}/>
  )
  
}
