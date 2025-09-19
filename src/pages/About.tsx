// src/pages/about.tsx
import React from "react";

export default function AboutPage() {
  return (
    <>

      <main style={{ background: "hsl(var(--background))", color: "hsl(var(--foreground))" }} className="min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-6">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold">About Synthwave View</h1>
            <p className="mt-2 text-muted">A modern data visualization playground with an AI assistant (demo).</p>
          </header>

          <section style={{ background: "hsl(var(--card))", padding: 20, borderRadius: 12 }}>
            <h2 className="text-2xl font-semibold mb-3">Our mission</h2>
            <p className="mb-4">We build fast, privacy-conscious web tools that make data simple, beautiful and actionable.</p>

            <h3 className="text-xl font-semibold mb-2">What we build</h3>
            <ul className="list-disc list-inside mb-4">
              <li>Drag-and-drop dashboards and interactive charts</li>
              <li>Local-first data parsing and previews</li>
              <li>AI assistant for dataset summaries and Q&A</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">The team</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div style={{ padding: 16, borderRadius: 8, background: "hsl(var(--accent))" }}>
                <strong>Anmol</strong>
                <div className="text-sm">Founder & Frontend</div>
                <div className="text-xs mt-2 text-muted">Designs and ships the product experience.</div>
              </div>

              <div style={{ padding: 16, borderRadius: 8, background: "hsl(var(--accent))" }}>
                <strong>Contributors</strong>
                <div className="text-sm">Open-source contributors</div>
                <div className="text-xs mt-2 text-muted">Community-driven improvements.</div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
