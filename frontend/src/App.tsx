import React, {useEffect, useState} from 'react';
import './App.css';
import {Routes} from "react-router-dom";
import {routes} from "./routes/routes";
import {renderRoutes} from "./routes/renderRoutes";
import {Header} from "./components/common/Header/Header";
import {ethers} from "ethers";

function App() {

    const [provider, setProvider] = useState<ethers.providers.Web3Provider|null>(null);

    useEffect(() => {
        if (typeof window.ethereum != "undefined") {
            setProvider(new ethers.providers.Web3Provider(window.ethereum as any)) // https://github.com/MetaMask/providers/issues/200
            // Message d'erreur si pas de provider à gerer plus tard
        }
    }, []);

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
