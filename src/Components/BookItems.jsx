import React, { useCallback, useContext, useRef } from "react";
import BookContext from "../context-data";
import placeholderImage from "../assets/download.png";

const BookItems = ({ data, index }) => {
	const Context = useContext(BookContext);
	const { title, author, cover } = data;
	const Observer = useRef();
	const lastBookRef = useCallback(
		(node) => {
			if (Context.loading) return;
			if (Observer.current) Observer.current.disconnect();
			Observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && Context.hasMore) {
					Context.nextPage();
					Observer.current.disconnect();
				}
			});
			if (node) {
				Observer.current.observe(node);
			}
		},
		[Context]
	);
	return (
		<div
			className="row-span-auto flex flex-col items-center justify-center bg-neutral-100 p-5 rounded-lg drop-shadow-xl"
			{...(index + 1 === Context.books.length &&
				!Context.error && { ref: lastBookRef })}
		>
			{cover ? (
				<img src={cover} alt={title} />
			) : (
				<img src={placeholderImage} alt={title} />
			)}
			<h1 className="text-2xl font-bold text-center text-neutral-900">
				{title}
			</h1>
			<h2 className="text-xl font-light italic text-center text-neutral-900">
				{author}
			</h2>
		</div>
	);
};

export default BookItems;
