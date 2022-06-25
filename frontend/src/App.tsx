import React, {useEffect, useState} from 'react';
import {Routes} from "react-router-dom";
import {routes} from "./routes/routes";
import {renderRoutes} from "./routes/renderRoutes";
import {Header} from "./components/common/Header/Header";
import {ethers} from "ethers";
import {Address} from "./types/Address";
import {UserContextType} from "./types/UserContextType";

export const UserContext = React.createContext<UserContextType>({user: null, provider: null});

function App() {

    const [user, setUser] = useState<Address|null>(null);
    const [provider, setProvider] = useState<ethers.providers.Web3Provider|null>(null);

    useEffect(() => {
        if (typeof window.ethereum != "undefined") {
            const web3provider = new ethers.providers.Web3Provider(window.ethereum as any) // https://github.com/MetaMask/providers/issues/200
            setProvider(web3provider)
            //TODO Message d'erreur à gérer
        }
    }, []);

    async function connect() {
        try {
            const userAddress: Address[] = await provider?.send("eth_requestAccounts", []);
            setUser(userAddress[0]);
        } catch (error) {
            //TODO
            console.error(error);
        }
    }

    return (
        <div>
            <UserContext.Provider value={{user: user, provider: provider}}>
                <Header connect={connect}/>
                <Routes>
                  {renderRoutes(routes)}
                </Routes>
            </UserContext.Provider>
        </div>
    );
}

export default App;
