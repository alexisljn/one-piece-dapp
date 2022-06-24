import React, {useContext} from "react";
import {UserContext} from "../../../App";
interface HeaderProps {
    connect: () => void;
}

export function Header({connect}: HeaderProps) {

    const {user} = useContext(UserContext);
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
