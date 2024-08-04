import {ActionFunction, LoaderFunction} from "remix";

const backend = new URL(process.env.BACKEND_HOST || "http://127.0.0.1:8000")

const removeTrailingSlash = (input: string): string => {
    if (input.endsWith("/")) {
        return input.slice(0, -1)
    }
    return input
}

const pathname = removeTrailingSlash(backend.pathname)

const proxy = async (request: Request) => {
    const url = new URL(request.url)
    url.protocol = backend.protocol
    url.host = backend.host
    url.port = backend.port
    url.pathname = `${pathname}${url.pathname}`
    const req = new Request(url.toString(), request)
    return await fetch(req)
}


export const loader: LoaderFunction = async ({request}) => {
    return proxy(request)
}

export const action: ActionFunction = async ({request}) => {
    return proxy(request)
}
