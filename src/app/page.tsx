import CallToAction from "@/components/CalltoAction";
import FeaturesSection from "@/components/Features";
import { HowGitMindWorks } from "@/components/FeatureWorking";
import Footer from "@/components/Footer";
import HeroSection from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Solutions from "@/components/Solutions";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Solutions/>
      <HowGitMindWorks/>
      <FeaturesSection />
      <Pricing/>
      <CallToAction/>
      <Footer/>
    </>
  );
}
