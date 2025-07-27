// components/product/ImageGallery.tsx
interface Props {
  images: string[];
  currentImage: string;
  onSelectImage: (img: string) => void;
}

const ProductImages= ({ images, currentImage, onSelectImage }: Props) => (
  <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row ">
    <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
      {images.map((item, index) => (
        <img
          onClick={() => onSelectImage(item)}
          src={item}
          key={index}
          className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
        />
      ))}
    </div>
    <div className="w-full sm:w-[80%]">
      <img className="w-full h-auto" src={currentImage} alt="Selected Product" />
    </div>
  </div>
);

export default ProductImages;
