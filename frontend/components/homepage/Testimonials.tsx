import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
export default function Testimonials() {
  return (
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
                <p className="text-muted-foreground">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
