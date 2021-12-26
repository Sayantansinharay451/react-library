import React, { useContext, useEffect, useState } from "react";
import BookContext from "../context-data";
import useBookSearch from "../Hooks/useBookSearch";

const SearchBar = () => {
	const [query, setQuery] = useState("");
	const Context = useContext(BookContext);
	const { books, hasMore, loading, error } = useBookSearch(
		query,
		Context.pageNumber
	);
	useEffect(() => {
		Context.searchResult(books);
		Context.isLoading(loading);
		Context.hasMoreBooks(hasMore);
		Context.hasError(error);
	}, [books, loading, error, hasMore, Context]);
	return (
		<>
			<input
				type="text"
				value={query}
				placeholder="Search..."
				className={`m-10 w-9/12 text-2xl md:w-4/5 text-neutral-900 placeholder:text-neutral-600 font-semibold px-10 pb-3 md:text-3xl outline-none border-b-4 border-neutral-400 focus:border-neutral-900 ${
					query ? "border-neutral-900" : ""
				}`}
				onChange={(e) => {
					setQuery(e.target.value);
				}}
			/>
		</>
	);
};

export default SearchBar;
