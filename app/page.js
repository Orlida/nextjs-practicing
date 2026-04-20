async function fetchBooks() {
  const api = 'https://69e4b317cfa9394db8da4c98.mockapi.io/api/books'
  const response = await fetch(api, { cache: 'no-store'})

  if(!response.ok){
    throw new Error("Something went wrong!");
  }
  const data = await response.json();
  return data;
}

import Link from "next/link";
export default async function Page() {


  return (
    <>
      <span className=" font-semibold">
        Hello Orlida
      </span>

        
    </>
  );
}
