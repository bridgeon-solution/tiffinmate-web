// import { BrowseMenu } from "../Components/BrowseMenu";
import { Footer } from "../common/FooterComponent";
import { HomeHero } from "../Components/HomeComponent";
import Navbar from "../common/Navbar";
import SubscribeSection from "../Components/SubscribeSection";

const Home = () => {
  return (
    <>
      <Navbar />
      <HomeHero />
      {/* <BrowseMenu/> */}
      <SubscribeSection/>
      <Footer/>
    </>
  );
};
export default Home;
