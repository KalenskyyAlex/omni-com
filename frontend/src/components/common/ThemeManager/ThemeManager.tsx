import React, {useEffect} from 'react';
import '../../../index.css';
import {createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";

import Sandbox from '../../editor/Sandbox/Sandbox';
import Todo from "../../../Todo";
import Guidelines from "../../guidelines/Guidelines/Guidelines";
import Login from "../../auth/Login/Login";
import NotFound404 from "../../error/NotFound404/NotFound404";
import Signup from "../../auth/Signup/Signup";

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
        element: <Login/>
    },
    {
        path: "/reset",
        element: <Todo/>
    },
    {
        path: "/verify/account",
        element: <Todo/>
    },
    {
        path: "/verify/password",
        element: <Todo/>
    },
    {
        path: "/signup",
        element: <Signup/>
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
    },
    {
        path: "*",
        element: <NotFound404/>
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
