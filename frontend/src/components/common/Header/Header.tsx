import React from "react";

export function Header() {
    return (
        <div className="container-fluid bg-dark text-white py-2">
            <div className="row">
                <div className="col col-lg-11"></div>
                <div className="col col-lg-1">
                    <button type="button" className="btn btn-primary">Connexion</button>
                </div>
            </div>
        </div>
    )
}
