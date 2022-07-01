import React, {useCallback, useEffect, useState} from 'react';
import {Routes} from "react-router-dom";
import {routes} from "./routes/routes";
import {renderRoutes} from "./routes/renderRoutes";
import {Header} from "./components/common/Header/Header";
import {ethers} from "ethers";
import {Address} from "./types/Address";
import {UserContextType} from "./types/UserContextType";
import {fetchCall} from "./helpers/ApiHelper";
import {
    createSiweMessage,
    deleteAccessToken,
    getAccessTokenPayload,
    hasUserAValidAccessToken
} from "./helpers/AuthHelper";
import {fireToast} from "./helpers/UtilHelper";

export const UserContext = React.createContext<UserContextType>({user: null, provider: null, isLogged: false});

function App() {

    const [user, setUser] = useState<Address|null>(null);
    const [provider, setProvider] = useState<ethers.providers.Web3Provider|null>(null);
    const [isLogged, setIsLogged] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            if (typeof window.ethereum != "undefined") {
                const web3provider = new ethers.providers.Web3Provider(window.ethereum as any) // https://github.com/MetaMask/providers/issues/200
                setProvider(web3provider)

                if (await hasUserAValidAccessToken()) {
                    const {address} = getAccessTokenPayload();
                    setUser(address);
                    setIsLogged(true);
                }
            }
            //TODO Message d'erreur à gérer si pas ethereum injecté
        })();
    }, []);

    const connectWallet = useCallback(async () => {
        try {

            if (!provider) {
                throw new Error('Please install metamask');
            }

            const userAddress: Address[] = await provider.send("eth_requestAccounts", []);
            setUser(userAddress[0]);
        } catch (error: any) {
            fireToast("error", error.message);
        }
    }, [provider]);

    const signInWithEthereum = useCallback(async () => {
        try {

            const {nonce} = await fetchCall('auth/nonce')

            const signer = provider!.getSigner();

            const siweMessage = await createSiweMessage(signer, nonce);

            const preparedSiweMessage = siweMessage.prepareMessage();

            const signature = await signer.signMessage(preparedSiweMessage);

            const {accessToken} = await fetchCall("auth/login", {method:"POST", body:{message: siweMessage, signature}});

            window.localStorage.setItem('accessToken', accessToken);

            setIsLogged(true);
        } catch (error: any) {
            fireToast("error", error.message);
        }
    }, [provider]);

    const logout = useCallback(() => {
        setUser(null);
        setIsLogged(false);
        deleteAccessToken();
    }, []);

    return (
        <div>
            <UserContext.Provider value={{user, provider, isLogged}}>
                <Header connectWallet={connectWallet} signInWithEthereum={signInWithEthereum} logout={logout}/>
                <Routes>
                  {renderRoutes(routes)}
                </Routes>
            </UserContext.Provider>
        </div>
    );
}

export default App;
