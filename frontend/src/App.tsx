import React from 'react';
import './App.css';
import {Routes} from "react-router-dom";
import {routes} from "./routes/routes";
import {renderRoutes} from "./routes/renderRoutes";

function App() {

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
