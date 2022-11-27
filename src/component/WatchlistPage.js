import { useContext } from "react";
import { Context } from "../Context";
import { Link } from "react-router-dom";

export default function WatchlistPage() {
  const { watchlist, removeFromWatchlist, isReadMore, toggleReadMore } =
    useContext(Context);

  return (
    <div className="container">
      <div className="header">
        <h1>My Watchlist</h1>
        <Link className="header-link" to="/movie">
          Search for movies...
        </Link>
      </div>
      <div className="watchlist">
        {watchlist.length === 0 ? (
          <div className="no-search">
            <p className="no-watchlist-data">
              Your watchlist is looking a little empty...
            </p>
            <Link className="watchlist-link" to="/movie">
              {<i className="fa-solid fa-plus"></i>} Let’s add some movies!
            </Link>
          </div>
        ) : (
          watchlist.map((data) => {
            return (
              <div
                key={data.imdbID}
                id={data.imdbID}
                className="movie-container"
              >
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
                        type="button"
                        onClick={() => removeFromWatchlist(data.imdbID)}
                        id={data.imdbID}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <label id={data.imdbID}>Watchlist</label>
                    </div>
                  </div>
                  <p className="movie-plot movie-plot-500">
                    {isReadMore ? data.Plot.slice(0, 500) : data.Plot}
                    <span
                      id={data.imdbID}
                      onClick={toggleReadMore()}
                      className="read-or-hide"
                    >
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
          })
        )}
      </div>
    </div>
  );
}
