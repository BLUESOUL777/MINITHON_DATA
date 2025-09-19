// src/pages/contact.tsx
import React, { useState } from "react";


type FormState = { name: string; email: string; subject: string; message: string };

export default function ContactPage() {
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
    <>
      <main
        style={{ background: "hsl(var(--background))", color: "hsl(var(--foreground))" }}
        className="min-h-screen py-16"
      >
        <div className="max-w-6xl mx-auto px-6">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold">Get in touch</h1>
            <p className="mt-2 text-muted">Questions, feedback or partnership inquiries — we’d love to hear from you.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div style={{ background: "hsl(var(--card))", padding: 20, borderRadius: 12 }}>
                <h3 className="text-lg font-semibold">Contact details</h3>
                <p className="text-sm mt-2">
                  Email:{" "}
                  <a className="underline" href="mailto:hello@synthwave-view.app">
                    hello@synthwave-view.app
                  </a>
                </p>
                <p className="text-sm">Location: Mumbai, India</p>
                <p className="text-sm">Response time: typically within 48 hours</p>
              </div>

              <div style={{ background: "hsl(var(--card))", padding: 20, borderRadius: 12 }}>
                <h3 className="text-lg font-semibold">Business</h3>
                <p className="text-sm mt-2">
                  For integrations or partnerships, please use the contact form or email{" "}
                  <a className="underline" href="mailto:biz@synthwave-view.app">
                    biz@synthwave-view.app
                  </a>
                  .
                </p>
              </div>
            </div>

            <div>
              <form
                onSubmit={onSubmit}
                className="w-full max-w-xl mx-auto space-y-4 p-6 rounded-lg"
                style={{
                  background: "hsl(var(--card))",
                  color: "hsl(var(--card-foreground))",
                  boxShadow: "var(--shadow-md)",
                }}
                aria-labelledby="contact-form-heading"
              >
                <h3 id="contact-form-heading" className="text-2xl font-semibold">
                  Contact us
                </h3>

                <label className="block">
                  <span className="text-sm">Name</span>
                  <input
                    className="mt-1 block w-full rounded-md px-3 py-2"
                    style={{ background: "hsl(var(--input))", border: "1px solid hsl(var(--border))" }}
                    value={form.name}
                    onChange={update("name")}
                    aria-label="Name"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-sm">Email</span>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded-md px-3 py-2"
                    style={{ background: "hsl(var(--input))", border: "1px solid hsl(var(--border))" }}
                    value={form.email}
                    onChange={update("email")}
                    aria-label="Email"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-sm">Subject (optional)</span>
                  <input
                    className="mt-1 block w-full rounded-md px-3 py-2"
                    style={{ background: "hsl(var(--input))", border: "1px solid hsl(var(--border))" }}
                    value={form.subject}
                    onChange={update("subject")}
                    aria-label="Subject"
                  />
                </label>

                <label className="block">
                  <span className="text-sm">Message</span>
                  <textarea
                    className="mt-1 block w-full rounded-md px-3 py-2 min-h-[120px] resize-y"
                    style={{ background: "hsl(var(--input))", border: "1px solid hsl(var(--border))" }}
                    value={form.message}
                    onChange={update("message")}
                    aria-label="Message"
                    required
                  />
                </label>

                <div className="flex gap-3 items-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-md px-4 py-2 font-medium"
                    style={{
                      background: "hsl(var(--primary))",
                      color: "hsl(var(--primary-foreground))",
                      boxShadow: "var(--shadow-sm)",
                      opacity: loading ? 0.75 : 1,
                    }}
                  >
                    {loading ? "Sending…" : "Send message"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setForm({ name: "", email: "", subject: "", message: "" });
                      setStatus(null);
                    }}
                    className="rounded-md px-3 py-2 border"
                    style={{ borderColor: "hsl(var(--border))" }}
                  >
                    Reset
                  </button>
                </div>

                {status && (
                  <div
                    role="status"
                    className="mt-3 p-3 rounded-md"
                    style={{
                      background: status.ok ? "hsl(var(--success))" : "hsl(var(--destructive) / 0.12)",
                      color: status.ok ? "hsl(var(--success-foreground))" : "hsl(var(--destructive-foreground))",
                    }}
                  >
                    {status.text}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
