import Title from "../components/elements/Title";

const Placeorder = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80h] border-t">
      {/* left side  */}
      <div className="flex flex-col gap-4  w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>
        <div className="flex gap-3">
          <input type="text" placeholder="First name" className="border border-gray-100 rounded py-1.5 px-3.5 w-full" />
          <input type="text" placeholder="Last name" className="border border-gray-100 rounded py-1.5 px-3.5 w-full" />

        </div>
          <input type="text" placeholder="E-mail address" className="border border-gray-100 rounded py-1.5 px-3.5 w-full" />

      </div>
    </div>
  );
};

export default Placeorder;
