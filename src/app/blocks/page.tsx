import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Construction } from "lucide-react";

export const metadata: Metadata = {
  title: "Blocks",
  description: "Blocks page is currently under development.",
};

export default function BlocksPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100dvh-3.5rem)] w-full max-w-4xl items-center px-4 py-16 sm:px-6 md:px-8">
      <section className="w-full rounded-xl border border-border bg-card p-8 text-center sm:p-10">
        <div className="mx-auto mb-4 inline-flex rounded-full border border-border-strong bg-background p-3 text-accent">
          <Construction className="h-5 w-5" aria-hidden />
        </div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Blocks</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Page under development
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
          We are actively building Blocks. Check back soon for reusable section
          patterns and ready-to-use layouts.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex h-10 items-center gap-2 rounded-md border border-border-strong bg-background px-4 text-sm font-medium text-foreground transition hover:bg-muted"
        >
          Back to home
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </section>
    </main>
  );
}
