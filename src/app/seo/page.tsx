import type { Metadata } from "next";
import Image from "next/image";
import "./seo.css";
import CallButton from "@/components/CallButton";
import ProposalForm from "@/components/ProposalForm";
import HeroLottie from "@/components/seo/HeroLottie";
import LogoMarquee, { type Logo } from "@/components/seo/LogoMarquee";
import SiteFooter from "@/components/seo/SiteFooter";
import SiteHeader from "@/components/seo/SiteHeader";
import StatsCarousel from "@/components/seo/StatsCarousel";
import { SITE, wp } from "@/lib/site";

// Paid landing page for the "seo services" ad group. Final URL: /seo/
// Rebuilt from jasonturtoga.com/services/seo/ (copy, layout, animations). The H1 opens with the
// exact keyword "SEO Services", followed by the site's rotating words + hand-drawn underline.

export const metadata: Metadata = {
  title: "SEO Services That Grow Profit | Jason Turtoga Digital",
  description:
    "Our SEO services focus on full-stack SEO strategy and authority building to help your business convert more traffic, leads and revenue.",
  // Paid-traffic page: kept out of organic results so it doesn't compete with /services/seo/.
  // AdsBot ignores noindex, so ad review and Quality Score are unaffected.
  robots: { index: false, follow: true },
};

/* ------------------------------------------------------------------ content (verbatim from the site) */

const STATS: [string, string][] = [
  ["+63% Growth in Qualified Leads", "Driven by high-intent search traffic"],
  ["+38% Increase in Search Visibility", "Built through content and authority"],
  ["+54% More Organic Conversions", "Generated through intent-focused strategies"],
  ["100% Custom SEO Strategies", "Built around your goals and market competition"],
];

const c = (file: string, w = 915, h = 240) => `/clients/${file}|${w}|${h}`;
const toLogos = (list: string[], alts: string[]): Logo[] =>
  list.map((s, i) => {
    const [src, w, h] = s.split("|");
    return { src, w: Number(w), h: Number(h), alt: alts[i] };
  });
const ROW1 = toLogos(
  [c("Invoice-Simple-1.png"), c("The-Derm-Review-1.png"), c("DNA-Weekly.png"), c("Website-Planet.png", 800, 210), c("DMD.png"), c("My-PT-Hub.png"), c("SafetyDetectives.svg", 526, 88), c("Credit-Donkey.png"), c("FSG.webp", 128, 63)],
  ["Invoice Simple", "The Derm Review", "DNA Weekly", "Website Planet", "DMD", "My PT Hub", "Safety Detectives", "CreditDonkey", "FSG"],
);
const ROW2 = toLogos(
  [c("Upskilled-1.png"), c("BroadBrandSearch.png"), c("RedStagFulfillment2.png"), c("MoveBuddha.png", 729, 98), c("ePermitTest.png", 139, 43), c("Emergency-Dentist-USA.png"), c("Ammo.com_.png", 800, 210), c("SellCoursesOnline.png"), c("CompariTech.png")],
  ["Upskilled", "Broad Brand Search", "Red Stag Fulfillment", "moveBuddha", "ePermitTest", "Emergency Dentist USA", "Ammo.com", "Sell Courses Online", "Comparitech"],
);

