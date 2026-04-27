import type { Metadata } from "next";
import {
  ArrowRight,
  Bell,
  BookOpen,
  CircleDot,
  Flame,
  Home,
  Layers,
  LifeBuoy,
  Menu,
  MessageSquare,
  Search,
  ShieldCheck,
  Tag,
  Users,
} from "lucide-react";

const SIDE_LINKS = [
  { label: "Home", icon: Home },
  { label: "Topics", icon: Layers },
  { label: "Users", icon: Users },
  { label: "Support", icon: LifeBuoy },
];

const CATEGORIES = [
  { name: "Announcements", color: "bg-pink-500" },
  { name: "Events", color: "bg-violet-500" },
  { name: "Discussions", color: "bg-sky-500" },
  { name: "Support", color: "bg-emerald-500" },
  { name: "Ideas", color: "bg-amber-500" },
];

const TOPICS = [
  {
    title: "How should we structure reusable AI skills?",
    replies: 24,
    views: "3.2k",
    status: "Solved",
    author: "gokul",
    period: "2h ago",
  },
  {
    title: "Best prompt templates for retrieval-heavy assistants",
    replies: 18,
    views: "2.1k",
    status: "Open",
    author: "dan",
    period: "5h ago",
  },
  {
    title: "Agent workflow review: support triage + escalation",
    replies: 12,
    views: "1.7k",
    status: "Open",
    author: "anita",
    period: "1d ago",
  },
  {
    title: "Code interpreter sandbox patterns in production",
    replies: 29,
    views: "4.8k",
    status: "Solved",
    author: "bruno",
    period: "2d ago",
  },
];

const TAGS = [
  "prompt",
  "agent",
  "workflow",
  "support",
  "python",
  "tooling",
  "research",
  "ui",
];

export const metadata: Metadata = {
  title: "Community",
  description:
    "Forum-style discussion hub for SkillArc users to share ideas, ask for help, and collaborate.",
};

