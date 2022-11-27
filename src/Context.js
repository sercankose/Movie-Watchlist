import React, { useState } from "react";

const Context = React.createContext();

function ContextProvider({ children }) {
  const [movieData, setMovieData] = useState([]);
  const [search, setSearch] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  function changeSearch(e) {
    setSearch(e.target.value);
  }

  async function searchMovie() {
    const dataArray = [];
    const omdbData = await fetchMovieData();
    for (const item of omdbData.Search) {
      const imdbData = await fetchDetailedMovieData(item.imdbID);
      dataArray.push(imdbData);
    }
    setMovieData(dataArray);
  }

  async function fetchMovieData() {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${search}&apikey=c01376c1`
    );
    return await response.json();
  }

  async function fetchDetailedMovieData(id) {
    const res = await fetch(
      `https://www.omdbapi.com/?i=${id}&plot=full&apikey=c01376c1`
    );
    return await res.json();
  }

  function addToWatchlist(id) {
    isMovieInWatchlist(id)
      ? removeFromWatchlist(id)
      : setWatchlist((prevItems) => [...prevItems, getMovieDataById(id)]);
  }

  function isMovieInWatchlist(id) {
    return getMovieFromWatchlistById(id).length !== 0;
  }

  function getMovieFromWatchlistById(id) {
    return watchlist.filter((item) => item.imdbID === id);
  }

  function getMovieDataById(id) {
    return movieData.filter((item) => item.imdbID === id)[0];
  }

  function removeFromWatchlist(id) {
    const updatedList = watchlist.filter((item) => item.imdbID !== id);
    setWatchlist(updatedList);
  }

  return (
    <Context.Provider
      value={{
        movieData,
        searchMovie,
        addToWatchlist,
        removeFromWatchlist,
        watchlist,
        changeSearch,
        isReadMore,
        toggleReadMore,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
