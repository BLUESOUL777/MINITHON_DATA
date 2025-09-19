// src/pages/terms.tsx
import { FileText, Shield, Scale, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Terms() {
  const updated = new Date().toLocaleDateString();
  
  const termsItems = [
    {
      title: "Acceptance of Terms",
      description: "By using Synthwave View you accept these Terms of Service. Please read them carefully before using our platform.",
      icon: FileText,
    },
    {
      title: "Use of Service",
      description: "You may use the service for lawful purposes only. You are responsible for the data you upload and the use you make of the service.",
      icon: Shield,
    },
    {
      title: "Intellectual Property",
      description: "All third-party intellectual property remains with their owners. We retain rights to project code and assets developed by our team.",
      icon: Scale,
    },
    {
      title: "Limitation of Liability",
      description: "Use the platform at your own risk. We are not responsible for losses resulting from the use of the platform, except as required by law.",
      icon: AlertTriangle,
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
              Terms of{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Service
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto animate-slide-up">
              Please read these terms carefully before using our service. They govern your use of Synthwave View.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Last updated: {updated}
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground font-serif sm:text-4xl">
              Your Agreement With Us
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              These terms establish the rules and guidelines for using our data visualization platform.
            </p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-2">
            {termsItems.map((item, index) => {
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
          
          {/* Additional Terms */}
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            <Card className="hover-lift animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <CardHeader>
                <CardTitle className="text-lg">Data Ownership</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  You retain ownership of any data you upload to our platform. We don't claim rights to your content.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="hover-lift animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <CardHeader>
                <CardTitle className="text-lg">Service Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We strive for high availability but cannot guarantee uninterrupted service. Maintenance may occur periodically.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="hover-lift animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <CardHeader>
                <CardTitle className="text-lg">Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We may update these terms occasionally. Continued use constitutes acceptance of any changes.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
