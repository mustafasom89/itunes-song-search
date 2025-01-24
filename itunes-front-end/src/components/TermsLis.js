import React, { useState } from "react";
import SearchForm from "./SearchForm";
import "bootstrap/dist/css/bootstrap.min.css";
import myimg from "../icon.png";
import Term from "./Term";

const TermList = () => {
  const [favorites, setFavorites] = useState([]);
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleFavorite = (term) => {
    const isAlreadyFavorite = favorites.some((fav) => fav.trackId === term.trackId);
    if (isAlreadyFavorite) {
      // If already a favorite, remove it
      setFavorites(favorites.filter((fav) => fav.trackId !== term.trackId));
    } else {
      // If not a favorite, add it
      setFavorites([...favorites, term]);
    }
  };

  const fetchTerms = async (searchQuery) => {
    try {
      setLoading(true);
      // Simulate API call (replace with actual API call)
      // Set terms to an array of dummy terms for demonstration
      setTerms(searchQuery);
    } catch (error) {
      console.error("Error fetching terms:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchQuery) => {
    fetchTerms(searchQuery);
  };

  return (
    <div className="App">
      <div className="title">
        <h1>
          <img className="logo" src={myimg} alt="logo" />
          iTunes Song Search
        </h1>
      </div>
      <SearchForm onSearch={handleSearch} />
      {loading && <div>Loading...</div>}
      <div className="row">
        <div className="col-9">
          {!loading && (
            <div className="term-container">
              {terms.map(
                (term) =>
                  term.trackId && (
                    <div key={term.trackId} className="term-wrapper">
                      <Term
                        key={term.trackId}
                        term={term}
                        isFavorite={favorites.some((fav) => fav.trackId === term.trackId)}
                        toggleFavorite={toggleFavorite}
                      />
                    </div>
                  )
              )}
            </div>
          )}

        </div>
        <div className="col-3">
          <div className="favorites-container">
            <h2 className="favorites-title">
              {favorites && favorites.length > 0
                ? `Favorites (${favorites.length})`
                : "No favorites"}
            </h2>
            <ul>
              {favorites.map((term) => (
                <div key={term.trackId} className="favorite-term">
                  <img src={term.artworkUrl100} alt={term.trackName} />
                  <p>{term.trackName}</p>
                  <button onClick={() => toggleFavorite(term)}>
                    Remove
                  </button>
                  <hr />
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermList;
