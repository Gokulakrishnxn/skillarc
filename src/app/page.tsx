import { redirect } from "next/navigation";

/**
 * Root route — bounces to the docs introduction so the first-time landing
 * lands on a populated page (no empty-state flash).
 */
export default function HomePage(): never {
  redirect("/docs/introduction");
}
