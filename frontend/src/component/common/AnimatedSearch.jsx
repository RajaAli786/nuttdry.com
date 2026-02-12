import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../config";

export default function AnimatedSearch() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

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
      <input
        type="text"
        className="search-input"
        placeholder="Search products..."
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
