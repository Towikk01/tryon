import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { WhatsInside } from "@/components/sections/WhatsInside";
import { Trainer } from "@/components/sections/Trainer";
import { Program } from "@/components/sections/Program";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { Footer } from "@/components/Footer";

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
