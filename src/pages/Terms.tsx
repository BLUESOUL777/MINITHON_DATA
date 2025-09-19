// src/pages/terms.tsx
import React from "react";

export default function TermsPage() {
  const updated = new Date().toLocaleDateString();
  return (
    <>

      <main style={{ background: "hsl(var(--background))", color: "hsl(var(--foreground))" }} className="min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-6">
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Terms of Service</h1>
            <p className="text-muted mt-2">Last updated: {updated}</p>
          </header>

          <article style={{ background: "hsl(var(--card))", padding: 20, borderRadius: 12 }}>
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Acceptance</h2>
              <p>By using Synthwave View you accept these Terms of Service. Please read them carefully.</p>
            </section>

            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Use of Service</h2>
              <p>You may use the service for lawful purposes only. You are responsible for the data you upload and the use you make of the service.</p>
            </section>

            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Intellectual Property</h2>
              <p>All third-party intellectual property remains with their owners. We retain rights to project code and assets.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-2">Liability</h2>
              <p>Use the platform at your own risk. We are not responsible for losses resulting from the use of the platform.</p>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
