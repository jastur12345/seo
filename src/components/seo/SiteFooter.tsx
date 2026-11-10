import Image from "next/image";
import CallButton from "@/components/CallButton";
import ProposalForm from "@/components/ProposalForm";
import { SITE, wp } from "@/lib/site";

// Port of the jasonturtoga.com footer (Elementor template 711).

const STATS = [
  ["105,192", "Hours of Expertise"],
  ["148,372", "Leads driven for clients"],
  ["$28,417,263", "revenue driven for clients"],
  ["3,700,000", "Organic Visits Generated"],
];

type L = [string, string?];
const COLS: [string, L[]][] = [
  ["Services", [["GEO, LLM & AI SEO"], ["Search Engine Optimization", wp("/services/seo/")], ["Local SEO"], ["Link Building Services", wp("/services/link-building/")], ["Conversion Rate Optimization"], ["Pay Per Click Services"], ["Business Automation"], ["Website Design"]]],
  ["industries", [["E-Commerce"], ["SaaS"], ["Finance"], ["Technology"], ["Real Estate"], ["Health"], ["Education"]]],
  ["Partners", [["White-Label Digital Marketing"], ["White-Label SEO Services"], ["White-Label Link Building Services"], ["White-Label Web Design"]]],
  ["Agency", [["About Us", wp("/about-us/")], ["SEO Pricing", wp("/seo-pricing/")], ["Link Building Pricing"], ["Case Studies", wp("/about-us/case-studies/")], ["Client Reviews", wp("/about-us/reviews/")], ["Blog", wp("/blog/")], ["Tools", wp("/tools/")], ["Careers"]]],
];

export default function SiteFooter() {
  return (
    <footer className="ft">
      <section className="ft-top">
        <div className="ft-stats">
          {STATS.map(([v, l]) => (
            <div key={l}>
              <p className="ft-stat-num">{v}</p>
              <p className="ft-stat-label">{l}</p>
            </div>
          ))}
        </div>
        <div className="ft-cta">
          <p className="ft-cta-title">Discover how we can help your business grow</p>
          <ProposalForm label="seo-footer" variant="dark" />
        </div>
      </section>

      <section className="ft-main">
        <div className="ft-cols">
          <div className="ft-brand">
            <a href={SITE.url}>
              <Image src="/brand/logo-white.png" alt={SITE.name} width={1536} height={298} className="ft-logo" />
            </a>
            <p className="ft-celebrate">Celebrating 12+ Years of Marketing Excellence</p>
            <p className="ft-speak">Ready to speak with an expert? Give us a call.</p>
            <CallButton placement="footer" className="ft-phone">
              {SITE.phoneDisplay}
            </CallButton>
          </div>
          {COLS.map(([head, links]) => (
            <div key={head} className="ft-col">
              <p className="ft-col-head">{head}</p>
              <ul>
                {links.map(([t, href]) => (
                  <li key={t}>{href ? <a href={href}>{t}</a> : <span>{t}</span>}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="ft-bottom">
          <p>
            2026 All Rights Reserved © {SITE.name} | <a href={wp("/sitemap_index.xml")}>Sitemap</a> | <span>Terms Of Service</span> |{" "}
            <a href={wp("/privacy-policy/")}>Privacy Policy</a>
          </p>
          <div className="ft-social">
            <a href="https://www.linkedin.com/company/jt-digital1/" target="_blank" rel="noopener" aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin-in" />
            </a>
            <a href="https://x.com/JasonTDigital" target="_blank" rel="noopener" aria-label="X">
              <i className="fa-brands fa-x-twitter" />
            </a>
            <a href="https://www.facebook.com/JasonTDigital/" target="_blank" rel="noopener" aria-label="Facebook">
              <i className="fa-brands fa-facebook-f" />
            </a>
          </div>
        </div>
      </section>
    </footer>
  );
}
