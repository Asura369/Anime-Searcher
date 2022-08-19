import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Recommend from './components/Recommend';

function App() {
	const [animeList, SetAnimeList] = useState([]);
	const [topAnime, SetTopAnime] = useState([]);
	const [search, SetSearch] = useState("");
	const [recAnime, SetRecAnime] = useState([]);

	const GetTopAnime = async () => {
		const temp = await fetch(`https://api.jikan.moe/v3/top/anime/1/bypopularity`)
			.then(res => res.json());

		SetTopAnime(temp.top.slice(0, 5));
	}

	const GetRecAnime = async () => {
		const temp = await fetch(`https://api.jikan.moe/v3/top/anime/1/bypopularity`)
			.then(res => res.json());

		const rand = Math.floor(Math.random() * 50)

		SetRecAnime(temp.top.slice(rand, rand + 1));
	}

	const recToggler = () => {
		var name = recAnime[0]["title"]
		console.log(name)
		GetRecAnime()

		FetchAnime(name)

	};


	const HandleSearch = e => {
		e.preventDefault();

		FetchAnime(search);
	}

	const FetchAnime = async (query) => {
		const temp = await fetch(`https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc&limit=10`)
			.then(res => res.json());

		SetAnimeList(temp.results);
	}

	useEffect(() => {
		GetTopAnime();
		GetRecAnime();
	}, []);


	return (

		<div className="App">
			<Header />
			<div className="content-wrap">
				<Sidebar
					topAnime={topAnime} />
				<MainContent
					HandleSearch={HandleSearch}
					search={search}
					SetSearch={SetSearch}
					animeList={animeList} />
				<aside>
					<nav>
						<button onClick={() => recToggler()}>Recommend Anime</button>
					</nav>
				</aside >

			</div>
		</div>
	);
}

export default App;
