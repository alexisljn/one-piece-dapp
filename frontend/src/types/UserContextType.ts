import {Address} from "./Address";
import {providers} from "ethers";

export type UserContextType = {
    user: Address|null,
    provider: providers.Web3Provider|null,
    isLogged: boolean;
}
