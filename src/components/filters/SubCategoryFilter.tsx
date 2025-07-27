interface Props {
  toggle: (val: string) => void;
}

const SubCategoryFilter = ({ toggle }: Props) => {
  const types = ["Topwear", "Bottomwear", "Winterwear"];

  return (
    <div className="border border-gray-300 pl-5 py-3 mt-6">
      <p className="mb-3 text-sm font-medium">TYPE</p>
      <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
        {types.map((type) => (
          <label key={type} className="flex gap-2">
            <input type="checkbox" value={type} onChange={() => toggle(type)} className="w-3" />
            {type}
          </label>
        ))}
      </div>
    </div>
  );
};

export default SubCategoryFilter;
