import { useContext, useEffect, useState } from "react";
import BookContext from "../context-data";

export default function useBookSearch(query) {
	const Context = useContext(BookContext);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [books, setBooks] = useState([]);
	const [hasMore, setHasMore] = useState(false);

	const generateString = (length) => {
		let str = "";
		for (let i = 0; i < length; i++) {
			str += String.fromCharCode(Math.floor(Math.random() * 26) + 65);
		}
		return str;
	};

	useEffect(() => {
		setBooks([]);
		Context.setPage(1);
	}, [query]);

	useEffect(() => {
		let controller = new AbortController();

		setLoading(true);
		setError(false);
		const fetchData = async () => {
			try {
				const respond = await fetch(
					"https://openlibrary.org/search.json?" +
						new URLSearchParams({
							q: query.length !== 0 ? query : generateString(3),
							page: Context.pageNumber,
						}),
					{
						method: "GET",
						signal: controller.signal,
					}
				);
				if (!respond.ok) {
					throw new Error();
				}
				const data = await respond.json();
				setBooks((prevBooks) => [
					...prevBooks,
					...data.docs.map((book) => {
						return {
							title: book.title,
							author: book.author_name,
							cover: book.cover_i
								? `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
								: "",
						};
					}),
				]);
				setHasMore(data.docs.length > 0);
				setLoading(false);
			} catch (error) {
				if (error.name === "AbortError") {
					return;
				}
				setError(true);
				setLoading(false);
				return;
			}
		};
		fetchData();
		return () => {
			controller.abort();
		};
	}, [query, Context.pageNumber]);

	return {
		books: books,
		hasMore: hasMore,
		loading: loading,
		error: error,
	};
}
