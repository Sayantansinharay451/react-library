import React, { useContext } from "react";
import BookContext from "../context-data";
import BookItems from "./BookItems";
import Message from "./Message";

const BooksContainer = () => {
	const Context = useContext(BookContext);
	return (
		<>
			<div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-4 gap-6 m-10">
				{Context.books.map((book, index) => {
					return <BookItems key={index} index={index} data={book}></BookItems>;
				})}
			</div>
			<Message
				message={
					Context.loading
						? "Loading..."
						: Context.error
						? "Something went wrong"
						: Context.hasMore
						? ""
						: Context.pageNumber === 1
						? "No books found"
						: "No more books"
				}
			/>
		</>
	);
};

export default BooksContainer;
