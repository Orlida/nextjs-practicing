import { headers } from "next/headers"
import Link from "next/link";

async function fetchBooks() {
  const api = 'https://69e4b317cfa9394db8da4c98.mockapi.io/api/books'
  const response = await fetch(api, { cache: 'no-store'})

  if(!response.ok){
    throw new Error("Something went wrong!");
  }
  const data = await response.json();
  return data;
}


export default async function Page(){
    const headerRequest = await headers();
    const user = JSON.parse(headerRequest.get('user'));

      const blogs = await fetchBooks();

    return (
        <div>
            Manage book
            <div>
                {user.email}
            </div>
            {blogs.map((book) => (
            <div className="flex items-center mb-2" key={book.id}>
                <div>{book.id}. {book.name}</div>
                <Link href={`/manage/book/${book.id}`}>
                <button
                className=" cursor-pointer bg-blue-400 text-sm rounded-lg text-white px-1 py-0.5 ml-5">
                Edit books
                </button>
                </Link>
            </div>
            ))
            }
        </div>
    )
}