# TD-website

Google Ads landing pages for Jason Turtoga Digital (Next.js 16, Tailwind 4).

| Route | What it is |
|---|---|
| `/seo/` | Landing page for the "seo services" ad group (rebuild of jasonturtoga.com/services/seo/). H1 opens with the keyword. |
| `/thank-you/` | Post-submit page; fires the Google Ads conversion (deduped by lead id). |
| `/api/lead/` | Validates the form and forwards leads to `LEAD_WEBHOOK_URL`. |

The form captures `gclid`, `gbraid`, `wbraid` and `utm_*` into hidden fields (kept 90 days in the browser).

## Run locally

```bash
cp .env.example .env.local   # fill in values
npm install
npm run dev                  # http://localhost:6544/seo/
```

## Environment variables

See `.env.example`. `LEAD_WEBHOOK_URL` is required in production — without it the form returns an error instead of losing leads.
