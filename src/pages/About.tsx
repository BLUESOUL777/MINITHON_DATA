// src/pages/about.tsx
import { Users, Target, Code2, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function About() {
  const teamMembers = [
    {
      name: "Anmol",
      role: "Founder & Frontend",
      description: "Designs and ships the product experience.",
      icon: Code2,
    },
    {
      name: "Contributors",
      role: "Open-source contributors",
      description: "Community-driven improvements.",
      icon: Users,
    },
  ];

  const features = [
    {
      title: "Drag-and-drop dashboards",
      description: "Create beautiful, interactive charts with ease",
      icon: Target,
    },
    {
      title: "Local-first data parsing",
      description: "Process your data securely on your device",
      icon: Globe,
    },
    {
      title: "AI assistant integration",
      description: "Get dataset summaries and Q&A powered by AI",
      icon: Code2,
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
                About Us
              </Badge>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground font-serif sm:text-6xl lg:text-7xl animate-fade-in">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                DataVision AI
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto animate-slide-up">
              A modern data visualization playground with an AI assistant. We make data simple, beautiful, and actionable.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground font-serif sm:text-4xl">
              Our Mission
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Building fast, privacy-conscious web tools that transform complex data into actionable insights
            </p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="hover-lift animate-fade-in relative overflow-hidden group" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-primary/10 p-2 hover-rotate transition-transform duration-300">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                  <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground font-serif sm:text-4xl">
              Meet The Team
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate individuals building the future of data visualization
            </p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => {
              const Icon = member.icon;
              return (
                <Card key={member.name} className="hover-lift animate-fade-in relative overflow-hidden group" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-3">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">
                          {member.name}
                        </CardTitle>
                        <p className="text-primary font-medium">{member.role}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {member.description}
                    </CardDescription>
                  </CardContent>
                  <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
