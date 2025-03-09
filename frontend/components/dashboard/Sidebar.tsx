import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap, Star, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Sidebar() {
  return (
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
                href={`/celebrity/${name.toLowerCase().replace(/\s+/g, "-")}`}
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
  );
}
