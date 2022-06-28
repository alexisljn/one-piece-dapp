import React, {useContext} from "react";
import {UserContext} from "../../../App";
import {LogStatus} from "./LogStatus";
import {UserContextType} from "../../../types/UserContextType";
interface HeaderProps {
    connectWallet: () => void;
    signInWithEthereum: () => void;
}

export function Header({connectWallet, signInWithEthereum}: HeaderProps) {

    const {user, isLogged} = useContext<UserContextType>(UserContext);
    console.log("val", user)

    return (
        <div className="container-fluid bg-dark text-white py-2">
            <div className="row">
                <div className="col col-lg-11"></div>
                <div className="col col-lg-1">
                    {user
                        ? <p>Connecté !</p>
                        : <button type="button" className="btn btn-primary" onClick={connect}>Connexion</button>
                    }
                </div>
            </div>
        </div>
    )
}
