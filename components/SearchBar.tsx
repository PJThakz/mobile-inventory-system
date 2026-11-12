import { Search, X } from "lucide-react";

type SearchBarProps = {
  search: string;
  setSearch: (value: string) => void;
};

export default function SearchBar({ search, setSearch }: SearchBarProps) {
  return (
    <div className="relative min-w-0 flex-1 lg:max-w-2xl">
      <Search
        className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-500"
        aria-hidden="true"
      />

      {/* text-base (16px) stops iPhones from zooming in when the box is tapped */}
      <input
        type="search"
        inputMode="search"
        enterKeyHint="search"
        autoComplete="off"
        aria-label="Search products"
        placeholder="Search products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`h-12 w-full rounded-2xl border border-gray-300 bg-white pl-12 ${
          search ? "pr-11" : "pr-4"
        } text-base text-gray-900 shadow-sm transition placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 [&::-webkit-search-cancel-button]:appearance-none`}
      />

      {search && (
        <button
          type="button"
          onClick={() => setSearch("")}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
