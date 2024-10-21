import React, { useState, useCallback } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
    const [term, setTerm] = useState("");

    const search = useCallback(() => {
        console.log("Keresés indult a kifejezéssel: ", term); // Debug log
        onSearch(term);
        setTerm("");
    }, [onSearch, term]);

    const handleTermChange = useCallback((event) => {
        console.log("Input változott: ", event.target.value); // Debug log
        setTerm(event.target.value);
    }, []);

    const handleSearch = (e) => {
        if (e.key === "Enter" || e.key === "Go" || e.key === "Search") {
            console.log("Enter billentyű lenyomva"); // Debug log
            onSearch(term);
        }
    };

    return (
        <div className="search-bar">
            <input
                placeholder="Enter a song or artist name"
                style={{ textAlign: "center" }}
                onChange={handleTermChange}
                onKeyDown={handleSearch}
                id="search-term"
                value={term}
            />
            <button onClick={search}>Search</button>
        </div>
    );
};

export default SearchBar;
