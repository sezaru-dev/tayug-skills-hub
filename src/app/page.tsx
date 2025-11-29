import SearchBar from "@/components/custom/SearchBar";
import CTASection from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import HowThePlatformWorks from "@/components/sections/HowThePlatformWorks";

export default function Home() {
  return (
    <div>
      <Hero/>
      <HowThePlatformWorks/>
      <CTASection/>
      <Footer/>
    </div>
  );
}
