interface Props {
  toggle: (val: string) => void;
}

const CategoryFilter = ({ toggle }: Props) => (
  <div className="border border-gray-300 pl-5 py-3 my-5">
    <p className="mb-3 text-sm font-medium">CATEGORIES</p>
    {["Men", "Women", "Kids"].map((cat) => (
      <label key={cat} className="flex gap-2 text-sm font-light text-gray-700">
        <input type="checkbox" value={cat} onChange={() => toggle(cat)} className="w-3" />
        {cat}
      </label>
    ))}
  </div>
);

export default CategoryFilter;
