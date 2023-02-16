import React, { useState } from "react";
import "./Home.page.css";

const Home = () => {
  const searchIconLink =
    "https://assets.stickpng.com/images/585e4ae1cb11b227491c3393.png";
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    // fetch API
  };

  return (
    <div className="home">
      <div className="search">
        <input
          type="text"
          className="search-input"
          onChange={handleChange}
          value={input}
        />
        <button type="submit" className="search-btn" onClick={handleSubmit}>
          <img
            className="search-btn-icon"
            src={searchIconLink}
            alt="search-icon"
          />
        </button>
      </div>
    </div>
  );
};

export default Home;
