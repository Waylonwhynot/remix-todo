import {Configuration, Todo, TodoApi} from "~/generated";
import {json, LoaderFunction, useLoaderData, useNavigate, useParams} from "remix";
import {TodoList} from "~/components/todo";
import {Tab} from "~/components/tab";
import {Key} from "react";
import {useAsync} from "~/hooks";

const serverApi = new TodoApi(new Configuration({basePath: "http://127.0.0.1:8000"}))
const clientApi = new TodoApi(new Configuration({basePath: ""}));


export const loader: LoaderFunction = async ({params}) => {
    const todos = await serverApi.listTodos({filter: params.filter})
    return json(todos)
}

export default function () {
    const todos = useLoaderData<Todo[]>()
    const navigate = useNavigate()
    const params = useParams()

    const options = {
        onSuccess: () => navigate(0)
    }

    const update = useAsync(clientApi.updateTodo.bind(clientApi), options)
    const remove = useAsync(clientApi.removeTodo.bind(clientApi), options)

    const switchTodoState = (id: number) => {
        const todo = todos?.find(todo => todo.id === id)
        if (todo) {
            update.run({id: todo.id, todoMutation: {done: !todo.done}})
        }
    }
    const removeTodo = (id: number) => {
        remove.run({id})
    }
    const handleSwitchTab = (id: Key) => {
        navigate(`/todo/${id}`)
    }
    return (
        <>
            <Tab.Nav active={params.filter} onChange={handleSwitchTab}>
                <Tab.Item id="todo">待办</Tab.Item>
                <Tab.Item id="all">全部</Tab.Item>
            </Tab.Nav>
            <TodoList todos={todos || []} onSwitch={switchTodoState} onRemove={removeTodo}/>
        </>
        )

}
