// src/pages/privacy.tsx
import { Shield, Eye, Database, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Privacy() {
  const updated = new Date().toLocaleDateString();
  
  const privacyItems = [
    {
      title: "Data We Collect",
      description: "We collect email and message content if you submit the contact form. Uploaded datasets are stored only when you explicitly save them.",
      icon: Database,
    },
    {
      title: "How We Use Data",
      description: "We use data to provide the service, improve the product and respond to requests. Your data is never sold or shared with third parties without your consent.",
      icon: Eye,
    },
    {
      title: "Third-party Services",
      description: "We may use services like Supabase and OpenRouter for authentication and AI features. Please review their privacy policies for details.",
      icon: Shield,
    },
    {
      title: "Your Rights",
      description: "You have the right to access, modify, or delete your personal data. Contact us for any privacy-related requests or concerns.",
      icon: Mail,
    },
  ];
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/20">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-20 text-center lg:px-8 lg:pt-32">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Badge variant="secondary" className="text-sm px-3 py-1">
                Legal
              </Badge>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground font-serif sm:text-6xl lg:text-7xl animate-fade-in">
              Privacy{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Policy
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto animate-slide-up">
              Your privacy matters to us. Learn how we collect, use, and protect your personal information.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Last updated: {updated}
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground font-serif sm:text-4xl">
              Our Privacy Commitment
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We believe in transparency and your right to understand how your data is handled.
            </p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-2">
            {privacyItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="hover-lift animate-fade-in relative overflow-hidden group" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                          {item.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                  <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Card>
              );
            })}
          </div>
          
          {/* Contact Section */}
          <div className="mt-16 text-center">
            <Card className="hover-lift animate-fade-in max-w-2xl mx-auto" style={{ animationDelay: '0.4s' }}>
              <CardHeader>
                <CardTitle className="text-2xl font-serif">Questions About Privacy?</CardTitle>
                <CardDescription className="text-base">
                  If you have any questions about this Privacy Policy or how we handle your data, please don't hesitate to reach out.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href="mailto:privacy@synthwave-view.app" className="text-primary hover:underline font-medium">
                    privacy@synthwave-view.app
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
