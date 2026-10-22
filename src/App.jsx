import { useCallback, useMemo, useState } from "react";
import useFetchPhotos from "./hooks/useFetchPhotos";
import useFavourites from "./hooks/useFavourites";
import SearchBar from "./components/SearchBar";
import PhotoCard from "./components/PhotoCard";

export default function App() {
  const { photos, loading, error, retry } = useFetchPhotos();
  const { favourites, toggleFavourite } = useFavourites();
  const [query, setQuery] = useState("");

  // stable across renders so SearchBar never re-renders because of a new handler
  const handleSearch = useCallback((event) => setQuery(event.target.value), []);

  // recomputed only when the fetched list or the query actually changes
  const filteredPhotos = useMemo(
    () =>
      photos.filter((photo) =>
        photo.author.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [photos, query]
  );

  const showGrid = !loading && !error && filteredPhotos.length > 0;

  return (
    <div className="min-h-screen bg-paper text-stone-900">
      <header className="border-b border-line">
        <div className="settle mx-auto max-w-6xl px-5 pb-8 pt-12 sm:px-8 sm:pt-16">
          <h1 className="font-display text-5xl italic leading-tight sm:text-6xl">
            Picsum Gallery
          </h1>
          <p className="mt-3 max-w-xl text-base text-stone-600">
            Thirty photographs from the Picsum archive. Tap the heart to keep the ones you like.
          </p>
        </div>
      </header>

      <div className="sticky top-0 z-10 border-b border-line bg-paper">
        <div
          className="settle mx-auto max-w-6xl px-5 py-3 sm:px-8"
          style={{ "--settle-delay": "90ms" }}
        >
          <SearchBar
            value={query}
            onChange={handleSearch}
            count={filteredPhotos.length}
            total={photos.length}
          />
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-5 pb-20 pt-8 sm:px-8">
        {loading && <Loading />}
        {error && <ErrorState message={error} onRetry={retry} />}
        {!loading && !error && filteredPhotos.length === 0 && <EmptySearch query={query} />}
        {showGrid && (
          <ul className="columns-1 gap-6 sm:columns-2 lg:columns-4">
            {filteredPhotos.map((photo, index) => (
              <li
                key={photo.id}
                className="settle mb-6 break-inside-avoid"
                style={{ "--settle-delay": `${160 + Math.min(index, 10) * 30}ms` }}
              >
                <PhotoCard
                  photo={photo}
                  isFavourite={favourites.includes(photo.id)}
                  onToggle={toggleFavourite}
                />
              </li>
            ))}
          </ul>
        )}
      </main>

      <footer className="border-t border-line py-8 text-center text-xs text-stone-600">
        Set in Fraunces. Photographs from picsum.photos.
      </footer>
    </div>
  );
}

function Loading() {
  return (
    <div className="settle mt-32 flex flex-col items-center gap-4" role="status">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-stone-200 border-t-stone-700" />
      <p className="font-display text-lg italic text-stone-600">Loading photographs…</p>
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="settle mt-32 flex flex-col items-center gap-3 text-center">
      <p className="font-display text-2xl italic">The photographs did not load.</p>
      <p className="text-sm text-stone-600">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-2 cursor-pointer rounded-full border border-stone-300 px-5 py-3 text-sm hover:border-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
      >
        Try again
      </button>
    </div>
  );
}

function EmptySearch({ query }) {
  return (
    <p className="mt-32 text-center font-display text-xl italic text-stone-600">
      No photographs by “{query.trim()}”. Try a different author name.
    </p>
  );
}
