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
        className="
w-full
max-w-4xl
rounded-2xl
border
border-gray-300
bg-white
px-6
py-4
text-lg
text-gray-900
placeholder:text-gray-600
shadow-md
focus:outline-none
focus:ring-2
focus:ring-blue-500
transition
"
      />

    </div>
  );
}