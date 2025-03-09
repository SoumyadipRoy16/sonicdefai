"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, Bell, ChevronDown, ExternalLink, MessageSquare, Share2, Star, Twitter, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useWishlist } from "@/components/wishlist-provider"
import { useToast } from "@/hooks/use-toast"

export default function CelebrityPage({ params }: { params: { slug: string } }) {
  const { addItem, isInWishlist } = useWishlist()
  const { toast } = useToast()
  const [isFollowing, setIsFollowing] = useState(false)

  // This would be fetched from an API in a real app
  const celebrity = {
    name: "Elon Musk",
    username: "elonmusk",
    followers: "128.5M",
    bio: "CEO of Tesla, SpaceX, and X. Crypto enthusiast and meme lover.",
    avatar: "/placeholder.svg?height=128&width=128",
    verified: true,
    tweets: [
      {
        id: 1,
        content: "DOGE to the moon! 🚀",
        date: "2 hours ago",
        likes: 45600,
        retweets: 12300,
        keywords: ["DOGE", "moon"],
      },
      {
        id: 2,
        content: "Working on something special with the PEPE community. Stay tuned!",
        date: "1 day ago",
        likes: 78900,
        retweets: 23400,
        keywords: ["PEPE"],
      },
      {
        id: 3,
        content: "FLOKI is looking interesting these days. What do you think?",
        date: "3 days ago",
        likes: 34500,
        retweets: 8700,
        keywords: ["FLOKI"],
      },
      {
        id: 4,
        content: "The future of crypto is bright. HODL!",
        date: "5 days ago",
        likes: 56700,
        retweets: 15600,
        keywords: ["HODL"],
      },
    ],
    trendingKeywords: [
      { word: "DOGE", score: 98, mentions: 156 },
      { word: "PEPE", score: 95, mentions: 89 },
      { word: "FLOKI", score: 92, mentions: 67 },
      { word: "moon", score: 85, mentions: 124 },
      { word: "HODL", score: 82, mentions: 98 },
    ],
  }

  const handleAddToWishlist = (keyword: string) => {
    const keywordData = celebrity.trendingKeywords.find((k) => k.word === keyword)

    if (!keywordData) return

    if (isInWishlist(keyword)) {
      toast({
        title: "Already in wishlist",
        description: `"${keyword}" is already in your wishlist.`,
        variant: "destructive",
      })
      return
    }

    addItem({
      word: keywordData.word,
      score: keywordData.score,
      mentions: keywordData.mentions,
      celebrity: celebrity.name,
    })
  }

  const handleAddAllKeywords = (tweet: any) => {
    tweet.keywords.forEach((keyword: string) => {
      const keywordData = celebrity.trendingKeywords.find((k) => k.word === keyword)
      if (keywordData && !isInWishlist(keyword)) {
        addItem({
          word: keywordData.word,
          score: keywordData.score,
          mentions: keywordData.mentions,
          celebrity: celebrity.name,
        })
      }
    })

    toast({
      title: "Keywords added",
      description: `Added ${tweet.keywords.length} keywords to your wishlist.`,
    })
  }

  const toggleFollow = () => {
    setIsFollowing(!isFollowing)
    toast({
      title: isFollowing ? "Unfollowed" : "Following",
      description: isFollowing ? `You unfollowed ${celebrity.name}` : `You are now following ${celebrity.name}`,
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CryptoTrendAI</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                3
              </span>
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={celebrity.avatar} alt={celebrity.name} />
                  <AvatarFallback>{celebrity.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">{celebrity.name}</h1>
                    {celebrity.verified && <Badge variant="secondary">Verified</Badge>}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Twitter className="h-4 w-4" />
                    <span>@{celebrity.username}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{celebrity.followers} followers</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button onClick={toggleFollow} variant={isFollowing ? "secondary" : "default"}>
                  <Bell className="mr-2 h-4 w-4" />
                  {isFollowing ? "Following" : "Follow"}
                </Button>
                <Button variant="outline">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Link href={`https://twitter.com/${celebrity.username}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View on Twitter
                  </Button>
                </Link>
              </div>
            </div>
            <p className="mt-4 max-w-3xl">{celebrity.bio}</p>
          </div>

          <Tabs defaultValue="tweets">
            <TabsList className="mb-6">
              <TabsTrigger value="tweets">Tweets</TabsTrigger>
              <TabsTrigger value="trending">Trending Keywords</TabsTrigger>
              <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
            </TabsList>
            <TabsContent value="tweets" className="space-y-6">
              {celebrity.tweets.map((tweet) => (
                <Card key={tweet.id} className="hover:shadow-md transition-all duration-300 hover:border-primary/20">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={celebrity.avatar} alt={celebrity.name} />
                          <AvatarFallback>{celebrity.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-1">
                            <CardTitle className="text-base">{celebrity.name}</CardTitle>
                            <span className="text-sm text-muted-foreground">@{celebrity.username}</span>
                          </div>
                          <CardDescription>{tweet.date}</CardDescription>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{tweet.content}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {tweet.keywords.map((keyword, i) => (
                        <Badge
                          key={i}
                          variant={isInWishlist(keyword) ? "default" : "outline"}
                          className={`cursor-pointer hover:bg-primary/10 ${isInWishlist(keyword) ? "bg-primary/20" : ""}`}
                          onClick={() => handleAddToWishlist(keyword)}
                        >
                          {keyword}
                          {isInWishlist(keyword) && <Star className="ml-1 h-3 w-3 fill-primary" />}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MessageSquare className="h-4 w-4" />
                        <span className="text-sm">{tweet.likes.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Share2 className="h-4 w-4" />
                        <span className="text-sm">{tweet.retweets.toLocaleString()}</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleAddAllKeywords(tweet)}>
                        <Star className="mr-2 h-4 w-4" />
                        Add Keywords to Wishlist
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="trending" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {celebrity.trendingKeywords.map((keyword, i) => (
                  <Card key={i} className="hover:shadow-md transition-all duration-300 hover:border-primary/20">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl font-bold">{keyword.word}</CardTitle>
                        <Badge variant={keyword.score > 90 ? "default" : "secondary"} className="px-2 py-0">
                          {keyword.score}%
                        </Badge>
                      </div>
                      <CardDescription>Potential Score</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <span>Mentions: {keyword.mentions}</span>
                        <span>Last 30 days</span>
                      </div>
                      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div className="h-full bg-primary" style={{ width: `${keyword.score}%` }}></div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant={isInWishlist(keyword.word) ? "secondary" : "outline"}
                        size="sm"
                        className="w-full"
                        onClick={() => handleAddToWishlist(keyword.word)}
                      >
                        <Star className={`mr-2 h-4 w-4 ${isInWishlist(keyword.word) ? "fill-primary" : ""}`} />
                        {isInWishlist(keyword.word) ? "Added to Wishlist" : "Add to Wishlist"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="analysis" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Analysis Report</CardTitle>
                  <CardDescription>Based on tweet patterns and market trends</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Tweet Frequency</h3>
                    <p className="text-sm text-muted-foreground">
                      {celebrity.name} tweets about crypto approximately 3.5 times per day, with peak activity on
                      weekends.
                    </p>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full bg-primary" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Market Impact</h3>
                    <p className="text-sm text-muted-foreground">
                      Tweets from this celebrity have shown a 65% correlation with price movements within 24 hours.
                    </p>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full bg-primary" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Keyword Prediction</h3>
                    <p className="text-sm text-muted-foreground">
                      Based on recent patterns, our AI predicts the following keywords may appear in upcoming tweets:
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {["ROCKET", "MARS", "DOGE", "CYBERTRUCK", "SPACE"].map((word, i) => (
                        <Badge
                          key={i}
                          variant={i < 3 ? "default" : "outline"}
                          className="cursor-pointer hover:bg-primary/10"
                          onClick={() => {
                            if (!isInWishlist(word)) {
                              addItem({
                                word,
                                score: 80 + Math.floor(Math.random() * 15),
                                mentions: 100 + Math.floor(Math.random() * 400),
                                celebrity: celebrity.name,
                              })
                            }
                          }}
                        >
                          {word}
                          {isInWishlist(word) && <Star className="ml-1 h-3 w-3 fill-primary" />}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={toggleFollow}>
                    <Bell className="mr-2 h-4 w-4" />
                    {isFollowing ? "Unfollow" : "Set Alert for New Tweets"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

