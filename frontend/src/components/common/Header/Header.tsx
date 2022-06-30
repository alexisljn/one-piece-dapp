import React, {useContext} from "react";
import {UserContext} from "../../../App";
import {LogStatus} from "./LogStatus";
import {UserContextType} from "../../../types/UserContextType";

interface HeaderProps {
    connectWallet: () => void;
    signInWithEthereum: () => void;
    logout: () => void;
}

export function Header({connectWallet, signInWithEthereum, logout}: HeaderProps) {

    const {user, isLogged} = useContext<UserContextType>(UserContext);
    console.log("val", user)

    return (
        <div className="container-fluid bg-dark text-white py-2">
            <div className="row">
                <div className="col col-lg-11"></div>
                <div className="col col-lg-1">
                    <LogStatus connectWallet={connectWallet} signInWithEthereum={signInWithEthereum} logout={logout}/>
                </div>
            </div>
        </div>
    )
}
