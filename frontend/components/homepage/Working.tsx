import { Badge } from "@/components/ui/badge";
export default function Working() {
  return (
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
            Our platform makes it easy to track potential memecoin opportunities
            in just a few steps.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3 mt-12 relative">
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
              <p className="mt-2 text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
