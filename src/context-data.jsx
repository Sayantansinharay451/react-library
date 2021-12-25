import React, { useState } from "react";

const BookContext = React.createContext({
	books: [],
	pageNumber: 1,
	loading: false,
	error: false,
	hasMore: false,
	searchResult: () => {},
	nextPage: () => {},
	isLoading: () => {},
	hasMoreBooks: () => {},
	hasError: () => {},
});

export const BookProvider = ({ children }) => {
	const [books, setBooks] = useState([]);
	const [pageNumber, setPageNumber] = useState(1);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [hasMore, setHasMore] = useState(false);

	const searchResult = (books) => {
		setBooks(books);
	};

	const nextPage = () => {
		setPageNumber(pageNumber + 1);
	};

	const isLoading = (loading) => {
		setLoading(loading);
	};

	const hasMoreBooks = (hasMore) => {
		setHasMore(hasMore);
	};

	const hasError = (error) => {
		setError(error);
	};

	return (
		<BookContext.Provider
			value={{
				books,
				pageNumber,
				loading,
				error,
				hasMore,
				searchResult,
				nextPage,
				isLoading,
				hasMoreBooks,
				hasError,
			}}
		>
			{children}
		</BookContext.Provider>
	);
};

export default BookContext;
