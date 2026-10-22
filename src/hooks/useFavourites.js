import { useCallback, useEffect, useReducer } from "react";

const STORAGE_KEY = "picsum-gallery-favourites";

function readStoredFavourites() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

function favouritesReducer(state, action) {
  switch (action.type) {
    case "toggle":
      return state.includes(action.id)
        ? state.filter((id) => id !== action.id)
        : [...state, action.id];
    default:
      return state;
  }
}

export default function useFavourites() {
  const [favourites, dispatch] = useReducer(favouritesReducer, [], readStoredFavourites);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = useCallback((id) => dispatch({ type: "toggle", id }), []);

  return { favourites, toggleFavourite };
}
