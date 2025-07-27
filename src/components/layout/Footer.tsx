import { assets } from "../../assets/assets";
import { companyLinks, contactInfo } from "./LayoutData";



const Footer = () => {
  return (
    <footer className="mt-40 text-sm text-gray-600">
      {/* Main Grid */}
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10">
        {/* Logo and Description */}
        <div>
          <img src={assets.logo} alt="Logo" className="mb-5 w-32" />
          <p className="w-full md:w-2/3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            sint, quis aut ab nisi repudiandae ratione autem sed nemo sapiente.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-xl font-medium mb-5">COMPANY</h3>
          <ul className="flex flex-col gap-1">
            {companyLinks.map((link, idx) => (
              <li key={idx} className="cursor-pointer hover:text-black transition">
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-medium mb-5">GET IN TOUCH</h3>
          <ul className="flex flex-col gap-1">
            {contactInfo.map((info, idx) => (
              <li key={idx}>{info}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Text */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          &copy; {new Date().getFullYear()} TrendsVault — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
