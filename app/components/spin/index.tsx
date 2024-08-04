import {PropsWithChildren} from "react"

import style from "./index.css";
import type {LinksFunction} from "remix";

export const links: LinksFunction = () => {
    return [
        {rel: 'stylesheet', href: style}
    ]
}

export function Spin(props: PropsWithChildren<{ spinning: boolean }>) {

    const spin = (
        <div className="mask">
            <div className="spinner"/>
        </div>
    )

    return (
        <>
            {props.children}
            {props.spinning && spin}
        </>
    )
}



