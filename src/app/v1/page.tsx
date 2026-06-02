import { Header } from "@/components/v1/Header";
import { Hero } from "@/components/v1/sections/Hero";
import { WhatsInside } from "@/components/v1/sections/WhatsInside";
import { Trainer } from "@/components/v1/sections/Trainer";
import { Program } from "@/components/v1/sections/Program";
import { Testimonials } from "@/components/v1/sections/Testimonials";
import { Pricing } from "@/components/v1/sections/Pricing";
import { Footer } from "@/components/v1/Footer";

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
