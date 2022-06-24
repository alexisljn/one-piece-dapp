import {RouteData} from "../types/RouteData";
import {Route} from "react-router-dom";
import React from "react";

export function renderRoutes(routes: RouteData[]): JSX.Element[] {
    return routes.map((routes, index) => (
        <Route key={index} path={routes.path} element={routes.element}/>
    ))
}
