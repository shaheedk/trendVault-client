import { assets } from "../assets/assets"
import Title from "../components/common/title/Title"
import Newsletter from "../components/common/Newsletter"

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1="CONTACT" text2="US"/>
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img src={assets.contact_img} alt=""  className="w-full md:max-w-[480px]"/>
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">our Store</p>
          <p className="text-gray-500">080833 fsflkjfsda <br /> kochi, kerala,india </p>
          <p className="text-gray-500">Tel:(+91) 8904532053 <br />Emai:admin@gmail.com</p>
          <p  className="font-semibold text-xl text-gray-600">Careers at TrendsVault</p>
          <p  className="text-gray-500">Learn more about our team and job openings. </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">Explore Jobs</button>
        </div>
      </div>
      <Newsletter/>
    </div>
  )
}

export default Contact
