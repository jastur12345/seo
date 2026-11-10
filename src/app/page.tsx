import { redirect } from "next/navigation";

// No homepage here — this app only hosts paid landing pages. The main site is jasonturtoga.com.
export default function Home() {
  redirect("/seo/");
}
