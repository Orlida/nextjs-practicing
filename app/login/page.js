'use client'
import { login } from "./action"
import { useActionState } from "react"

export default function Page(){

    const initState = { message: '' }
    const [state, formAction, isPending] = useActionState(login, initState)

    return (
        <main className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">

                <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h1>
                <p className="text-sm text-gray-500 mb-6">Sign in to manage your library</p>

                <form action={formAction} className="flex flex-col gap-4">

                    <div className="flex flex-col gap-1">
                        <label htmlFor="emailLogin" className="text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                            type="email"
                            id="emailLogin"
                            name="email"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="passwordLogin" className="text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                            type="password"
                            id="passwordLogin"
                            name="password"
                            placeholder="••••••••"
                        />
                    </div>

                    {state.message && (
                        <p className="text-sm text-red-500">{state.message}</p>
                    )}

                    <button
                        className="mt-2 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer"
                        disabled={isPending}
                    >
                        {isPending ? "Signing in..." : "Sign in"}
                    </button>

                </form>
            </div>
        </main>
    )
}