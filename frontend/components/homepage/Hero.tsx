"use client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, Coins } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  });
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 z-0"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl opacity-50 z-0"></div>
      <div className="absolute top-20 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl z-0"></div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          <div
            className={`flex flex-col gap-6 transition-all duration-700 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <Badge className="w-fit bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              Next-Gen Crypto Analysis
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
              Discover the Next{" "}
              <span className="text-primary relative">
                Memecoin
                <span className="absolute bottom-1 left-0 w-full h-2 bg-primary/20 rounded-full"></span>
              </span>{" "}
              Before It Launches
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Our AI scans crypto celebrities' tweets, identifies trending words
              with memecoin potential, and notifies you in real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="w-full sm:w-auto group shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40"
                >
                  Get Started{" "}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto group"
                >
                  Learn More{" "}
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <Avatar
                    key={i}
                    className="border-2 border-background w-8 h-8"
                  >
                    <AvatarImage
                      src={`/placeholder.svg?height=32&width=32&text=${i}`}
                    />
                    <AvatarFallback>U{i}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">2,500+</span>{" "}
                crypto enthusiasts joined this week
              </p>
            </div>
          </div>
          <div
            className={`relative transition-all duration-700 delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="relative rounded-lg border bg-card p-2 shadow-xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="rounded-md bg-muted p-4 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Coins className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">Trending Keywords</span>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-primary/10 text-primary border-primary/20"
                  >
                    Live
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div className="h-2.5 w-3/5 rounded-lg bg-primary/20 animate-pulse"></div>
                  <div className="h-2.5 w-4/5 rounded-lg bg-primary/20 animate-pulse delay-75"></div>
                  <div className="h-2.5 w-2/5 rounded-lg bg-primary/20 animate-pulse delay-150"></div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  {[
                    { name: "PEPE", score: 98, change: "+12%" },
                    { name: "DOGE", score: 95, change: "+8%" },
                    { name: "FLOKI", score: 92, change: "+15%" },
                  ].map((coin, i) => (
                    <div
                      key={i}
                      className="h-24 rounded-lg bg-primary/10 p-3 flex flex-col justify-between hover:bg-primary/20 transition-colors cursor-pointer group/card"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{coin.name}</span>
                        <Badge
                          variant="outline"
                          className="px-1.5 py-0 text-xs bg-background/50"
                        >
                          {coin.score}%
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="h-1.5 w-full max-w-[80px] rounded-full bg-background/50 overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${coin.score}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-green-500 font-medium">
                          {coin.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
            <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