export default function CommunityPage() {
  return (
    <main className="min-h-[calc(100dvh-3.5rem)] bg-background">
      <section className="border-b border-border px-3 py-2 sm:px-4">
        <div className="mx-auto flex max-w-[1500px] items-center gap-2">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border-strong bg-card text-muted-foreground md:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2 rounded-md border border-border-strong bg-card px-2.5 py-1.5">
            <MessageSquare className="h-4 w-4 text-accent" />
            <span className="text-sm font-semibold text-foreground">Community</span>
          </div>
          <div className="relative ml-auto hidden w-[360px] md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search discussions"
              className="h-9 w-full rounded-md border border-border-strong bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent/60 focus:outline-none"
            />
          </div>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border-strong bg-card text-muted-foreground"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
          </button>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1500px] md:grid-cols-[240px_1fr_220px]">
        <aside className="hidden border-r border-border px-4 py-6 md:block">
          <p className="mb-2 px-2 text-[11px] uppercase tracking-wider text-muted-foreground">
            Navigation
          </p>
          <nav className="space-y-1">
            {SIDE_LINKS.map(({ label, icon: Icon }) => (
              <a
                key={label}
                href="#"
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
                {label}
              </a>
            ))}
          </nav>

          <p className="mb-2 mt-6 px-2 text-[11px] uppercase tracking-wider text-muted-foreground">
            Categories
          </p>
          <ul className="space-y-1">
            {CATEGORIES.map((category) => (
              <li key={category.name}>
                <a
                  href="#"
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                  <span className={`h-2 w-2 rounded-full ${category.color}`} />
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <section className="min-w-0 px-3 py-6 sm:px-5 lg:px-8">
          <section className="mb-5 rounded-xl border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Access
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Become a Community Member
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Fill this form to request member access and join discussions.
            </p>

            <form className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="space-y-1.5">
                <span className="text-xs text-muted-foreground">Full name</span>
                <input
                  type="text"
                  placeholder="Your name"
                  className="h-10 w-full rounded-md border border-border-strong bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent/60 focus:outline-none"
                />
              </label>

              <label className="space-y-1.5">
                <span className="text-xs text-muted-foreground">Email</span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="h-10 w-full rounded-md border border-border-strong bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent/60 focus:outline-none"
                />
              </label>

              <label className="space-y-1.5">
                <span className="text-xs text-muted-foreground">Role</span>
                <select className="h-10 w-full rounded-md border border-border-strong bg-background px-3 text-sm text-foreground focus:border-accent/60 focus:outline-none">
                  <option>Developer</option>
                  <option>Student</option>
                  <option>Founder</option>
                  <option>Designer</option>
                  <option>Researcher</option>
                </select>
              </label>

              <label className="space-y-1.5">
                <span className="text-xs text-muted-foreground">Primary interest</span>
                <select className="h-10 w-full rounded-md border border-border-strong bg-background px-3 text-sm text-foreground focus:border-accent/60 focus:outline-none">
                  <option>Prompt Templates</option>
                  <option>AI Agents</option>
                  <option>Tools & Integrations</option>
                  <option>Community Support</option>
                </select>
              </label>

              <label className="space-y-1.5 sm:col-span-2">
                <span className="text-xs text-muted-foreground">Why do you want to join?</span>
                <textarea
                  rows={4}
                  placeholder="Share what you want to build and discuss in the community..."
                  className="w-full rounded-md border border-border-strong bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent/60 focus:outline-none"
                />
              </label>

              <label className="inline-flex items-start gap-2 text-xs text-muted-foreground sm:col-span-2">
                <input
                  type="checkbox"
                  className="mt-0.5 h-3.5 w-3.5 rounded border-border-strong bg-background"
                />
                I agree to follow forum rules and maintain respectful discussion.
              </label>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="inline-flex h-10 items-center gap-2 rounded-md bg-foreground px-4 text-sm font-medium text-background transition hover:opacity-90"
                >
                  Request membership
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </form>
          </section>

          <header className="mb-5 rounded-xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Discussions
                </p>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  SkillArc Community Forum
                </h1>
              </div>
              <a
                href="https://github.com/Gokulakrishnxn/skillarc/discussions"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 items-center gap-2 rounded-md bg-foreground px-3 text-sm font-medium text-background transition hover:opacity-90"
              >
                Start New Topic
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Discuss Docs, AI Skills, AI Agents, Tools, Prompts, and UI
              Components with other builders.
            </p>
          </header>

          <div className="space-y-3">
            {TOPICS.map((topic) => (
              <article
                key={topic.title}
                className="rounded-xl border border-border bg-card p-4 transition hover:border-border-strong"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className={`inline-flex h-6 items-center rounded-full px-2.5 text-[11px] font-medium ${
                      topic.status === "Solved"
                        ? "bg-success/20 text-success"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {topic.status}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    by {topic.author} · {topic.period}
                  </span>
                </div>

                <h2 className="text-base font-medium text-foreground sm:text-lg">
                  {topic.title}
                </h2>

                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <MessageSquare className="h-3.5 w-3.5" />
                    {topic.replies} replies
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Flame className="h-3.5 w-3.5" />
                    {topic.views} views
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <CircleDot className="h-3.5 w-3.5 text-success" />
                    Active thread
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="hidden border-l border-border px-4 py-6 lg:block">
          <div className="rounded-xl border border-border bg-card p-4">
            <h2 className="text-sm font-semibold text-foreground">Forum Rules</h2>
            <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
              <li className="flex gap-2">
                <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />
                Be respectful and constructive.
              </li>
              <li className="flex gap-2">
                <BookOpen className="mt-0.5 h-3.5 w-3.5 shrink-0 text-info" />
                Share examples with code/context.
              </li>
              <li className="flex gap-2">
                <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                Keep discussion on-topic.
              </li>
            </ul>
          </div>

          <div className="mt-4 rounded-xl border border-border bg-card p-4">
            <h2 className="text-sm font-semibold text-foreground">Popular Tags</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-1 text-[11px] text-muted-foreground"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
