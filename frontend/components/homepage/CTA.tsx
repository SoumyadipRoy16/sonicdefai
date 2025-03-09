import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
export default function CTA() {
  return (
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
            <Link
              href="https://twitter.com/cryptotrendai"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto group shadow-lg shadow-black/20"
              >
                Follow Us{" "}
                <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
