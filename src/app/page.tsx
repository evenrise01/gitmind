import CallToAction from "@/components/CalltoAction";
import FeaturesSection from "@/components/Features";
import Footer from "@/components/Footer";
import { HowGitMindWorks } from "@/components/GitMindWorking";
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
