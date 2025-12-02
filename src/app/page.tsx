import CTASection from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import HowThePlatformWorks from "@/components/sections/HowThePlatformWorks";
import WhatMakesUsDifferent from "@/components/sections/WhatMakesUsDifferent";

export default function Home() {
  return (
    <div>
      <Hero/>
      <HowThePlatformWorks/>
      <WhatMakesUsDifferent/>
      <CTASection/>
      <Footer/>
    </div>
  );
}
