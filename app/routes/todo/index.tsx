import {LoaderFunction, redirect} from "remix";

export const loader: LoaderFunction = () => {
   return redirect("todo/all/")
}

export default function Todo() {
    return <div/>
}
