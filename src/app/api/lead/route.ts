// Receives landing-page leads, validates them, and forwards them to LEAD_WEBHOOK_URL
// (Zapier / Make / n8n / CRM inbound webhook — server-only env var, never NEXT_PUBLIC).
// In dev with no webhook set, the lead is printed to the server console instead.
// In production with no webhook set, it returns 503 rather than silently dropping leads.

const MAX = { name: 100, email: 200, website: 200, budget: 50, form: 60, other: 500 };
const HIDDEN = [
  "gclid", "gbraid", "wbraid",
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
  "landing_page", "referrer",
] as const;

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled → pretend success so bots don't retry, but don't forward anything.
  if (str(body.company_fax, 100)) {
    return Response.json({ id: crypto.randomUUID() });
  }

  const lead = {
    name: str(body.name, MAX.name),
    email: str(body.email, MAX.email).toLowerCase(),
    website: str(body.website, MAX.website),
    budget: str(body.budget, MAX.budget),
    form: str(body.form, MAX.form),
  };

  const problems: string[] = [];
  if (lead.name.length < 2) problems.push("Please enter your name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) problems.push("Please enter a valid email.");
  if (!/^(https?:\/\/)?[\w-]+(\.[\w-]+)+(\/\S*)?$/i.test(lead.website)) problems.push("Please enter your website.");
  if (!lead.budget) problems.push("Please choose a budget range.");
  if (problems.length) return Response.json({ error: problems.join(" ") }, { status: 422 });

  const attribution = Object.fromEntries(HIDDEN.map((k) => [k, str(body[k], MAX.other)]));
  const id = crypto.randomUUID();
  const payload = {
    id,
    submitted_at: new Date().toISOString(),
    ...lead,
    ...attribution,
    user_agent: str(request.headers.get("user-agent"), MAX.other),
  };

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV === "production") {
      console.error("LEAD_WEBHOOK_URL is not set — lead NOT delivered", { id, form: lead.form });
      return Response.json(
        { error: "We couldn't send your request. Please call us instead." },
        { status: 503 },
      );
    }
    console.log("[lead] (dev, no LEAD_WEBHOOK_URL set)", payload);
    return Response.json({ id });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`webhook responded ${res.status}`);
  } catch (err) {
    console.error("Lead webhook failed", { id, err: String(err) });
    return Response.json(
      { error: "We couldn't send your request. Please try again or call us." },
      { status: 502 },
    );
  }

  return Response.json({ id });
}
