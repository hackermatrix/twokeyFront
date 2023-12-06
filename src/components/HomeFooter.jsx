import React from "react";
import Github from "../assets/github.svg";
import Discord from "../assets/discord.svg";
import Twitter from "../assets/twitter.svg";
import Linkedin from "../assets/linkedin.svg";
import Youtube from "../assets/youtube.svg";

const HomeFooter = () => {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="h-full bg-[#9F9CFF] px-20 py-16 border-t border-[#F7F7F821]">
      <div className="flex justify-between items-start">
        <div className="w-1/2">
          <h4 className="text-white text-lg font-semibold">TWOKEY</h4>
          <p className="text-sm text-[#5E5ADB] w-4/5 my-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            dictum aliquet accumsan porta lectus ridiculus in mattis. Netus
            sodales in volutpat ullamcorper amet adipiscing fermentum.
          </p>
          <span className="flex flex-row gap-3">
            <img src={Github} alt="" className="cursor-pointer" />
            <img src={Discord} alt="" className="cursor-pointer" />
            <img src={Twitter} alt="" className="cursor-pointer" />
            <img src={Linkedin} alt="" className="cursor-pointer" />
            <img src={Youtube} alt="" className="cursor-pointer" />
          </span>
        </div>
        <div className="flex justify-between items-start w-1/2 text-sm text-[#5E5ADB]">
          <span className="">
            <h5 className="text-white mb-8">Company</h5>
            <span className="flex flex-col leading-8">
              <a onClick={() => scrollTo("nav")}>Home</a>
              <a onClick={() => scrollTo("about")}>About</a>
              <a onClick={() => scrollTo("product")}>Product</a>
            </span>
          </span>
          <span>
            <h5 className="text-white mb-8">Company</h5>
            <span className="flex flex-col leading-8">
              <a onClick={() => scrollTo("email-us")}>Email Us</a>
              <a onClick={() => scrollTo("support")}>Support</a>
            </span>
          </span>
          <span>
            <h5 className="text-white mb-8">Company</h5>
            <span className="flex flex-col leading-8">
              <a onClick={() => scrollTo("pricing")}>Pricing</a>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomeFooter;