type SvcIcon = "gear" | "keys" | "search" | "content" | "link" | "report";
const SERVICES: [SvcIcon, string, string, string][] = [
  ["gear", "TECHNICAL SEO FOUNDATION", "Site speed issues, broken internal links, crawl errors, and indexing problems quietly prevent your website from ranking. We fix the technical issues holding your search visibility back and strengthen the foundation search engines rely on.", "faster performance, cleaner site architecture, improved crawlability, and stronger rankings across your most important pages."],
  ["keys", "STRATEGIC KEYWORD RESEARCH", "Generic keywords rarely drive qualified leads or sales. We identify intent-driven search terms based on how real customers search at every stage of the buying journey. This helps your business appear where high-value traffic is actively searching.", "stronger rankings, better visibility, and more traffic that converts into revenue."],
  ["search", "ON-PAGE OPTIMIZATION", "From SEO titles and content structure to internal linking and technical signals, we optimize every layer of your website so search engines clearly understand your relevance and authority.", "higher rankings, stronger click-through rates, and pages that turn more visitors into qualified leads and customers."],
  ["content", "CONVERSION-FOCUSED CONTENT STRATEGY", "We create optimized website content, landing pages, and resources designed to rank and convert. Every piece aligns with search intent, builds trust, and guides visitors toward taking action.", "stronger search visibility, higher engagement, and more qualified leads and sales from your traffic."],
  ["link", "AUTHORITY LINK BUILDING", "We secure backlinks from trusted websites, industry publications, and relevant sources that strengthen your website’s authority and credibility in search results.", "higher domain authority, stronger rankings, and better visibility for competitive keywords that drive valuable traffic and revenue."],
  ["report", "ANALYTICS & PERFORMANCE REPORTING", "We do more than report traffic. Our reporting tracks keyword growth, search visibility, user behavior, conversions, and overall SEO performance so you know exactly what drives results and where to scale next.", "complete clarity on ROI, campaign performance, and growth opportunities for your business."],
];

const REASONS: [string, string][] = [
  ["Competitors outrank your website", "They appear higher in search results and capture the traffic your business should be converting."],
  ["Important pages are not ranking", "Technical SEO and content issues keep your most valuable pages invisible in search."],
  ["Your content fails to convert visitors", "Weak messaging, poor optimization, and low trust signals reduce conversions and engagement."],
  ["Your business relies too heavily on paid ads", "An expensive strategy that limits scalability, stability, and long-term profitability."],
];

const WHY: [string, string, string[]][] = [
  ["fa-trophy", "12+ Years of SEO Experience", ["Jason Turtoga Digital has helped businesses grow through SEO for over 12 years. Our strategies are built from real-world testing across multiple industries and search environments.", "We do not use generic templates or one-size-fits-all strategies. Every campaign is tailored to your business goals, competition, and growth opportunities to deliver measurable ranking and traffic results."]],
  ["fa-magnifying-glass-chart", "SEO That Strengthens Your Entire Marketing Strategy", ["SEO works best when it supports your broader marketing efforts. A properly optimized website improves not only rankings, but also user experience, conversion performance, and content effectiveness.", "Investing in SEO strengthens your landing pages, paid advertising campaigns, content marketing, and overall digital presence — helping every marketing channel perform better."]],
  ["fa-headset", "More Than Just SEO Services", ["Jason Turtoga Digital supports more than search rankings. We help businesses strengthen their entire online presence through content strategy, authority building, and digital growth solutions.", "Our team works closely with your business goals to recommend strategies that improve visibility, generate qualified traffic, and support long-term marketing growth."]],
  ["fa-handshake", "More Than an Agency — A Growth Partner", ["Jason Turtoga Digital works as an extension of your business, not just another SEO provider. We take the time to understand your goals, industry, competition, and growth opportunities.", "Our team builds strategies around what your business actually needs to increase visibility, attract qualified traffic, and achieve long-term growth."]],
];

const CASES = [
  { title: "Security Tech Case Study", href: wp("/case-studies/security-tech/"), img: "/brand/case-security-tech.webp", w: 1693, h: 929 },
  { title: "FinTech Case Study", href: wp("/case-studies/fin-tech/"), img: "/brand/case-fintech.webp", w: 1536, h: 1024 },
];

