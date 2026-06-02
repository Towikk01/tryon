import { Header } from "@/components/v3/Header";
import { Hero } from "@/components/v3/sections/Hero";
import { WhatsInside } from "@/components/v3/sections/WhatsInside";
import { Trainer } from "@/components/v3/sections/Trainer";
import { Program } from "@/components/v3/sections/Program";
import { Testimonials } from "@/components/v3/sections/Testimonials";
import { Pricing } from "@/components/v3/sections/Pricing";
import { Footer } from "@/components/v3/Footer";

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
