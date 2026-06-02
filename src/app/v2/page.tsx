import { Header } from "@/components/v2/Header";
import { Hero } from "@/components/v2/sections/Hero";
import { WhatsInside } from "@/components/v2/sections/WhatsInside";
import { Trainer } from "@/components/v2/sections/Trainer";
import { Program } from "@/components/v2/sections/Program";
import { Testimonials } from "@/components/v2/sections/Testimonials";
import { Pricing } from "@/components/v2/sections/Pricing";
import { Footer } from "@/components/v2/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhatsInside />
        <Trainer />
        <Program />
        <Testimonials />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
