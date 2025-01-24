//Term.js
import React from "react";

/**
 * Term component represents a single term in the list.
 * It displays the term's details and provides an option to add/remove it from favorites.
 * @param {Object} props - Props containing information about the term.
 * @param {number} props.term - The unique ID of the term.
 * @param {boolean} props.isFavorite - Indicates whether the term is currently a favorite.
 * @param {function} props.toggleFavorite - Function to toggle the favorite status of the term.
 * @returns {JSX.Element} JSX representing the Term component.
 */

const Term = ({
  term,
  isFavorite,
  toggleFavorite,
}) => {
  return (
    <div className="SongList">
      <div className="SongCard">
        {/* Display the artwork/image of the term */}
        <img src={term.artworkUrl100} className="card-img-top" alt={term.trackName} />
        {/* Display the unique ID of the term */}
        <h4>{term.trackId}</h4>
        {/* Display the name of the term */}
        <h2 className="card-title">{term.trackName}</h2>
        {/* Display the name of the artist */}
        <p>Author: {term.artistName}</p>
        {/* Link to view the term on iTunes */}
        <a
          href={term.trackViewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Visit on iTunes
        </a>
        {/* Button to toggle favorite status */}
        <button
          onClick={() => toggleFavorite(term)}
          className={`btn ${isFavorite ? "btn-danger" : "btn-secondary"} mt-2`}
        >
          {/* Button text changes based on favorite status */}
          {isFavorite ? "Remove from fav" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
};

export default Term;