const MORE: { title: string; text: string; cta: string; svg: React.ReactNode; local?: boolean }[] = [
  { title: "E-commerce SEO", text: "Turn product searches into steady sales by ranking your store where buyers are ready to purchase.", cta: "Get E-com Audit", svg: <><path d="M11 13h8l5 31h28l6-22H22" /><path d="M27 28v10M37 28v10M47 28v10" /><path d="M24 22h31" /><circle cx="29" cy="51" r="3" /><circle cx="49" cy="51" r="3" /><rect x="8" y="8" width="12" height="6" rx="2" /></> },
  { title: "SaaS SEO", text: "Capture high-intent users searching for solutions and convert them into qualified trials and subscribers.", cta: "Claim SaaS Audit", svg: <><path d="M9 22h46v29a5 5 0 0 1-5 5H14a5 5 0 0 1-5-5V22Z" /><path d="M9 31c13 7 33 7 46 0" /><path d="M23 22v-5a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v5" /><rect x="28" y="31" width="8" height="10" rx="2" /></> },
  { title: "Affiliate SEO", text: "Rank buyer-intent keywords that drive consistent clicks and commissions from organic search.", cta: "Free SEO Audit", svg: <><circle cx="32" cy="32" r="17" /><path d="M32 23v18M38 27c-2-4-12-4-12 2 0 7 12 3 12 10 0 6-10 6-13 1" /><path d="M32 14V7M32 57v-7M50 32h7M7 32h7" /><path d="m45 19 7-7M12 52l7-7M45 45l7 7M12 12l7 7" /><path d="m51 7 1 6-6-1M57 32l-5-3v6M52 52l-6-1 1-6M12 52l1-6 6 1M7 32l5-3v6M12 12l6 1-1 6M32 7l-3 5h6M32 57l-3-5h6" /></> },
  { title: "Local SEO", local: true, text: "Put your business at the top of local searches, maps, and “near me” results to drive calls, visits, and bookings.", cta: "Get Local SEO Plan", svg: <><circle cx="27" cy="25" r="20" /><path d="M27 14a9 9 0 0 0-9 9c0 8 9 17 9 17s9-9 9-17a9 9 0 0 0-9-9Z" className="jtd-icon-fill" /><circle cx="27" cy="23" r="3.5" className="jtd-icon-hole" /><path d="m41 40 15 15" /></> },
  { title: "Enterprise SEO", text: "Scale search visibility across thousands of pages to capture demand at every stage of the customer journey.", cta: "Enterprise SEO", svg: <><rect x="8" y="14" width="48" height="34" rx="3" /><path d="M8 40h48M24 55h16M28 48l-2 7M36 48l2 7" /><circle cx="32" cy="27" r="10" /><path d="M32 19v16M37 22c-3-4-10-2-10 2 0 5 10 2 10 7 0 5-8 6-11 1" /><path d="M12 19h7M45 19h7" /></> },
  { title: "White-Label SEO", text: "Deliver proven SEO results under your brand so you can grow clients and revenue without expanding your team.", cta: "Partner with us", svg: <><circle cx="32" cy="13" r="8" /><circle cx="15" cy="43" r="8" /><circle cx="49" cy="43" r="8" /><path d="M26 18 19 36M38 18l7 18M23 43h18" /><circle cx="32" cy="11" r="2.5" /><path d="M27 18c1-4 9-4 10 0M10 48c1-4 9-4 10 0M44 48c1-4 9-4 10 0" /><circle cx="15" cy="41" r="2.5" /><circle cx="49" cy="41" r="2.5" /></> },
];

