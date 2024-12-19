import { ProviderDetailsComponentProps } from "../../Containers/ProviderDetailsContainer/type";
import { Feedback } from "./Feedback";
import { HeroSection } from "./HeroSection";
import { ReviewCard } from "./ReviewCard";

export const ProviderDetailsComponent = ({
  provider,
}: ProviderDetailsComponentProps) => {
  return (
    <>
      <HeroSection provider={provider} />
      <ReviewCard />
      <Feedback />
    </>
  );
};
