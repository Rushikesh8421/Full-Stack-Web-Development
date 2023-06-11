const API_KEY = "d0be79066f7953e034b597588f0b70d3";

const requests = {
  fetchTrending: "/trending/all/week?api_key=${API_KEY}&language=en-US",
  fetchNetflixOriginals: "/discover/tv?api_key=${API_KEY}&with_networks=213",
  fetchTopRated: "/movies/top_rated?api_key=${API_KEY}&language=en-US",
  fetchActionMovies: "/discover/movies?api_key=${API_KEY}&with_generes=28",
  fetchComedyMovies: "/discover/movie?api_key=${API_KEY}&with_generes=35",
  fetchHorrorMovies: "/discover/movie?api_key=${API_KEY}&with_generes=27",
  fetchRomanceMovies: "/discover/movie?api_key=${API_KEY}&with_generes=10749",
  fetchDocumentaries: "/discover/movie?api_key=${API_KEY}&with_generes=99",
};

export default requests;
