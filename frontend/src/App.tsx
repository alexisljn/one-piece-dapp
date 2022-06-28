import React, {useEffect, useState} from 'react';
import {Routes} from "react-router-dom";
import {routes} from "./routes/routes";
import {renderRoutes} from "./routes/renderRoutes";
import {Header} from "./components/common/Header/Header";
import {ethers} from "ethers";
import {Address} from "./types/Address";
import {UserContextType} from "./types/UserContextType";

export const UserContext = React.createContext<UserContextType>({user: null, provider: null, isLogged: false});

function App() {

    const [user, setUser] = useState<Address|null>(null);
    const [provider, setProvider] = useState<ethers.providers.Web3Provider|null>(null);
    const [isLogged, setIsLogged] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window.ethereum != "undefined") {
            const web3provider = new ethers.providers.Web3Provider(window.ethereum as any) // https://github.com/MetaMask/providers/issues/200
            setProvider(web3provider)
            // localStorage pour setIsLogged
            //TODO Message d'erreur à gérer
        }
    }, []);

    async function connectWallet() {
        try {
            const userAddress: Address[] = await provider?.send("eth_requestAccounts", []);
            setUser(userAddress[0]);
        } catch (error) {
            //TODO
            console.error(error);
        }
    }

    async function signInWithEthereum() {
        try {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            const response = await fetch("http://localhost:8000/login", {headers, method: "POST", body: JSON.stringify({signature: "toto"})});
            console.log(await response.json());
        } catch (error: unknown) {
            console.error(error);
        }
        // setIsLogged((prevState) => !prevState);
    }

    return (
        <div>
            <UserContext.Provider value={{user, provider, isLogged}}>
                <Header connectWallet={connectWallet} signInWithEthereum={signInWithEthereum}/>
                <Routes>
                  {renderRoutes(routes)}
                </Routes>
            </UserContext.Provider>
        </div>
    );
}

export default App;
