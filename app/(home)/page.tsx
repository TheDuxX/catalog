import ResponsiveCarousel from "./_component/responsive_carossel";
import SearchBar from "../_components/search";
import MostViews from "./_component/most-views";
import RecentProducts from "./_component/recent-products";

const Home = async () => {
  return (
    <main className="flex flex-col gap-2 justify-center items-center py-2">
      <div className="w-full px-2 lg:max-w-[1150px]">
        <ResponsiveCarousel />
      </div>
      <div className="w-full md:max-w-[1150px] px-2">
        <SearchBar />
      </div>
      <div className="relative w-full max-w-[1150px] ">
        <MostViews />
      </div>
      <div className="relative w-full max-w-[1150px]">
        <RecentProducts />
      </div>
    </main>
  );
};

export default Home;
