import CallToAction from "@/components/CalltoAction";
import FeaturesSection from "@/components/Features";
import Footer from "@/components/Footer";
import HeroSection from "@/components/Hero";
import Pricing from "@/components/Pricing";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <Pricing/>
      <CallToAction/>
      <Footer/>
    </>
  );
}
