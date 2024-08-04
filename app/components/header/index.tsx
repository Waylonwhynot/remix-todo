import React, {PropsWithChildren} from "react";
import type {LinksFunction} from "remix";
import style from "./index.css";

export const links: LinksFunction = () => {
    return [
        {rel: 'stylesheet', href: style}
    ]
}

export interface HeaderProps {
    title: string
}

export function Header(props: PropsWithChildren<HeaderProps>) {
    return (
        <header>
            <h1>{props.title}</h1>
            {props.children}
        </header>
    );
}


// export class Header extends React.Component<PropsWithChildren<HeaderProps>, any> {
//
//     render() {
//         return (
//             <header>
//                 <h1>{this.props.title}</h1>
//                 {this.props.children}
//             </header>
//         );
//     }
// }
