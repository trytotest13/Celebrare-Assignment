export default function SearchBar({ value, onChange, count, total }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative w-full sm:min-w-[220px] sm:flex-1">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          type="search"
          value={value}
          onChange={onChange}
          placeholder="Search by author name"
          aria-label="Search photos by author name"
          className="h-11 w-full rounded-full border border-line bg-white pl-11 pr-4 text-stone-900 placeholder:text-stone-500 focus:border-stone-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900/10"
        />
      </div>
      <p className="w-full text-sm text-stone-600 sm:w-auto" aria-live="polite">
        {count} of {total} photos
      </p>
    </div>
  );
}