const FAQ: [string, string][] = [
  ["What results can I expect and when will I see them?", "Most clients start seeing real growth within three to six months. SEO builds over time, but every month adds momentum. You’ll see clearer visibility, higher traffic, and more qualified leads as we move forward."],
  ["How do you decide which keywords to target?", "We research what your ideal customers actually search for. Then we target terms that bring real business results, not just clicks. We adjust based on performance so your campaigns always stay competitive."],
  ["Do I need both SEO and paid search (SEM)?", "SEO and SEM serve different goals. SEO drives long-term organic growth. SEM delivers faster visibility through paid ads. Many clients use both for a balanced strategy, SEO for stability, SEM for immediate traffic."],
  ["How much do your services cost?", "We customize every plan based on your goals, industry, and competition. Local campaigns cost less than national ones. After a short consultation, you’ll get a clear proposal with no hidden fees."],
  ["Do you guarantee first-page rankings?", "No one can guarantee that, and any agency claiming to should raise concern. What we guarantee is consistent work, transparent reporting, and strategies that move your business up the search results steadily."],
  ["How will I know if it’s working?", "You’ll receive regular reports showing keyword growth, traffic, and conversions. We focus on metrics that matter to your revenue, not vanity numbers."],
  ["My site has problems, can you fix them?", "Yes. Every project starts with a full site audit. We handle technical issues, content gaps, speed problems, and other errors that affect visibility. A clean foundation means stronger SEO performance."],
  ["Will SEO work with my content and paid campaigns?", "Yes. We align SEO with your content, ads, and social efforts. Everything works together to increase visibility, build authority, and attract the right customers."],
];

/* ------------------------------------------------------------------ icons */

function BadgeCheck({ size = 30 }: { size?: number }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="badge-check">
      <path d="M12 2.5l2.3 1.7 2.9-.1.9 2.7 2.3 1.7-.9 2.7.9 2.7-2.3 1.7-.9 2.7-2.9-.1L12 21.5l-2.3-1.7-2.9.1-.9-2.7-2.3-1.7.9-2.7-.9-2.7 2.3-1.7.9-2.7 2.9.1z" />
      <path d="M8.6 12.2l2.2 2.2 4.6-4.6" />
    </svg>
  );
}

