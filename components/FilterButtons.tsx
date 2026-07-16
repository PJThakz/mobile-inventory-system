type FilterButtonsProps = {
  title: string;
  options: string[];
  selected: string;
  setSelected: (value: string) => void;
};

export default function FilterButtons({
  title,
  options,
  selected,
  setSelected,
}: FilterButtonsProps) {
  return (
    <div className="mb-8">

      <h3 className="text-center text-lg font-bold text-gray-800 underline underline-offset-4 mb-4">
  {title}
</h3>

      <div className="flex flex-wrap justify-center gap-3">

        {options.map((option) => (

          <button
            key={option}
            onClick={() => setSelected(option)}
            className={`px-5 py-2 rounded-full transition-all duration-200

            ${
              selected === option
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
            }`}
          >
            {option}
          </button>

        ))}

      </div>

    </div>
  );
}