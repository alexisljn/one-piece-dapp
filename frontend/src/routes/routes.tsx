// import React from "react";
import {Skills} from "../components/pages/Skills/Skills";
import {RouteData} from "../types/RouteData";

export const routes: RouteData[] = [
    {
        path: '/',
        element: <Skills/>
    },
    {
        path: '/skills',
        element: <Skills/>
    }
]
