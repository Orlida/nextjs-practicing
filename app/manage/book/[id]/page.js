'use client'
import { useState, useEffect } from 'react';

export default function Page({ params }){
    const [book, setBook] = useState({
        name: "",
        Author: "",
        shortContent: ""
    })

    const api = 'https://69e4b317cfa9394db8da4c98.mockapi.io/api/books'
    
    const getBook = async () => {
        try{
            const { id } = await params

            const response = await fetch(`${api}/${id}`)

            if(!response.ok){
                throw new Error("Something went wrong ", error);
            }
            const data = await response.json()
            setBook(data)   
        }catch(error){
            console.log("Something went error", error);
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        //const name = e.target.name
        //const value = e.target.value

        setBook((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleUpdate = async () => {
        try{
            const { id } = await params

            const response = await fetch(`${api}/${id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(book) 
            })

            if(!response.ok){
                throw new Error("Something went wrong ", error);
            }
            const data = await response.json()
            setBook(data)
            
            console.log("Updated Successfully")
            console.log(book)

        }catch(error){

            console.log("Something went error", error);

        }
    }

    useEffect(() => {
        getBook();
    },[])
    return (
        <div>
            ID: {book.id}
            <div key={book.id}>
                <div>Name: {book.name}</div>
                <div>Author: {book.Author}</div>
                <div>Short Content: {book.shortContent}</div>
            </div>

            <br />
            <form action={handleUpdate}>
                <label htmlFor="nameID">Name: </label>
                <input
                    className="border-1 rounded-md border-black"
                    type="text"
                    id="nameID"
                    name='name'
                    value={book.name}
                    onChange={handleChange} />
                
                <label htmlFor="author">Author: </label>
                <input
                    className="border-1 rounded-md border-black"
                    type="text"
                    id="authorID"
                    name='Author'
                    value={book.Author}
                    onChange={handleChange} />
                
                <label htmlFor="shortContentID">Content: </label>
                <input
                    className="border-1 rounded-md border-black"
                    type="text"
                    id="shortContentID"
                    name='shortContent'
                    value={book.shortContent}
                    onChange={handleChange} />
                <button
                    className="cursor-pointer hover:scale-110 transition-all duration-200 border-[#ddd] border-3 px-2 py-1 rounded-lg ml-5">
                    Update
                </button>
            </form>

        </div>
    )
}