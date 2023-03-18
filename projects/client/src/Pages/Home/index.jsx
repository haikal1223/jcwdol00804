import React from "react";
import Page from "../../Components/Page";
import BannerSection from "./Sections/BannerSection";
import CategorySection from "./Sections/CategorySection";
import FeaturedSection from "./Sections/FeaturedSection";

const Home = () => {
  return (
    <Page navTitle="Home">
      <div className="container">
        {/* Greeting */}
        <div className="flex flex-col text-normal text-center font-normal px-5 py-3">
          <div>Welcome to our page !</div>
        </div>
        {/* Searchbox */}
        {/* Fitur ini akan dipakai kalau ada waktu */}
        {/* <div className="flex flex-row justify-between px-8 pt-5">
            <div className="bg-gray-50 rounded flex items-center px-2 w-full">
                <button>
                    <BiSearch size={20} color="gray" />
                </button>
                <input className="bg-transparent text-sm p-1 w-full focus:outline-none"
                    type="text"
                    placeholder="Search keywords.." />
                <button>
                    <BiMenuAltRight size={35} color="green" />
                </button>
            </div>
        </div> */}
        {/* Banner */}
        <BannerSection />
        {/* Category */}
        <CategorySection />
        {/* Featured */}
        <FeaturedSection />
      </div>
    </Page>
  );
};

export default Home;
