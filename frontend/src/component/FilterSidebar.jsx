import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearch,
  setCategory,
  setPriceRange,
} from "../redux/productSlice";
import { fetchCategories } from "../redux/categorySlice";

const FilterSidebar = () => {
  const dispatch = useDispatch();
  const { search, category, priceRange, maxPrice } = useSelector(
    (state) => state.products
  );
  const { items: categories, loading } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

// console.log("maxPrice in FilterSidebar:", maxPrice);
  return (
    <div className="filter-sidebar p-3 border rounded">
      <Form.Group className="mb-3">
        <Form.Label>Search</Form.Label>
        <Form.Control
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Select
          value={category}
          onChange={(e) => dispatch(setCategory(e.target.value))}
        >
          <option value="">All</option>
          {loading && <option>Loading...</option>}
          {!loading &&
            categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Max Price: ₹{priceRange}</Form.Label>
        <Form.Range
          min={0}
          max={maxPrice || 0}
          value={priceRange}
          onChange={(e) => dispatch(setPriceRange(+e.target.value))}
          disabled={!maxPrice}
        />
      </Form.Group>
    </div>
  );
};

export default FilterSidebar;
