import { HomeHero } from "../Components/HomeComponent";
import SubscribeSection from "../Components/SubscribeSection";
import TopProvidersContainer from "../Containers/TopRatedProviders";

const Home = () => {
  return (
    <>
      <HomeHero />
      <TopProvidersContainer/>
      <SubscribeSection />
    </>
  );
};
export default Home;
