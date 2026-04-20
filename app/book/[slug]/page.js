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
        <div>
            ID: {slug}
            <div key={book.id}>
                <div>Name: {book.name}</div>
                <div>Author: {book.Author}</div>
                <div>Short Content: {book.shortContent}</div>
            </div>
        </div>
    )
}