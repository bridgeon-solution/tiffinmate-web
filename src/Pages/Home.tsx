import { BrowseMenu } from "../Components/BrowseMenu/Index";
import { Footer } from "../Components/Footer/Index";
import { HomeHero } from "../Components/HomeHero/Index";
import Navbar from "../Components/Navbar";
import SubscribeSection from "../Components/SubscribeSection/Index";


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
