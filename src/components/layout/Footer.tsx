import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div className="">
          <img src={assets.logo} alt="" className="mb-5 w-32" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Accusantium sint, quis aut ab nisi repudiandae ratione autem sed
            nemo sapiente! At in accusantium beatae tempora sunt magnam placeat
            perspiciatis ab!
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
<li>+1-212-80932</li>

<li>example@gmail.com</li>

          </ul>
        </div>
      </div>
      <div>
        <hr />
       <p className="py-5 text-sm text-center">
  Copyright {new Date().getFullYear()} @TrendsVault -All Right Reserved.
</p>

      </div>
    </div>
  );
};

export default Footer;
