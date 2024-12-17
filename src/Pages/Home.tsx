import { Footer } from "../Common/FooterComponent";
import Navbar from "../Common/Navbar";
import { HomeHero } from "../Components/HomeComponent";
import SubscribeSection from "../Components/SubscribeSection";

const Home = () => {
  return (
    <>
      <Navbar />
      <HomeHero />
      <SubscribeSection/>
      <Footer/>
    </>
  );
};
export default Home;
