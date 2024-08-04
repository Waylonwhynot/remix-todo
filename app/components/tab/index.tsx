import React, {Key, PropsWithChildren, useContext} from "react";
import style from "./index.css";
import type {LinksFunction} from "remix";

export const links: LinksFunction = () => {
    return [
        {rel: 'stylesheet', href: style}
    ]
}

interface ActiveContextProps {
    value?: Key
    onChange: (id: Key) => void
}

const ActiveContext = React.createContext<ActiveContextProps>({
    onChange: id => {
    }
})


export interface TabItemProps {
    id: Key
}


// const Item = (props: PropsWithChildren<TabItemProps>) => {
//     const context = useContext(ActiveContext)
//
//     return (
//         <div
//             // className={classes}
//             className={cx("tab-item", {active: context.value === props.id})}
//             onClick={() => context.onChange(props.id)}>
//             {props.children}
//         </div>
//     )
// }

class Item extends React.Component<PropsWithChildren<TabItemProps>, any> {
    render() {
        return (
            <ActiveContext.Consumer>
                {ctx => {
                    const classes = `tab-item ${ctx.value === this.props.id ? 'active' : ''}`
                    return (
                        <div
                            className={classes}
                            onClick={() => ctx.onChange(this.props.id)}>
                            {this.props.children}
                        </div>
                    )
                }}
            </ActiveContext.Consumer>
            )
    }
}

export interface TabNavProps {
    active?: Key;
    onChange: (id: Key) => void
}

class Nav extends React.Component<PropsWithChildren<TabNavProps>, any> {
    render() {
        return (
            <ActiveContext.Provider value={{value: this.props.active, onChange: this.props.onChange}}>
                <div className="tab-nav">
                    {this.props.children}
                </div>
            </ActiveContext.Provider>
        );
    }
}

export const Tab = {
    Nav,
    Item
}

