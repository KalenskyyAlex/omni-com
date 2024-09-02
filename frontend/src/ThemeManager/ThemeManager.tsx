import React, {useEffect} from 'react';
import '../index.css';
import {createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";

import Sandbox from '../Sandbox/Sandbox';
import Todo from "../Todo";
import Guidelines from "../Guidelines/Guidelines";

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
    {
        path: "/guidelines",
        element: <Guidelines/>
    }
]);

function ThemeManager() {
    useEffect(() => {
        let storedTheme = localStorage.getItem("theme");
        if (storedTheme === undefined || storedTheme === null) {
            localStorage.setItem("theme", "light");
            storedTheme = "light";
        }

        document.documentElement.setAttribute("theme", storedTheme);
    });

    return (
        <RouterProvider router={router}></RouterProvider>
    );
}

export default ThemeManager;
