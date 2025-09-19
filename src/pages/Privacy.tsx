// src/pages/privacy.tsx
import React from "react";

export default function PrivacyPage() {
  const updated = new Date().toLocaleDateString();
  return (
    <>

      <main style={{ background: "hsl(var(--background))", color: "hsl(var(--foreground))" }} className="min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-6">
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
            <p className="text-muted mt-2">Last updated: {updated}</p>
          </header>

          <article style={{ background: "hsl(var(--card))", padding: 20, borderRadius: 12 }}>
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Data We Collect</h2>
              <p>We collect email and message content if you submit the contact form. Uploaded datasets are stored only when you explicitly save them.</p>
            </section>

            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-2">How We Use Data</h2>
              <p>We use data to provide the service, improve the product and respond to requests.</p>
            </section>

            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Third-party Services</h2>
              <p>We may use services like Supabase and OpenRouter. Review their policies for details.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-2">Contact</h2>
              <p>For privacy requests contact <a href="mailto:privacy@synthwave-view.app" className="underline">privacy@synthwave-view.app</a>.</p>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
