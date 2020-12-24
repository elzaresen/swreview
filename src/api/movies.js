export const getMoviesList = async () => {
	const response = await fetch('https://swapi.dev/api/films/');
	const data = await response.json();
	return data.results;
};

export const getMovie = async (url) => {
	const response = await fetch(url);
	return await response.json();
};

export const sendReview = () => {
	return new Promise((resolve) => {
		setTimeout(resolve, 1000)
	})
}