'use client'
import { useState, useEffect } from 'react';

export default function Page({ params }){
    const [book, setBook] = useState({ name: "", Author: "", shortContent: "" })
    const [saved, setSaved] = useState(false)
    const api = 'https://69e4b317cfa9394db8da4c98.mockapi.io/api/books'

    const getBook = async () => {
        try {
            const { id } = await params
            const response = await fetch(`${api}/${id}`)
            if(!response.ok) throw new Error("Something went wrong");
            const data = await response.json()
            setBook(data)
        } catch(error) {
            console.log("Error", error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook((prev) => ({ ...prev, [name]: value }))
    }

    const handleUpdate = async () => {
        try {
            const { id } = await params
            const response = await fetch(`${api}/${id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(book)
            })
            if(!response.ok) throw new Error("Something went wrong");
            const data = await response.json()
            setBook(data)
            setSaved(true)
            setTimeout(() => setSaved(false), 3000)
        } catch(error) {
            console.log("Error", error);
        }
    }

    useEffect(() => { getBook() }, [])

    return (
        <main className="max-w-2xl mx-auto px-6 py-10">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">

                <div className="text-xs text-gray-400 mb-4">Book ID: {book.id}</div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{book.name}</h1>
                <p className="text-sm text-gray-500 mb-6">by {book.Author}</p>

                <div className="border-t border-gray-100 pt-6 mb-8">
                    <h2 className="text-sm font-semibold text-gray-700 mb-2">Description</h2>
                    <p className="text-gray-600 leading-relaxed">{book.shortContent}</p>
                </div>

                <div className="border-t border-gray-100 pt-6">
                    <h2 className="text-sm font-semibold text-gray-700 mb-4">Edit Book</h2>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">Name</label>
                            <input
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                type="text"
                                name="name"
                                value={book.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">Author</label>
                            <input
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                type="text"
                                name="Author"
                                value={book.Author}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
                                name="shortContent"
                                value={book.shortContent}
                                onChange={handleChange}
                                rows={4}
                            />
                        </div>

                        <div className="flex items-center gap-3 mt-2">
                            <button
                                onClick={handleUpdate}
                                className="cursor-pointer bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
                            >
                                Update
                            </button>
                            {saved && (
                                <span className="text-sm text-green-600">✓ Saved successfully</span>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </main>
    )
}