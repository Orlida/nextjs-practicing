'use client'
import { login } from "./action"
import { useActionState } from "react"


export default function Page(){

    const initState = {
        message: ''
    }

    const [state, formAction, isPending] = useActionState(login, initState)
    
    return(
        <>
            <form action={formAction}>
                <div>
                    <label htmlFor="emailLogin">Email: </label>
                    <input className="rounded-sm border-1 border-color-[#ddd]" type="email" id="emailLogin" name="email"/>
                </div>
                <div>
                    <label htmlFor="passwordLogin">Password: </label>
                    <input className="rounded-sm mt-2 border-1 border-color-[#ddd]" type="password" id="passwordLogin" name="password"/>
                </div>
                <button className="cursor-pointer bg-blue-400 p-2 rounded-lg mt-2" disabled={isPending}>{isPending ? "Submitting..." : "Submit!"}</button>
                <div>Message : {state.message}</div>
            </form>
        </>
    )
}