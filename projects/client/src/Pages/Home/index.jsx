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
        {/* Banner */}
        <BannerSection />
        {/* Categories */}
        <CategorySection />
        {/* Featured */}
        <FeaturedSection />
      </div>
    </Page>
  );
};

export default Home;
