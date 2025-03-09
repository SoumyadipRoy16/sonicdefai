import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Bell,
  ChevronRight,
  Globe,
  Search,
  Shield,
  Star,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Features() {
  return (
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
            Our platform provides powerful tools to help you discover the next
            big memecoin opportunity.
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
  );
}
