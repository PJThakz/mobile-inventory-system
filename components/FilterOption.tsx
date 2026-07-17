interface FilterOptionProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export default function FilterOption({
  label,
  selected,
  onClick,
}: FilterOptionProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200
      ${
        selected
          ? "bg-blue-600 text-white shadow-md"
          : "border border-slate-300 bg-white text-slate-700 hover:border-blue-400 hover:bg-blue-50"
      }`}
    >
      {label}
    </button>
  );
}