"use client";

import Link from "next/link";
import Navbar from "@/components/homepage/Navbar";
import Hero from "@/components/homepage/Hero";
import Stat from "@/components/homepage/Stat";
import Features from "@/components/homepage/Features";
import Working from "@/components/homepage/Working";
import Testimonials from "@/components/homepage/Testimonials";
import CTA from "@/components/homepage/CTA";
import Footer from "@/components/homepage/Footer";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function LandingPage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      gestureOrientation: "vertical",
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number): void {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        target?.tagName === "A" &&
        (target as HTMLAnchorElement).getAttribute("href")?.startsWith("#")
      ) {
        event.preventDefault();
        const sectionId: string | null = (
          target as HTMLAnchorElement
        ).getAttribute("href");
        const section: HTMLElement | null = document.querySelector(
          sectionId as string
        );
        if (section) {
          lenis.scrollTo(section, { offset: -10 });
        }
      }
    };

    document.addEventListener("click", handleLinkClick);

    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Stat />
        <Features />
        <Working />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
