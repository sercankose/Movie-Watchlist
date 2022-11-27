import { useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../Context";

export default function SearchPage() {
  const {
    movieData,
    searchMovie,
    addToWatchlist,
    changeSearch,
    watchlist,
    isReadMore,
    toggleReadMore,
  } = useContext(Context);

  const movieDataHtml = movieData.map((data) => {
    return (
      <div key={data.imdbID} className="movie-container">
        <img className="movie-poster" src={data.Poster} />
        <div className="movie-info">
          <div className="movie-head">
            <h1>{data.Title}</h1>
            <h3>⭐ {data.imdbRating}</h3>
          </div>
          <div className="movie-sub">
            <p>{data.Runtime}</p>
            <p>{data.Genre}</p>
            <div className="add-watchlist">
              <button
                className="watchlist-button"
                id={data.imdbID}
                onClick={(e) => addToWatchlist(e.currentTarget.id)}
              >
                {watchlist.includes(data) ? (
                  <i className="fa-solid fa-minus"></i>
                ) : (
                  <i className="fa-solid fa-plus"></i>
                )}
              </button>
              <label id={data.imdbID}>Watchlist</label>
            </div>
          </div>
          <p className="movie-plot">
            {isReadMore ? data.Plot.slice(0, 500) : data.Plot}
            <span onClick={toggleReadMore} className="read-or-hide">
              {isReadMore && data.Plot.length > 500
                ? "...read more"
                : !isReadMore && data.Plot.length > 500
                ? " show less"
                : ""}
            </span>
          </p>
        </div>
      </div>
    );
  });

  return (
    <div className="container">
      <div className="header">
        <h1>Find your film</h1>
        <Link className="header-link" to="/movie/watchlist">
          My Watchlist
        </Link>
      </div>
      <div className="search-tab">
        <input
          placeholder="Search for a movie"
          onChange={(e) => changeSearch(e)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              searchMovie(e);
            }
          }}
          type="search"
        />
        <button onClick={(e) => searchMovie(e)}>Search</button>
      </div>
      {movieDataHtml.length === 0 && (
        <div className="no-search">
          <i className="fa-solid fa-film fa-5x"></i>
          <p className="no-search-data">Start exploring</p>
        </div>
      )}
      {movieDataHtml}
    </div>
  );
}
