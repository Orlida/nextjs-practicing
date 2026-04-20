import { headers } from "next/headers"
import Link from "next/link";

async function fetchBooks() {
  const api = 'https://69e4b317cfa9394db8da4c98.mockapi.io/api/books'
  const response = await fetch(api, { cache: 'no-store'})
  if(!response.ok) throw new Error("Something went wrong!");
  return response.json();
}

export default async function Page(){
    const headerRequest = await headers();
    const user = JSON.parse(headerRequest.get('user'));
    const books = await fetchBooks();

    return (
        <main className="max-w-2xl mx-auto px-6 py-10">

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Manage Books</h1>
                    <p className="text-sm text-gray-500 mt-1">Logged in as {user.email}</p>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                {books.map((book) => (
                    <div
                        key={book.id}
                        className="flex items-center justify-between border border-gray-200 rounded-xl px-5 py-4 hover:shadow-sm transition-shadow"
                    >
                        <div>
                            <span className="text-xs text-gray-400 mr-2">#{book.id}</span>
                            <span className="text-gray-800 font-medium">{book.name}</span>
                        </div>
                        <Link href={`/manage/book/${book.id}`}>
                            <button className="cursor-pointer bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-lg px-3 py-1.5 transition-colors">
                                Edit
                            </button>
                        </Link>
                    </div>
                ))}
            </div>

        </main>
    )
}