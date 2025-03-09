import { Zap, Twitter, Github, Facebook } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const socialLinks = [
    { name: "twitter", icon: <Twitter /> },
    { name: "facebook", icon: <Facebook /> },
    { name: "github", icon: <Github /> },
  ];
  return (
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
            {socialLinks.map(({ name, icon }) => (
              <Link
                key={name}
                href={`#${name}`}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center border">
                  <span className="sr-only">{icon}</span>
                  <div className="h-6 w-6 ">{icon}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-medium mb-4">Product</h3>
          <ul className="space-y-2 text-sm">
            {["Features", "How It Works", "Pricing", "FAQ", "Testimonials"].map(
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
          <h3 className="font-medium mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            {["About Us", "Blog", "Careers", "Press", "Contact"].map((item) => (
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
            Designed with <span className="text-primary">♥</span> for the crypto
            community
          </p>
        </div>
      </div>
    </footer>
  );
}
