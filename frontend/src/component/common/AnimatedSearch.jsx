import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../config";

export default function AnimatedSearch() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const [placeholder, setPlaceholder] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // if (!suggestions.length || query) return;
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products?limit=10`);
        const json = await res.json();
  
        // sirf product names
        const names = (json.data || []).map((p) => p.name);
  
        setSuggestions(names);
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchSuggestions();
  }, []);

  useEffect(() => {
    if (!query) {
      setProducts([]);
      return;
    } 

    const timer = setTimeout(() => {
      fetchProducts(query);
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!suggestions.length || query) return;
  
    const currentWord = suggestions[wordIndex % suggestions.length];
    const speed = isDeleting ? 40 : 80;
  
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setPlaceholder(currentWord.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
  
        if (charIndex === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        setPlaceholder(currentWord.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
  
        if (charIndex === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => prev + 1);
        }
      }
    }, speed);
  
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, wordIndex, query, suggestions]);

  const fetchProducts = async (text) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/api/products?q=${text}&limit=6`
      );
      const json = await res.json();
      setProducts(json.data || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };


  return (
    <div className="search-wrapper">
      {!query && (
        <div className="custom-placeholder">
          <span className="search-word">Search</span>{" "}
          <span className="dynamic-word">{placeholder || "products"}...</span>
        </div>
      )}

      <input
        type="search"
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && (
        <div className="search-dropdown">
          {loading && <div className="search-item muted">Searching...</div>}

          {!loading && products.length ? (
            <ul className="search-list">
              {products.map((item) => (
                console.log(item.slug),
                <li key={item.id} className="search-list-item">
                <Link
                    to={`/product/${item.slug}`}
                    className="search-item"
                    onClick={() => setQuery("")}
                >
                    {item.name}
                </Link>
                </li>
              ))}
            </ul>
          ) : (
            !loading && (
              <div className="search-item muted">No products found</div>
            )
          )}
        </div>
      )}
    </div>
  );
}