function ServiceIcon({ name }: { name: SvcIcon }) {
  const d = {
    gear: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z",
    keys: "M3 6h18a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zM6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10",
    search: "M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5M14 3l5 5M14 3v5h5M8 9h3M8 13h2M17 17m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0M19.2 19.2 22 22",
    content: "M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6M12 18v-6M14 13.5c0-.8-.9-1.5-2-1.5s-2 .7-2 1.5.9 1.5 2 1.5 2 .7 2 1.5-.9 1.5-2 1.5-2-.7-2-1.5",
    link: "M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7",
    report: "M4 4h16v16H4zM8 9h8M8 13h5M8 17h3",
  }[name];
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="svc-icon" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

/* ------------------------------------------------------------------ page */

export default function SeoPage() {
  return (
    <div className="seo-lp">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="hero-col hero-copy">
            <h1 className="hero-title">
              SEO Services That{" "}
              <span className="curved-word">
                <span className="word-slider">
                  <span>Drive Leads</span>
                  <span>Generate Sales</span>
                  <span>Increase Revenue</span>
                  <span>Grow Profit</span>
                </span>
                <svg viewBox="0 0 500 45" preserveAspectRatio="none" aria-hidden>
                  <path className="line1" d="M15 18 C90 12,160 16,230 18 C300 20,360 16,430 20 C455 22,470 23,485 25" />
                  <path className="line2" d="M55 30 C140 28,220 30,290 31 C350 32,395 32,445 35" />
                </svg>
              </span>
            </h1>
            <p className="hero-text">
              Search is one of the most powerful ways to attract customers online. If your website is not ranking, potential
              customers choose competitors instead. At Jason Turtoga Digital, the focus is simple.
            </p>
            <ul className="icon-list hero-list">
              {["Build search visibility that produces leads, sales, and long term growth.", "No one-time systems that doesn't move the needle.", "Just proven SEO strategies that compound over time."].map((t) => (
                <li key={t}>
                  <BadgeCheck />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div id="proposal" className="hero-form">
              <ProposalForm label="seo" />
            </div>
            <p className="hero-call">
              Rather talk it through?{" "}
              <CallButton placement="hero" className="hero-call-link" label={`Call ${SITE.phoneDisplay}`} />
            </p>
          </div>
          <div className="hero-col hero-visual">
            <HeroLottie />
          </div>
        </section>

        {/* Stat strip (desktop) / carousel (tablet + mobile) */}
        <section className="stats-desktop">
          {STATS.map(([t, s]) => (
            <div key={t}>
              <p className="stat-title">{t}</p>
              <p className="stat-sub">{s}</p>
            </div>
          ))}
        </section>
        <section className="stats-mobile">
          <StatsCarousel slides={STATS} />
        </section>

        {/* Logo marquee */}
        <section className="logos">
          <p className="logos-title">
            Join over <span>100+</span> companies trusting Jason Turtoga Digital
          </p>
          <div className="logos-rows">
            <LogoMarquee logos={ROW1} />
            <LogoMarquee logos={ROW2} reverse />
          </div>
        </section>

        {/* SEO Services at JTD */}
        <section className="svc">
          <p className="eyebrow">SEARCH ENGINE OPTIMIZATION &amp; AI</p>
          <h2 className="h-xl">SEO Services at Jason Turtoga Digital ®</h2>
          <div className="svc-intro">
            <div className="svc-intro-text">
              <p>SEO services should do more than improve rankings. They should drive qualified traffic, leads, and revenue.</p>
              <p>Whether your website is new or already established, we build strategies designed for long-term organic growth and stronger online visibility.</p>
              <p>Our services combine technical optimization, content strategy, on-page SEO, and authority building to help your business outperform competitors in search results.</p>
              <p>Using proven methods tested across multiple industries, including ecommerce, we identify opportunities across your entire website to increase rankings, improve user experience, and convert more visitors into customers.</p>
            </div>
            <div className="flipbox" tabIndex={0}>
              <div className="flipbox-card">
                <div className="flipbox-front">
                  <Image src="/brand/clutch-2025.webp" alt="Clutch Top SEO Company 2025" width={999} height={1080} className="flipbox-img" />
                </div>
                <div className="flipbox-rear">
                  <i aria-hidden className="fa-solid fa-trophy flipbox-icon" />
                  <p className="flipbox-heading">Top SEO Agency 2025</p>
                  <p className="flipbox-content">Delivered 148% Organic Traffic growth in 2025.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="svc-grid">
            {SERVICES.map(([icon, title, body, result]) => (
              <article key={title} className="svc-card">
                <ServiceIcon name={icon} />
                <h3 className="svc-title">{title}</h3>
                <p className="svc-body">{body}</p>
                <hr className="divider" />
                <p className="svc-body">
                  <strong>The result:</strong> {result}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Discover real SEO growth */}
        <section className="growth">
          <div className="growth-card">
            <div className="growth-copy">
              <p className="growth-title">
                Discover What <span className="green">Real SEO Growth</span> Looks Like
              </p>
              <p className="green-sub">How Strategic SEO Turned Organic Visibility Into Measurable Business Growth</p>
              <p className="body-18">
                When this business partnered with us, the goal was simple — increase organic traffic, improve search visibility, and
                reduce reliance on paid advertising. Through technical improvements, content optimization, authority link building, and
                search intent targeting, we built a scalable organic growth strategy that delivered measurable results.
              </p>
              <p className="body-18">
                In less than 12 months, the website achieved stronger rankings, increased traffic, and a more dominant presence in a
                highly competitive market.
              </p>
              <div className="btn-row">
                <a className="btn" href="#proposal">Get My FREE Proposal</a>
                <a className="btn btn--gray" href={wp("/#real-results")}>
                  <i aria-hidden className="fa-solid fa-circle-arrow-left" /> See Real Results
                </a>
              </div>
            </div>
            <div className="growth-visual">
              <Image src="/brand/gsc-result.webp" alt="GSC Result" width={626} height={415} className="rounded-10" />
              <div className="growth-stats">
                {[["+148%", "Organic Traffic Increase"], ["+312%", "Keywords in Top 10 Search"], ["+18%", "Domain Authority Growth"]].map(([v, l]) => (
                  <div key={l}>
                    <p className="growth-num">{v}</p>
                    <p className="growth-label">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* AI search */}
        <section className="ai">
          <Image src="/brand/ai-search.webp" alt="" width={1024} height={576} className="ai-img" />
          <div>
            <h2 className="h-xl">
              <span className="green">AI Search Services</span> Focused on Growth
            </h2>
            <p className="green-sub">The businesses dominating Google search results are becoming the same brands AI systems recommend most often.</p>
            <p className="body-18">Google’s AI-driven search experience now prioritizes ranking signals differently than traditional SEO. Modern search algorithms place stronger focus on:</p>
            <ul className="dot-list">
              {["Entity authority over keyword density", "Structured data over outdated optimization tactics", "Content quality and expertise over content quantity", "User engagement and trust signals over raw backlink volume"].map((t) => (
                <li key={t}>
                  <i aria-hidden className="fa-solid fa-circle-dot" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="body-18">Most businesses are still optimizing for old search algorithms while Google continues shifting toward AI-first search visibility and authority signals.</p>
          </div>
        </section>

        {/* 4 reasons */}
        <section className="reasons">
          <div className="reasons-left">
            <h2 className="h-xl">
              The <span className="green">4 Reasons</span> Your Website Isn’t Generating More Organic Traffic
            </h2>
            <p className="green-sub">Right now, your competitors are capturing the search visibility your business should own.</p>
            <p className="body-18">Every day your website struggles to rank, potential customers choose another company instead. Businesses dominating Google and AI-driven search results are not always better, they simply have stronger strategies driving their visibility.</p>
            <p className="body-18">If your business depends heavily on ads or inconsistent traffic, you are limiting your long-term growth potential.</p>
            <hr className="divider" />
            <p className="body-18">That is where we come in. We identify the technical, content, and authority gaps holding your website back, then turn search visibility into qualified traffic, leads, and revenue growth.</p>
          </div>
          <div className="reasons-right">
            {REASONS.map(([t, d]) => (
              <div key={t} className="reason">
                <p className="reason-title">
                  <BadgeCheck size={34} />
                  {t}
                </p>
                <p className="reason-text">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mid CTA */}
        <section className="cta-band">
          <div className="cta-card">
            <div>
              <p className="cta-title">
                Do you want us to handle your <span className="green">SEO strategy?</span>
              </p>
              <p className="cta-text">
                At <strong className="green"><i>Jason Turtoga Digital</i></strong>, we&apos;re focused on driving growth for the right
                businesses. The question is, are you one of them?
              </p>
            </div>
            <a className="btn" href="#proposal">Get My FREE Proposal</a>
          </div>
        </section>

        {/* Why choose us */}
        <section className="why">
          <p className="eyebrow">WHY CHOOSE US AS YOUR SEO AGENCY PARTNER</p>
          <h2 className="h-xl h-black">Jason Turtoga Digital® SEO Services</h2>
          <div className="why-intro">
            <p>SEO only works when every part of your website is optimized to support rankings, traffic, and conversions. We build strategies designed to improve visibility, attract qualified visitors, and drive measurable business growth.</p>
            <p>Our approach goes beyond surface-level optimization. We analyze your website, identify ranking opportunities, uncover technical issues, and create a strategy based on what will move the needle fastest.</p>
            <p>Your strategy includes keyword research, technical analysis, competitor research, content optimization, and authority building focused on increasing rankings, traffic, and long-term search visibility.</p>
          </div>
          <div className="why-grid">
            {WHY.map(([icon, title, paras]) => (
              <div key={title} className="why-card">
                <i aria-hidden className={`fa-solid ${icon} why-icon`} />
                <p className="why-title">{title}</p>
                {paras.map((p) => (
                  <p key={p.slice(0, 20)} className="why-text">{p}</p>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Case studies */}
        <section className="cases">
          <h2 className="h-xl h-black center">
            Proven Results For <span className="green">Growth-Focused Businesses</span>
          </h2>
          <p className="cases-sub">No matter your industry or company size, our services give you the momentum to grow. See how other brands have succeeded with our campaigns.</p>
          <div className="cases-grid">
            {CASES.map((cs) => (
              <article key={cs.title} className="case-card">
                <a className="case-thumb" href={cs.href} tabIndex={-1}>
                  <Image src={cs.img} alt={cs.title} width={cs.w} height={cs.h} sizes="(min-width: 768px) 600px, 100vw" />
                </a>
                <div className="case-text">
                  <h3 className="case-title"><a href={cs.href}>{cs.title}</a></h3>
                  <a className="case-more" href={cs.href} aria-label={`Read more about ${cs.title}`}>Read More »</a>
                </div>
              </article>
            ))}
          </div>
          <div className="btn-row center">
            <a className="btn" href="#proposal">Get My Free SEO Proposal</a>
            <a className="btn btn--gray" href={wp("/about/case-studies/")}>
              <i aria-hidden className="fa-solid fa-circle-arrow-left" /> See All Case Studies
            </a>
          </div>
        </section>

        {/* Explore more services */}
        <section className="more">
          <h3 className="more-eyebrow">Services</h3>
          <h2 className="more-title">
            Explore more of our <span className="green">SEO services</span>
          </h2>
          <p className="more-sub">Learn about all the ways we help businesses grow online with specialized search strategies, audits, and targeted campaigns.</p>
          <div className="jtd-industry-services">
            <div className="jtd-industry-services__grid">
              {MORE.map((m) => (
                <article key={m.title} className="jtd-industry-card">
                  <div className={`jtd-industry-card__icon${m.local ? " jtd-industry-card__icon--local" : ""}`} aria-hidden>
                    <svg viewBox="0 0 64 64">{m.svg}</svg>
                  </div>
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                  <a href="#proposal" className="jtd-industry-button">
                    <span>{m.cta}</span>
                    <span className="jtd-industry-button__arrow">
                      <i className="fa-solid fa-arrow-left" />
                    </span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="faq">
          <div className="faq-left">
            <h2 className="faq-title">
              SEO Services <span className="green">Frequently Asked Questions</span>
            </h2>
          </div>
          <div className="faq-right">
            <p className="faq-intro">Want to learn more about SEO services? Check out our FAQs:</p>
            <div className="toggle">
              {FAQ.map(([q, a]) => (
                <details key={q} className="toggle-item">
                  <summary className="toggle-title">
                    <span className="toggle-icon" aria-hidden>
                      <i className="fa-solid fa-chevron-down icon-closed" />
                      <i className="fa-solid fa-chevron-up icon-opened" />
                    </span>
                    {q}
                  </summary>
                  <div className="toggle-content">
                    <p>{a}</p>
                  </div>
                </details>
              ))}
            </div>
            <p className="faq-outro">
              If you have a question not covered here, please{" "}
              <a href="#proposal"><strong>contact us</strong></a>. We’re always happy to discuss your goals and explore how we can help
              your business grow online.
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="final">
          <div>
            <p className="cta-title">
              Do you want more <span className="green">sales or leads?</span>
            </p>
            <p className="cta-text final-text">
              At <strong className="green"><i>Jason Turtoga Digital</i></strong>, we&apos;re focused on driving growth for the right
              businesses. The question is, are you one of them?
            </p>
          </div>
          <a className="btn" href="#proposal">Get My FREE Proposal</a>
        </section>
      </main>

      <SiteFooter />

      {/* Mobile tap-to-call bar */}
      <div className="call-bar">
        <CallButton placement="mobile_bar" label="Call Now" className="call-bar-call" />
        <a href="#proposal" className="call-bar-cta">Free Proposal</a>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
          }),
        }}
      />
    </div>
  );
}
