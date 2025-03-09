"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import {
  ArrowRight,
  BarChart3,
  Bell,
  ChevronRight,
  Coins,
  ExternalLink,
  Globe,
  Search,
  Shield,
  Star,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

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
      if (target?.tagName === "A" && (target as HTMLAnchorElement).getAttribute("href")?.startsWith("#")) {
        event.preventDefault();
        const sectionId: string | null = (target as HTMLAnchorElement).getAttribute("href");
        const section: HTMLElement | null = document.querySelector(sectionId as string);
        if (section) {
          lenis.scrollTo(section, { offset: -10 });
        }
      }
    };

    document.addEventListener("click", handleLinkClick);
    window.addEventListener("scroll", handleScroll);
    
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleLinkClick);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <header
        className={`sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${
          scrollY > 50
            ? "border-b bg-background/95 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CryptoTrendAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="#stats"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Stats
            </Link>
          </nav>
          <div className="flex items-center gap-4">
          <ConnectButton />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
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
                  Our AI scans crypto celebrities' tweets, identifies trending
                  words with memecoin potential, and notifies you in real-time.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  <Link href="/signup">
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

        {/* Stats Section */}
        <section id="stats" className="py-12 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <div className="bg-background rounded-lg p-6 shadow-sm border flex flex-col items-center text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-primary">
                  2.5M+
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Tweets Analyzed
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 shadow-sm border flex flex-col items-center text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-primary">
                  85%
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Prediction Accuracy
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 shadow-sm border flex flex-col items-center text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-primary">
                  50K+
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Active Users
                </p>
              </div>
              <div className="bg-background rounded-lg p-6 shadow-sm border flex flex-col items-center text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-primary">
                  250+
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Crypto Celebrities
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 z-0"></div>
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl z-0"></div>
          <div className="container relative z-10 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                Features
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Everything You Need to Stay Ahead
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Our platform provides powerful tools to help you discover the
                next big memecoin opportunity.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12">
              {[
                {
                  icon: <Search className="h-6 w-6 text-primary" />,
                  title: "Celebrity Search",
                  description:
                    "Search for any crypto influencer and analyze their tweet history for potential memecoin keywords.",
                  link: "/dashboard",
                },
                {
                  icon: <BarChart3 className="h-6 w-6 text-primary" />,
                  title: "AI Analysis",
                  description:
                    "Our AI scans tweets, identifies trending words, and ranks them based on memecoin potential.",
                  link: "/dashboard",
                },
                {
                  icon: <Bell className="h-6 w-6 text-primary" />,
                  title: "Real-time Alerts",
                  description:
                    "Get instant notifications when a celebrity launches a memecoin containing your watchlisted keywords.",
                  link: "/wishlist",
                },
                {
                  icon: <Star className="h-6 w-6 text-primary" />,
                  title: "Personalized Wishlist",
                  description:
                    "Save and organize potential memecoin keywords to track their performance over time.",
                  link: "/wishlist",
                },
                {
                  icon: <Globe className="h-6 w-6 text-primary" />,
                  title: "Market Insights",
                  description:
                    "Access real-time market data and trends to make informed decisions about potential investments.",
                  link: "/dashboard",
                },
                {
                  icon: <Shield className="h-6 w-6 text-primary" />,
                  title: "Risk Assessment",
                  description:
                    "Our AI evaluates the risk level of potential memecoins based on historical data and market conditions.",
                  link: "/dashboard",
                },
              ].map((feature, i) => (
                <Card
                  key={i}
                  className="group hover:shadow-md transition-all duration-300 hover:border-primary/20"
                >
                  <CardHeader className="space-y-1">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                  <div className="px-6 pb-6">
                    <Link
                      href={feature.link}
                      className="text-sm text-primary font-medium hover:underline inline-flex items-center"
                    >
                      Learn more <ChevronRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                How It Works
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simple Process, Powerful Results
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Our platform makes it easy to track potential memecoin
                opportunities in just a few steps.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3 mt-12 relative">
              <div className="hidden md:block absolute top-24 left-[calc(16.67%-8px)] right-[calc(16.67%-8px)] h-1 bg-primary/20"></div>
              {[
                {
                  step: 1,
                  title: "Search Celebrities",
                  description:
                    "Find your favorite crypto influencers and explore their tweet history.",
                },
                {
                  step: 2,
                  title: "Add to Wishlist",
                  description:
                    "Save trending keywords with memecoin potential to your personal wishlist.",
                },
                {
                  step: 3,
                  title: "Get Notified",
                  description:
                    "Receive real-time alerts when your keywords appear in new memecoin launches.",
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center relative"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold shadow-lg shadow-primary/20 z-10 group hover:scale-110 transition-transform cursor-default">
                    {step.step}
                  </div>
                  <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 z-0"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl z-0"></div>
          <div className="container relative z-10 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                Testimonials
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                What Our Users Say
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Join thousands of crypto enthusiasts who are already using our
                platform to stay ahead of the curve.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Alex Thompson",
                  role: "Crypto Investor",
                  avatar: "/placeholder.svg?height=64&width=64&text=AT",
                  content:
                    "This platform helped me discover three promising memecoins before they went viral. The AI analysis is incredibly accurate!",
                },
                {
                  name: "Sarah Chen",
                  role: "Blockchain Developer",
                  avatar: "/placeholder.svg?height=64&width=64&text=SC",
                  content:
                    "As someone who works in blockchain, I'm impressed by the technical accuracy and real-time alerts. This is a game-changer for the crypto community.",
                },
                {
                  name: "Michael Rodriguez",
                  role: "Day Trader",
                  avatar: "/placeholder.svg?height=64&width=64&text=MR",
                  content:
                    "The wishlist feature is my favorite. I can track potential opportunities and get notified instantly when something big is happening.",
                },
              ].map((testimonial, i) => (
                <Card
                  key={i}
                  className="overflow-hidden group hover:shadow-md transition-all duration-300 hover:border-primary/20"
                >
                  <CardHeader className="pb-2 relative">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full -mr-10 -mt-10 group-hover:bg-primary/10 transition-colors"></div>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-primary/20">
                        <AvatarImage
                          src={testimonial.avatar}
                          alt={testimonial.name}
                        />
                        <AvatarFallback>
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">
                          {testimonial.name}
                        </CardTitle>
                        <CardDescription>{testimonial.role}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      "{testimonial.content}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] bg-repeat opacity-5"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

          <div className="container relative z-10 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-sm backdrop-blur-sm">
                Limited Time Offer
              </span>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Discover the Next Big Memecoin?
              </h2>
              <p className="max-w-[700px] md:text-xl/relaxed">
                Join thousands of crypto enthusiasts who are already using our
                platform to stay ahead of the curve.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link href="/signup">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full sm:w-auto group shadow-lg shadow-black/20"
                  >
                    Sign Up Now{" "}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="https://twitter.com/cryptotrendai" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto group shadow-lg shadow-black/20">
                    Follow Us <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-12 bg-muted/30">
        <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">CryptoTrendAI</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Discover the next big memecoin before it launches with our
              AI-powered crypto celebrity tweet analysis.
            </p>
            <div className="flex gap-4">
              {["twitter", "discord", "telegram", "github"].map((social) => (
                <Link
                  key={social}
                  href={`#${social}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center border">
                    <span className="sr-only">{social}</span>
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              {[
                "Features",
                "How It Works",
                "Pricing",
                "FAQ",
                "Testimonials",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              {["About Us", "Blog", "Careers", "Press", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              {["Terms", "Privacy", "Cookies", "Licenses", "Settings"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
        <div className="container mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 CryptoTrendAI. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Designed with <span className="text-primary">♥</span> for the
              crypto community
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
