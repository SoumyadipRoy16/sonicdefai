"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Bell,
  ChevronDown,
  Filter,
  Search,
  Settings,
  Star,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWishlist } from "@/components/wishlist-provider";
import { useToast } from "@/hooks/use-toast";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function DashboardPage() {
  const { addItem, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("Last 7 Days");

  // Mock data for trending keywords
  const trendingKeywords = [
    { word: "PEPE", score: 98, mentions: 1243, celebrity: "Elon Musk" },
    { word: "DOGE", score: 95, mentions: 987, celebrity: "CZ Binance" },
    { word: "FLOKI", score: 92, mentions: 756, celebrity: "Justin Sun" },
    { word: "SHIB", score: 89, mentions: 654, celebrity: "Vitalik Buterin" },
    { word: "MOON", score: 87, mentions: 543, celebrity: "SBF" },
    { word: "ROCKET", score: 85, mentions: 432, celebrity: "Elon Musk" },
  ];

  const highPotentialKeywords = trendingKeywords.filter(
    (item) => item.score > 90
  );

  const filteredKeywords = trendingKeywords.filter(
    (item) =>
      item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.celebrity.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToWishlist = (item: any) => {
    if (isInWishlist(item.word)) {
      toast({
        title: "Already in wishlist",
        description: `"${item.word}" is already in your wishlist.`,
        variant: "destructive",
      });
      return;
    }

    addItem({
      word: item.word,
      score: item.score,
      mentions: item.mentions,
      celebrity: item.celebrity,
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <Link href="/" className="text-xl font-bold">
              CryptoTrendAI
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search celebrities..."
                className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="relative ml-2">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                3
              </span>
            </Button>
            <div className="flex items-center gap-4">
              <ConnectButton />
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-[250px] flex-col border-r bg-muted/40 md:flex">
          <div className="flex h-14 items-center border-b px-4">
            <h2 className="text-lg font-semibold">Dashboard</h2>
          </div>
          <nav className="flex-1 overflow-auto py-4">
            <div className="px-4 py-2">
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                Menu
              </h3>
              <div className="space-y-1">
                <Button variant="secondary" className="w-full justify-start">
                  <Zap className="mr-2 h-4 w-4" />
                  Trending
                </Button>
                <Link href="/wishlist">
                  <Button variant="ghost" className="w-full justify-start">
                    <Star className="mr-2 h-4 w-4" />
                    Wishlist
                  </Button>
                </Link>
                <Button variant="ghost" className="w-full justify-start">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </div>
            </div>
            <div className="px-4 py-2">
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                Top Celebrities
              </h3>
              <div className="space-y-2">
                {[
                  "Elon Musk",
                  "Vitalik Buterin",
                  "CZ Binance",
                  "SBF",
                  "Justin Sun",
                ].map((name, i) => (
                  <Link
                    href={`/celebrity/${name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    key={i}
                  >
                    <div className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={`/placeholder.svg?height=24&width=24&text=${name[0]}`}
                          alt={name}
                        />
                        <AvatarFallback>{name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </aside>
        <main className="flex-1 overflow-auto">
          <div className="container py-6">
            <div className="mb-8 flex items-center justify-between">
              <h1 className="text-3xl font-bold">Trending Keywords</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      {timeFilter}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTimeFilter("Today")}>
                      Today
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setTimeFilter("Last 7 Days")}
                    >
                      Last 7 Days
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setTimeFilter("Last 30 Days")}
                    >
                      Last 30 Days
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTimeFilter("All Time")}>
                      All Time
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <Tabs defaultValue="all">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="high-potential">High Potential</TabsTrigger>
                <TabsTrigger value="recently-added">Recently Added</TabsTrigger>
                <TabsTrigger value="watchlist">My Watchlist</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredKeywords.map((item, i) => (
                    <Card
                      key={i}
                      className="hover:shadow-md transition-all duration-300 hover:border-primary/20"
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-2xl font-bold">
                            {item.word}
                          </CardTitle>
                          <Badge
                            variant={item.score > 90 ? "default" : "secondary"}
                            className="px-2 py-0"
                          >
                            {item.score}%
                          </Badge>
                        </div>
                        <CardDescription>
                          <Link
                            href={`/celebrity/${item.celebrity
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                            className="hover:text-primary transition-colors"
                          >
                            Mentioned by {item.celebrity}
                          </Link>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm">
                          <span>Mentions: {item.mentions}</span>
                          <span>{timeFilter}</span>
                        </div>
                        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${item.score}%` }}
                          ></div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant={
                            isInWishlist(item.word) ? "secondary" : "outline"
                          }
                          size="sm"
                          className="w-full"
                          onClick={() => handleAddToWishlist(item)}
                        >
                          <Star
                            className={`mr-2 h-4 w-4 ${
                              isInWishlist(item.word) ? "fill-primary" : ""
                            }`}
                          />
                          {isInWishlist(item.word)
                            ? "Added to Wishlist"
                            : "Add to Wishlist"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="high-potential" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {highPotentialKeywords.map((item, i) => (
                    <Card
                      key={i}
                      className="hover:shadow-md transition-all duration-300 hover:border-primary/20"
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-2xl font-bold">
                            {item.word}
                          </CardTitle>
                          <Badge variant="default" className="px-2 py-0">
                            {item.score}%
                          </Badge>
                        </div>
                        <CardDescription>
                          <Link
                            href={`/celebrity/${item.celebrity
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                            className="hover:text-primary transition-colors"
                          >
                            Mentioned by {item.celebrity}
                          </Link>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm">
                          <span>Mentions: {item.mentions}</span>
                          <span>{timeFilter}</span>
                        </div>
                        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${item.score}%` }}
                          ></div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant={
                            isInWishlist(item.word) ? "secondary" : "outline"
                          }
                          size="sm"
                          className="w-full"
                          onClick={() => handleAddToWishlist(item)}
                        >
                          <Star
                            className={`mr-2 h-4 w-4 ${
                              isInWishlist(item.word) ? "fill-primary" : ""
                            }`}
                          />
                          {isInWishlist(item.word)
                            ? "Added to Wishlist"
                            : "Add to Wishlist"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
