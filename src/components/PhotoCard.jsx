function HeartIcon({ filled }) {
  return (
    <svg
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`h-5 w-5 ${filled ? "fill-rose-600 text-rose-600 heart-pop" : "fill-none text-stone-700"}`}
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export default function PhotoCard({ photo, isFavourite, onToggle }) {
  // request a crop that matches the photo's natural aspect (the list endpoint's
  // download_url is a 5000px original) and reserve the height up front from the
  // API's width/height so the wall never jumps while images stream in
  const width = 600;
  const height = Math.round((width * photo.height) / photo.width);

  return (
    <figure className="group">
      <div className="relative overflow-hidden rounded-md ring-1 ring-stone-900/5">
        <img
          src={`https://picsum.photos/id/${photo.id}/${width}/${height}`}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
          className="w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <button
          type="button"
          onClick={() => onToggle(photo.id)}
          aria-pressed={isFavourite}
          aria-label={isFavourite ? `Remove photo by ${photo.author} from favourites` : `Add photo by ${photo.author} to favourites`}
          className="absolute right-3 top-3 grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-white/90 shadow-sm ring-1 ring-stone-900/5 transition-transform duration-150 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600"
        >
          <HeartIcon filled={isFavourite} />
        </button>
      </div>
      <figcaption className="mt-2.5 flex items-baseline justify-between gap-3">
        <span className="text-sm text-stone-600">{photo.author}</span>
        <span className="shrink-0 font-display text-sm italic text-stone-600">
          No. {photo.id}
        </span>
      </figcaption>
    </figure>
  );
}
