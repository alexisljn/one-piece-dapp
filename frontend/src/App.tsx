import React from 'react';
import './App.css';
import {Routes} from "react-router-dom";
import {routes} from "./routes/routes";
import {renderRoutes} from "./routes/renderRoutes";
import {Header} from "./components/common/Header/Header";

function App() {

    return (
        <div>
          <Header/>
          <Routes>
              {renderRoutes(routes)}
          </Routes>
        </div>
    );
}

export default App;
