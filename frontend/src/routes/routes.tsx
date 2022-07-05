import {Skills} from "../components/pages/Skills/Skills";
import {PurchaseBerry} from "../components/pages/PurchaseBerry/PurchaseBerry";
import {RouteData} from "../types/RouteData";

export const routes: RouteData[] = [
    {
        path: '/',
        element: <Skills/>
    },
    {
        path: '/skills',
        element: <Skills/>
    },
    {
        path: '/berry',
        element: <PurchaseBerry/>
    }
]
