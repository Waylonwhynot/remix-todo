import {Outlet, LinksFunction, LoaderFunction, useLoaderData, useParams, redirect, useNavigate} from "remix"
import {Header, links as headerLinks} from "~/components/header";
import {Input, links as inputLinks} from "~/components/input";
import {Spin, links as spinLinks} from "~/components/spin";
import {links as tabLinks} from "~/components/tab"
import { links as todoLinks} from "~/components/todo"
import {Configuration, TodoApi} from "~/generated";
import {useEffect, useState} from "react";
import {useAsync} from "~/hooks";



export const links: LinksFunction = () => {
    return [
        ...headerLinks(), ...spinLinks(), ...inputLinks(), ...tabLinks(), ...todoLinks()
    ]
}


const api = new TodoApi(new Configuration({basePath: ""}));


export default function () {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const loadingOpts = {
        onBefore: () => setLoading(true),
        onFinally: () => setLoading(false)
    }
    const create = useAsync(api.createTodo.bind(api), loadingOpts)

    const handleCreate = (text: string) => {
        create.run({todoCreate: {text}})
    }

    useEffect( ()=> {
        if (create.state === 'COMPLETED') {
            navigate(0)
        }
    }, [create.state])

    return (
        <Spin spinning={loading}>
            <Header title="My Todo List">
                <Input onCompleted={handleCreate}/>
            </Header>
            <main>
                <Outlet />
            </main>
        </Spin>
    )
}
