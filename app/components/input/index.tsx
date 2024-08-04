import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import style from "./index.css";
import type {LinksFunction} from "remix";

export const links: LinksFunction = () => {
    return [
        {rel: 'stylesheet', href: style}
    ]
}


export interface InputProps {
    onCompleted: (text: string) => void
}


export const Input = (props: InputProps) => {
    const [value, setValue] = useState("")

    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleClick()
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    const handleClick = () => {
        if (value) {
            props.onCompleted(value)
            setValue( '')
        }
    }
    return (
        <>
            <input type="text"
                   value={value}
                   placeholder="Things to be done..."
                   onKeyPress={handleKeyPress}
                   onChange={handleChange}/>
            <button className="btn-add" onClick={handleClick}>Add</button>
        </>
    )
}


// export class Input extends React.Component<InputProps, InputState> {
//     constructor(props: InputProps) {
//         super(props);
//         this.state = {
//             value: ''
//         }
//
//         this.handleChange = this.handleChange.bind(this)
//         this.handleKeyPress = this.handleKeyPress.bind(this)
//         this.handleClick = this.handleClick.bind(this)
//     }
//
//     handleChange(event: ChangeEvent<HTMLInputElement>) {
//         this.setState({value: event.target.value})
//     }
//
//     handleKeyPress(event: KeyboardEvent) {
//         if (event.key === 'Enter') {
//             this.handleClick()
//         }
//     }
//
//     handleClick() {
//         if (this.state.value) {
//             this.props.onCompleted(this.state.value)
//             this.setState({value: ''})
//         }
//     }
//
//     render() {
//         return (
//             <>
//                 <input type="text"
//                        value={this.state.value}
//                        placeholder="Things to be done..."
//                        onKeyPress={this.handleKeyPress}
//                        onChange={this.handleChange}/>
//                 <button className="btn-add" onClick={this.handleClick}>Add</button>
//             </>
//         )
//     }
// }
