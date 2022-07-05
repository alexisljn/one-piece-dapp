import React, {useContext, useEffect, useState} from "react";
import {UserContextType} from "../../../types/UserContextType";
import {UserContext} from "../../../App";
import {Contract, ethers} from "ethers";

import {ContractInterface} from "ethers/lib/ethers";

import berryAbi from "../../../artifacts/contracts/Berry.sol/Berry.json";

export function PurchaseBerry() {

    const {user, provider} = useContext<UserContextType>(UserContext);

    const [berryContract, setBerryContract] = useState<null|Contract>(null);

    useEffect(() => {

    }, []);

    async function connectContract() {
        if (user) {
            const ctrInterface = new ethers.utils.Interface(JSON.stringify(berryAbi.abi));
            // console.log(ctrInterface);
            const _berryContract = new ethers.Contract(
                "0x51C65cd0Cdb1A8A8b79dfc2eE965B1bA0bb8fc89",
                ctrInterface,
                provider?.getSigner()
            )

            setBerryContract(_berryContract)
        }
    }

    return (
        <div>
            <p>pURCHASE BERRY !</p>
            <input type="text"/>
            <button onClick={connectContract}>connect contract</button>
        </div>
        
    )
}
