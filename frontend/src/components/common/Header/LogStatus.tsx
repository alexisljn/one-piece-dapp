import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../App";
import {UserContextType} from "../../../types/UserContextType";

interface LogStatusProps {
    connectWallet: () => void;
    signInWithEthereum: () => void;
}

type LogStatusType = "guest" | "wallet" | "connected"

function getLogStatus({user, isLogged}: Partial<UserContextType>): LogStatusType {
    if (user !== null && !isLogged) {
        return "wallet";
    } else if (user !== null && isLogged) {
        return "connected"
    } else {
        return "guest";
    }
}

export function LogStatus({connectWallet, signInWithEthereum}: LogStatusProps) {

    const {user, isLogged} = useContext<UserContextType>(UserContext);

    const [logStatus, setLogStatus] = useState<LogStatusType>("guest");

    useEffect(() => {
        setLogStatus(getLogStatus({user, isLogged}))
    }, [isLogged, user]);

    return (
        <>
            {logStatus === "guest" &&
                <button type="button" className="btn btn-primary" onClick={connectWallet}>Connect with Metamask</button>
            }
            {logStatus === "wallet" &&
                <button type="button" className="btn btn-primary" onClick={signInWithEthereum}>Sign in with Ethereum</button>
                // Balances etc.
            }
            {logStatus === "connected" &&
                <p>Logged</p>
            }
        </>
    )
}
