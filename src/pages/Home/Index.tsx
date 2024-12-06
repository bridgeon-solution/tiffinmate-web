import { BrowseMenu } from "../../components/BrowseMenu/Index";
import { Footer } from "../../components/Footer/Index";
import { HomeHero } from "../../components/HomeHero/Index";
import Navbar from "../../components/Navbar";
import SubscribeSection from "../../components/SubscribeSection/Index";

export const Home = () => {
  return (
    <>
      <Navbar />
      <HomeHero />
      <BrowseMenu/>
      <SubscribeSection/>
      <Footer/>
    </>
  );
};
