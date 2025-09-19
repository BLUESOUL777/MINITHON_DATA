// src/pages/contact.tsx
import { useState } from "react";
import { Mail, MapPin, Clock, Send, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

type FormState = { name: string; email: string; subject: string; message: string };

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);

  const update = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }));

  const validate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ ok: false, text: "Please fill in name, email and message." });
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setStatus({ ok: false, text: "Please enter a valid email address." });
      return false;
    }
    return true;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    if (!validate()) return;
    setLoading(true);
    // Demo-only: simulate submit (replace with actual API call if needed)
    setTimeout(() => {
      setLoading(false);
      setStatus({ ok: true, text: "Thanks — your message was recorded (demo)." });
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 800);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/20">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-20 text-center lg:px-8 lg:pt-32">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Badge variant="secondary" className="text-sm px-3 py-1">
                Contact Us
              </Badge>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground font-serif sm:text-6xl lg:text-7xl animate-fade-in">
              Get in{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto animate-slide-up">
              Questions, feedback, or partnership inquiries — we'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground font-serif sm:text-4xl mb-6">
                  Let's Connect
                </h2>
                <p className="text-lg text-muted-foreground">
                  Ready to transform your data visualization experience? Reach out to us and let's discuss how we can help.
                </p>
              </div>
              
              <div className="space-y-4">
                <Card className="hover-lift animate-fade-in">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Email</CardTitle>
                        <CardDescription>
                          <a href="mailto:hello@synthwave-view.app" className="text-primary hover:underline">
                            hello@synthwave-view.app
                          </a>
                        </CardDescription>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover-lift animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Location</CardTitle>
                        <CardDescription>Mumbai, India</CardDescription>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover-lift animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Response Time</CardTitle>
                        <CardDescription>Typically within 48 hours</CardDescription>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover-lift animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <CardHeader>
                    <CardTitle className="text-xl">Business Inquiries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      For integrations or partnerships, please email{" "}
                      <a href="mailto:biz@synthwave-view.app" className="text-primary hover:underline">
                        biz@synthwave-view.app
                      </a>
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif">Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={onSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          value={form.name}
                          onChange={update("name")}
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={update("email")}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={form.subject}
                        onChange={update("subject")}
                        placeholder="What's this about?"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={form.message}
                        onChange={update("message")}
                        placeholder="Tell us more about your inquiry..."
                        className="min-h-[120px] resize-y"
                        required
                      />
                    </div>

                    {status && (
                      <Alert className={status.ok ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                        <AlertDescription className={status.ok ? "text-green-800" : "text-red-800"}>
                          {status.text}
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="submit"
                        disabled={loading}
                        className="flex-1 sm:flex-none"
                      >
                        {loading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setForm({ name: "", email: "", subject: "", message: "" });
                          setStatus(null);
                        }}
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
