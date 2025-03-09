"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Bell,
  ChevronDown,
  Filter,
  Search,
  Star,
  Trash2,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useWishlist } from "@/components/wishlist-provider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlist();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Date Added");

  const filteredItems = items.filter(
    (item) =>
      item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.celebrity.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "Potential Score":
        return b.score - a.score;
      case "Mentions":
        return b.mentions - a.mentions;
      case "Alphabetical":
        return a.word.localeCompare(b.word);
      case "Date Added":
      default:
        return (
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        );
    }
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      return `${Math.floor(diffDays / 7)} week${
        Math.floor(diffDays / 7) > 1 ? "s" : ""
      } ago`;
    } else {
      return date.toLocaleDateString();
    }
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
                placeholder="Search wishlist..."
                className="w-full bg-background pl-8 md:w-[300px] lg:w-[400px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                3
              </span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt="User"
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                <Link href="/dashboard">
                  <Button variant="ghost" className="w-full justify-start">
                    <Zap className="mr-2 h-4 w-4" />
                    Trending
                  </Button>
                </Link>
                <Button variant="secondary" className="w-full justify-start">
                  <Star className="mr-2 h-4 w-4" />
                  Wishlist
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
              </div>
            </div>
            <div className="px-4 py-2">
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                Notification Settings
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications" className="text-sm">
                    Email Alerts
                  </Label>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-notifications" className="text-sm">
                    Push Notifications
                  </Label>
                  <Switch id="push-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-notifications" className="text-sm">
                    SMS Alerts
                  </Label>
                  <Switch id="sms-notifications" />
                </div>
              </div>
            </div>
          </nav>
        </aside>
        <main className="flex-1 overflow-auto">
          <div className="container py-6">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-3xl font-bold">My Wishlist</h1>
                <Badge variant="outline" className="text-sm">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Sort: {sortBy}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSortBy("Date Added")}>
                      Date Added
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setSortBy("Potential Score")}
                    >
                      Potential Score
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("Mentions")}>
                      Mentions
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("Alphabetical")}>
                      Alphabetical
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Clear All
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Clear wishlist?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will remove all items from your wishlist. This
                        action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={clearWishlist}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Clear All
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Star className="h-16 w-16 text-muted-foreground/30 mb-4" />
                <h2 className="text-xl font-medium mb-2">
                  Your wishlist is empty
                </h2>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Add keywords from trending or celebrity pages to start
                  tracking potential memecoin opportunities.
                </p>
                <Link href="/dashboard">
                  <Button>
                    <Zap className="mr-2 h-4 w-4" />
                    Explore Trending Keywords
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sortedItems.map((item) => (
                  <Card
                    key={item.id}
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
                        Added {formatDate(item.dateAdded)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage
                            src={`/placeholder.svg?height=20&width=20&text=${item.celebrity[0]}`}
                            alt={item.celebrity}
                          />
                          <AvatarFallback>{item.celebrity[0]}</AvatarFallback>
                        </Avatar>
                        <Link
                          href={`/celebrity/${item.celebrity
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="text-sm hover:text-primary transition-colors"
                        >
                          Mentioned by {item.celebrity}
                        </Link>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Mentions: {item.mentions}</span>
                        <span>Last 30 days</span>
                      </div>
                      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${item.score}%` }}
                        ></div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <Bell className="mr-2 h-4 w-4" />
                        Set Alert
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Remove from wishlist?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This will remove "{item.word}" from your wishlist.
                              You can add it again later if needed.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => removeItem(item.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Remove
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}

            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Alert Settings</CardTitle>
                  <CardDescription>
                    Configure when you want to be notified about your wishlist
                    items
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">New Memecoin Launch</h3>
                      <p className="text-sm text-muted-foreground">
                        Get notified when a new memecoin launches with your
                        keywords
                      </p>
                    </div>
                    <Switch id="new-launch" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Celebrity Mentions</h3>
                      <p className="text-sm text-muted-foreground">
                        Get notified when a celebrity mentions your keywords
                      </p>
                    </div>
                    <Switch id="celebrity-mentions" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Trending Keywords</h3>
                      <p className="text-sm text-muted-foreground">
                        Get notified when your keywords start trending
                      </p>
                    </div>
                    <Switch id="trending-keywords" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Price Movements</h3>
                      <p className="text-sm text-muted-foreground">
                        Get notified about significant price movements for your
                        keywords
                      </p>
                    </div>
                    <Switch id="price-movements" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Save Settings</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
