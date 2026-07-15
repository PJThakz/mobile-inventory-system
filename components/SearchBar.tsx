type SearchBarProps = {
  search: string;
  setSearch: (value: string) => void;
};

export default function SearchBar({
  search,
  setSearch,
}: SearchBarProps) {
  return (
    <div className="flex justify-center mb-8">

      <input
        type="text"
        placeholder="🔍 Search model, storage, color..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-2xl rounded-lg border border-gray-300 px-5 py-3 shadow-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>
  );
}