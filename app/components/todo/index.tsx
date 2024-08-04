import React from 'react'
import {Todo} from "~/generated";
import style from "./index.css";
import type {LinksFunction} from "remix";

export const links: LinksFunction = () => {
    return [
        {rel: 'stylesheet', href: style}
    ]
}


export interface TodoItemProps {
    todo: Todo;
    onSwitch: (id: number) => void;
    onRemove: (id: number) => void;
}


const TodoItem = (props: TodoItemProps) => {
    return (
        <li key={props.todo.id}>
            <div className="content" onClick={() => props.onSwitch(props.todo.id)}>
                <input type="checkbox" id={props.todo.id.toString()} checked={props.todo.done} readOnly={true}/>
                <span className="checkmark"/>
                <label htmlFor={props.todo.id.toString()}>{props.todo.text}</label>
            </div>
            <i className="del fa-solid fa-trash-can" onClick={() => props.onRemove(props.todo.id)}/>
        </li>
    )
}


interface TodoListProps {
    todos: Todo[];
    onSwitch: (id: number) => void;
    onRemove: (id: number) => void;
}

export const TodoList = (props: TodoListProps) => (
    <ul>
        {props.todos.map(todo => (
            <TodoItem
                key={todo.id}
                todo={todo}
                onSwitch={props.onSwitch}
                onRemove={props.onRemove}/>
        ))}
    </ul>
)
