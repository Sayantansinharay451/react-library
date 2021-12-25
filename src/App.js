import BooksContainer from "./Components/BooksContainer";
import SearchBar from "./Components/SearchBar";

function App() {
	return (
		<>
			<header className="text-3xl md:text-5xl font-black p-4">
				React Library
			</header>
			<div className="flex flex-col items-center w-full">
				<SearchBar />
				<BooksContainer />
			</div>
		</>
	);
}

export default App;
