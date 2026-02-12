import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchProductsAPI,
  fetchProductByIdAPI,
  fetchMaxPriceAPI,
  
} from "../api/products";

/* =====================================
   FETCH PRODUCT LIST
===================================== */
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      
      const res = await fetchProductsAPI({
        page: state.products.page,
        limit: state.products.limit,
        search: state.products.search,
        menu_id: state.products.menu,
        priceRange: state.products.priceRange,
        sort: state.products.sort,
        is_featured: state.products.is_featured,
        is_top: state.products.is_top,
        is_new: state.products.is_new,
        category_id: state.products.category 
        
      });

      return res;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch products"
      );
    }
  }
);

export const fetchTopProducts = createAsyncThunk(
  "products/fetchTopProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchProductsAPI({ is_top: 1});
      // console.log("Top Products API:", res);
      return res.data || []; 
    } catch (err) {
      return rejectWithValue("Failed to fetch top products");
    }
  }
);



export const fetchFeaturedProducts = createAsyncThunk(
  "products/fetchFeaturedProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchProductsAPI({ is_featured: 1});
      // console.log("Featured Products API:", res);
      return res.data || []; 
    } catch (err) {
      return rejectWithValue("Failed to fetch featured products");
    }
  }
);

export const fetchNewProducts = createAsyncThunk(
  "products/fetchNewProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchProductsAPI({ is_new: 1, limit: 8 });
      // console.log("New Products API:", res);
      return res.data || []; 
    } catch (err) {
      return rejectWithValue("Failed to fetch new products");
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (slug, { rejectWithValue }) => {
    try {
      const res = await fetchProductByIdAPI(slug);
      // console.log("Product Detail API:", res);
      return res.data ?? res;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to fetch product"
      );
    }
  }
);

export const fetchRelatedProducts = createAsyncThunk(
  "products/fetchRelatedProducts",
  async (category_id, { rejectWithValue }) => {
    try {
      const res = await fetchProductsAPI({
        category_id: category_id,
        limit: 8,   // max 8 related
      });

      return res.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch related products"
      );
    }
  }
);


const productSlice = createSlice({
  name: "products",

  initialState: {
    // listing page
    items: [],
    total: 0,
  
    // homepage
    topItems: [],
    featuredItems: [],
    newItems: [],
  
    product: null,
    productDetails: null,
    loading: false,
    error: null,
  
    // filters
    search: "",
    menu: "",
    category: "",
    priceRange: 0,
    maxPrice: 0,
    sort: "",
    is_featured: "",
    is_top: "",
    is_new: "",

    relatedItems: [],
  
    page: 1,
    limit: 12,
  },
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setMenu(state, action) {
      state.menu = action.payload;
    },
    setCategory(state, action) {   
      state.category = action.payload;
    },
    setPriceRange(state, action) {
      state.priceRange = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setFeatured(state, action) {
      state.is_featured = action.payload;
    },
    setNew(state, action) {
      state.is_new = action.payload;
    },
    setTop(state, action) {
      state.is_top = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setLimit(state, action) {
      state.limit = action.payload;
    },
    clearProductDetails: (state) => {
      state.productDetails = null;
    },
  },  
  extraReducers: (builder) => {
    builder
      /* =========================
         PRODUCT LISTING PAGE
      ========================= */
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data || [];
        state.total = action.payload.count || 0;
        // console.log("FETCH PRODUCTS PAYLOAD:", action.payload);

        if (action.payload.max_price) {
          state.maxPrice = action.payload.max_price;
      
          // first load pe slider ko full range do
          if (state.priceRange === 0) {
            state.priceRange = action.payload.max_price;
          }
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  
      /* =========================
         TOP PRODUCTS (HOME)
      ========================= */
      .addCase(fetchTopProducts.fulfilled, (state, action) => {
        state.topItems = action.payload; 
      })
      
  
      /* =========================
         FEATURED PRODUCTS (HOME)
      ========================= */
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.featuredItems = action.payload; 
      })

      /* =========================
         NEW PRODUCTS (HOME)
      ========================= */
      .addCase(fetchNewProducts.fulfilled, (state, action) => {
        state.newItems = action.payload; 
      })


      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchRelatedProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedItems = action.payload;
      })
      .addCase(fetchRelatedProducts.rejected, (state) => {
        state.loading = false;
      })
  },
  
});
export const {
  setSearch,
  setMenu,
  setCategory,
  setPriceRange,
  setSort,
  setFeatured,
  setNew,
  setTop,
  setPage,
  setLimit,
  clearProductDetails,
} = productSlice.actions;

export default productSlice.reducer;


