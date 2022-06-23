import React, {ReactElement} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {Skills} from "./components/pages/Skills/Skills";

function App() {

    type RouteData = {
        path: string,
        element: ReactElement,
    };

    const routes: RouteData[] = [
        {
            path: '/',
            element: <Skills/>
        },
        {
            path: '/skills',
            element: <Skills/>
        }
    ]

    function renderRoutes(routes: RouteData[]): ReactElement[] {
        return routes.map((routes, index) => (
            <Route key={index} path={routes.path} element={routes.element}/>
        ))
    }

    return (
        <div>
          Header
          <Routes>
              {renderRoutes(routes)}
          </Routes>
        </div>
    );
}

export default App;
