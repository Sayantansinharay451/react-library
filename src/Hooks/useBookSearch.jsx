import { useEffect, useState } from "react";

export default function useBookSearch(query, pageNumber) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [books, setBooks] = useState([]);
	const [hasMore, setHasMore] = useState(false);

	useEffect(() => {
		setBooks([]);
	}, [query]);

	useEffect(() => {
		let controller = new AbortController();
		setLoading(true);
		setError(false);
		const fetchData = async () => {
			try {
				const respond = await fetch(
					"http://openlibrary.org/search.json?" +
						new URLSearchParams({ q: query, page: pageNumber }),
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
					console.error("fetching aborted");
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
	}, [query, pageNumber]);

	return {
		loading: loading,
		error: error,
		books: books,
		hasMore: hasMore,
	};
}
