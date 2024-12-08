import { BrowseMenu } from "../Components/BrowseMenu";
import { Footer } from "../Components/FooterComponent";
import { HomeHero } from "../Components/HomeComponent";
import Navbar from "../Components/Navbar";
import SubscribeSection from "../Components/SubscribeSection";

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
