import FilterOption from "./FilterOption";

interface FilterSectionProps {
  title: string;
  options: string[];
  selected: string;
  setSelected: (value: string) => void;
}

export default function FilterSection({
  title,
  options,
  selected,
  setSelected,
}: FilterSectionProps) {
  return (
    <div className="mb-8">

      <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
        {title}
      </h3>

      <div className="flex flex-wrap gap-2">

        {options.map((option) => (
          <FilterOption
            key={option}
            label={option}
            selected={selected === option}
            onClick={() => setSelected(option)}
          />
        ))}

      </div>

    </div>
  );
}