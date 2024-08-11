import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";

import Sandbox from './Sandbox/Sandbox';
import Todo from "./Todo";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/sandbox" replace/>
    },
    {
        path: "/sandbox",
        element: <Sandbox/>
    },
    {
        path: "/login",
        element: <Todo/>
    },
    {
        path: "/signup",
        element: <Todo/>
    },
    {
        path: "/home",
        element: <Todo/>
    },
    {
        path: "/profile",
        element: <Todo/>
    },
]);

document.documentElement.setAttribute("theme", "light");

const reactRoot = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

reactRoot.render(
    <React.StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
);