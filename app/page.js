import { Suspense } from "react"
import Link from "next/link"

async function BookList() {
  const api = 'https://69e4b317cfa9394db8da4c98.mockapi.io/api/books';
  const response = await fetch(api, { cache: 'no-store' });
  const books = await response.json();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {books.map((book) => (
        <Link
          key={book.id}
          href={`/book/${book.id}`}
          className="block border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
        >
          <h2 className="text-lg font-semibold text-gray-800">{book.name}</h2>
          <p className="text-sm text-gray-500 mt-1">{book.Author}</p>
        </Link>
      ))}
    </div>
  )
}

function BookSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="border border-gray-200 rounded-xl p-5 animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-100 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  )
}

export default function Page() {  // ← ไม่ต้อง async แล้ว
  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-8">Hello Orlida</h1>
      <Suspense fallback={<BookSkeleton />}>
        <BookList />
      </Suspense>
    </main>
  )
}