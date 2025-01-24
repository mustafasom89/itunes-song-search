//SearchForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import '../index.css';

const SearchForm = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [mediaType, setMediaType] = useState("all");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setHasToken(true);
    }
  }, []); // Run only on component mount

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      setToken(token);
      setHasToken(true);
      console.log("token:", token);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:5000/api?term=${searchTerm}&media=${mediaType}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(`searchTerm: ${searchTerm}`);
      console.log(`mediaType: ${mediaType}`);
      onSearch(response.data);
    } catch (error) {
      console.error("Error searching for songs:", error);
    }
  };

  return (
    <div className="SearchForm">
      {hasToken ? (
        <>       
          <form className="SearchForm__Form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for songs..."
              required
            />
            <select
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value)}
            >
              <option value="all">All</option>
              <option value="movie">Movie</option>
              <option value="podcast">Podcast</option>
              <option value="music">Music</option>
              <option value="software">Software</option>
              <option value="ebook">Ebook</option>
            </select>
            <button className="button" type="submit">
              Search
            </button>
          </form>
        </>
      ) : (
        <div className="login">
        <button onClick={() => handleLogin("user204", "usr204Pass@@")}>
          Start Service
        </button>
        </div>
      )}
    </div>
  );
};

export default SearchForm;
