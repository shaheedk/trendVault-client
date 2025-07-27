// components/product/SizeSelector.tsx
interface Props {
  sizes: string[];
  selected: string;
  onSelect: (size: string) => void;
}

const SizeSelector = ({ sizes, selected, onSelect }: Props) => (
  <div className="flex flex-col gap-4 my-8">
    <p>Select Size</p>
    <div className="flex gap-2">
      {sizes.map((item, index) => (
        <button
          onClick={() => onSelect(item)}
          className={`border py-2 px-4 bg-gray-100 ${
            item === selected ? "border-orange-500 border-b-2 border-r-2" : ""
          }`}
          key={index}
        >
          {item}
        </button>
      ))}
    </div>
  </div>
);

export default SizeSelector;
