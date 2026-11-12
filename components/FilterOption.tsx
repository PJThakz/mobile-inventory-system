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
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`min-h-11 rounded-lg px-4 text-sm font-medium transition ${
        selected
          ? "bg-[#0b4ea2] text-white"
          : "bg-white text-slate-800 ring-1 ring-slate-300 hover:ring-slate-500"
      }`}
    >
      {label}
    </button>
  );
}
