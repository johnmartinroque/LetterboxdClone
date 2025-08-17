import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { searchFilms } from "../../actions/filmActions";
import { useNavigate } from "react-router-dom";

function SearchFilm() {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate("");
  const dropdownRef = useRef(null);

  const dispatch = useDispatch();
  const { films, loading, error } = useSelector((state) => state.searchFilms);

  // Debounce search
  useEffect(() => {
    if (query.trim() === "") {
      setShowDropdown(false);
      return;
    }
    const timeoutId = setTimeout(() => {
      dispatch(searchFilms(query));
      setShowDropdown(true);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [query, dispatch]);

  // Hide dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ position: "relative", maxWidth: "400px" }} ref={dropdownRef}>
      <Form>
        <Form.Group className="mb-3" style={{ position: "relative" }}>
          <Form.Label>FIND A FILM</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search for a movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query && setShowDropdown(true)}
            style={{ paddingRight: loading ? "2.5rem" : "0.75rem" }}
          />
          {loading && (
            <Spinner
              animation="border"
              size="sm"
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#999",
              }}
            />
          )}
        </Form.Group>
      </Form>

      {showDropdown && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            maxHeight: "250px",
            overflowY: "auto",
            zIndex: 1000,
            backgroundColor: "#556678",
          }}
        >
          {error && (
            <div style={{ padding: "10px", color: "red" }}>{error}</div>
          )}
          {films && films.length > 0
            ? films.map((film) => (
                <div
                  key={film.id}
                  style={{
                    padding: "8px 12px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                  }}
                  onClick={() => {
                    setQuery(film.title);
                    setShowDropdown(false);
                    navigate(`/film/${film.id}`);
                  }}
                >
                  <strong style={{ color: "white" }}>{film.title}</strong>{" "}
                  <strong style={{ color: "white" }}>
                    {" "}
                    {film.release_date && `(${film.release_date.slice(0, 4)})`}
                  </strong>
                  <br />
                  <small style={{ color: "#dadadaff" }}>
                    Director: {film.director}
                  </small>
                </div>
              ))
            : !loading &&
              query && (
                <div style={{ padding: "10px", color: "#777" }}>
                  No results found
                </div>
              )}
        </div>
      )}
    </div>
  );
}

export default SearchFilm;
