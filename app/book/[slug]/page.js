async function fetchBook(id){
    const api = 'https://69e4b317cfa9394db8da4c98.mockapi.io/api/books'
    const response = await fetch(`${api}/${id}`)

    if(!response.ok){
        throw new Error("Something went wrong!")
    }
    const data = await response.json();
    return data
}

export default async function Page({ params }){
    const { slug } = await params;
    const book = await fetchBook(slug)
    return (
        <main className="max-w-2xl mx-auto px-6 py-10">

            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">

                <div className="text-xs text-gray-400 mb-4">Book ID: {slug}</div>

                <h1 className="text-2xl font-bold text-gray-900 mb-1">{book.name}</h1>
                <p className="text-sm text-gray-500 mb-6">by {book.Author}</p>

                <div className="border-t border-gray-100 pt-6">
                    <h2 className="text-sm font-semibold text-gray-700 mb-2">Description</h2>
                    <p className="text-gray-600 leading-relaxed">{book.shortContent}</p>
                </div>

            </div>

        </main>
    )
}