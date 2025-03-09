import { ChevronDown, Filter, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useWishlist } from "@/components/wishlist-provider";
import { useToast } from "@/hooks/use-toast";

export default function Main() {
  const [timeFilter, setTimeFilter] = useState("Last 7 Days");
  const { addItem, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

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
                <DropdownMenuItem onClick={() => setTimeFilter("Last 7 Days")}>
                  Last 7 Days
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeFilter("Last 30 Days")}>
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
  );
}
