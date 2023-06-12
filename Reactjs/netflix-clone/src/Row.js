import React, { useState, useEffect } from "react";
import axios from "./axios";

const apiKey = "d0be79066f7953e034b597588f0b70d3";

const base_url = "https://api.themoviedb.org/3/";

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  console.log(movies);

  return (
    <div>
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img src={`${base_url}${movie.poster_path}`} alt={movie.name}></img>
        ))}
      </div>
    </div>
  );
}

export default Row;
