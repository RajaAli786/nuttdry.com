import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import api from "./services/api";

/* ===============================
   Async Thunk
================================ */
export const fetchMenus = createAsyncThunk(
  "menus/fetchMenus",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/menus", {
        params: { t: Date.now() },
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Something went wrong"
      );
    }
  }
);

/* ===============================
   Initial State
================================ */
const initialState = {
  data: [],
  loading: false,
  error: null,
  lastUpdated: null,
};

/* ===============================
   Helper: Build Menu Tree
================================ */
const buildMenuTree = (menus = []) => {
  if (!Array.isArray(menus)) return [];

  const map = {};
  const roots = [];

  // Create map
  menus.forEach((item) => {
    map[item.id] = { ...item, submenus: [] };
  });

  // Build tree
  menus.forEach((item) => {
    if (item.parent_id === null) {
      roots.push(map[item.id]);
    } else if (map[item.parent_id]) {
      map[item.parent_id].submenus.push(map[item.id]);
    }
  });

  // Sort children
  roots.forEach((menu) => {
    if (menu.submenus.length) {
      menu.submenus.sort((a, b) => a.sort_order - b.sort_order);
    }
  });

  // Sort parents
  return roots.sort((a, b) => a.sort_order - b.sort_order);
};

/* ===============================
   Slice
================================ */
const menuSlice = createSlice({
  name: "menus",
  initialState,
  reducers: {
    forceRefresh: (state) => {
      state.lastUpdated = Date.now();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenus.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMenus.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.lastUpdated = Date.now();
      })
      .addCase(fetchMenus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/* ===============================
   Selectors (MEMOIZED ✅)
================================ */
export const selectMenusRaw = (state) => state.menu.data;


export const selectMenuTree = createSelector(
  [selectMenusRaw],
  (menus) => buildMenuTree(menus)
);

/* ===============================
   Exports
================================ */
export const { forceRefresh } = menuSlice.actions;
export default menuSlice.reducer;
