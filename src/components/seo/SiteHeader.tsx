"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CallButton from "@/components/CallButton";
import { wp } from "@/lib/site";

// Port of the jasonturtoga.com header (.jtd-navigation): mega menus open on hover ≥1101px,
// on tap ≤1100px; hamburger ≤767px; Escape / outside click closes. Links go to the main site.

type Card = { icon: string; title: string; text: string; action: string; href?: string; labels?: ("Soon" | "Latest" | "New")[] };
type Menu = { name: string; href?: string; icon: string; title: string; text: string; viewAll: string; viewAllHref?: string; grid?: string; cards: Card[] };

const MENUS: Menu[] = [
  {
    name: "Services", icon: "fa-chart-line", title: "Digital Marketing Services",
    text: "Explore strategies built to increase visibility, leads, sales, and measurable organic growth.",
    viewAll: "View All Services",
    cards: [
      { icon: "fa-wand-magic-sparkles", title: "GEO, LLM & AI SEO", labels: ["Soon", "Latest"], text: "Build visibility across AI-generated answers, large language models, and modern search results.", action: "Explore Service" },
      { icon: "fa-magnifying-glass-chart", title: "Search Engine Optimization", href: wp("/services/seo/"), text: "Increase organic rankings, search visibility, qualified traffic, leads, and revenue.", action: "Explore Service" },
      { icon: "fa-location-dot", title: "Local SEO", labels: ["Soon"], text: "Reach nearby customers through local search, map listings, and location-focused pages.", action: "Explore Service" },
      { icon: "fa-link", title: "Link Building Services", href: wp("/services/link-building/"), text: "Earn relevant editorial backlinks that improve authority, rankings, and organic performance.", action: "Explore Service" },
      { icon: "fa-filter-circle-dollar", title: "Conversion Rate Optimization", labels: ["Soon"], text: "Turn more website traffic into leads, consultations, signups, and sales.", action: "Explore Service" },
      { icon: "fa-bullseye", title: "Pay Per Click Services", labels: ["Soon"], text: "Reach ready-to-buy customers through focused paid search and remarketing campaigns.", action: "Explore Service" },
      { icon: "fa-gears", title: "Business Automation", labels: ["Soon"], text: "Reduce repetitive work through connected marketing, lead, and reporting workflows.", action: "Explore Service" },
      { icon: "fa-laptop-code", title: "Web Design", labels: ["Soon"], text: "Create search-friendly websites designed around usability, trust, leads, and sales.", action: "Explore Service" },
    ],
  },
  {
    name: "Industries", icon: "fa-building", title: "Industries We Support", grid: "jtd-industries-grid",
    text: "Explore digital strategies shaped around your market, customer journey, and competition.",
    viewAll: "View All Industries",
    cards: [
      { icon: "fa-cart-shopping", title: "E-Commerce", text: "Increase product visibility, category rankings, qualified traffic, and online sales.", action: "View Industry" },
      { icon: "fa-cloud", title: "SaaS", text: "Build product awareness, generate demos, and attract high-intent software buyers.", action: "View Industry" },
      { icon: "fa-building-columns", title: "Finance", text: "Improve visibility for financial products, services, research, and customer resources.", action: "View Industry" },
      { icon: "fa-microchip", title: "Technology", text: "Reach technical buyers through search-focused content, product pages, and digital PR.", action: "View Industry" },
      { icon: "fa-shield-halved", title: "Cybersecurity", text: "Build authority and demand within competitive security software and service markets.", action: "View Industry" },
      { icon: "fa-city", title: "Real Estate", text: "Residential, commercial, and industrial strategies for buyers, investors, and tenants.", action: "View Industry" },
      { icon: "fa-heart-pulse", title: "Health", text: "Reach patients and decision-makers through trusted, clear, and search-focused content.", action: "View Industry" },
      { icon: "fa-graduation-cap", title: "Education", text: "Increase enrollment interest, course discovery, and visibility for educational resources.", action: "View Industry" },
    ],
  },
  {
    name: "Agency", href: wp("/about-us/"), icon: "fa-people-group", title: "About Jason Turtoga Digital",
    text: "Learn about our work, experience, results, resources, pricing, and career opportunities.",
    viewAll: "Explore Our Agency", viewAllHref: wp("/about-us/"),
    cards: [
      { icon: "fa-circle-info", title: "About Us", href: wp("/about-us/"), text: "Learn about our approach, expertise, values, team, and growth philosophy.", action: "Learn More" },
      { icon: "fa-chart-column", title: "Case Studies", href: wp("/case-studies/"), text: "Review SEO campaigns, growth results, challenges, strategies, and outcomes.", action: "View Results" },
      { icon: "fa-star", title: "Client Reviews", href: wp("/about-us/reviews/"), text: "Read feedback from businesses that worked with us on SEO and digital growth.", action: "Read Reviews" },
      { icon: "fa-screwdriver-wrench", title: "Tools", href: wp("/tools/"), labels: ["New"], text: "Use practical SEO calculators, planning tools, and campaign resources.", action: "Explore Tools" },
      { icon: "fa-newspaper", title: "Our Latest Blogs & Insights", href: wp("/blog/"), labels: ["Latest"], text: "Read practical SEO, link building, marketing, and search visibility insights.", action: "Read Insights" },
      { icon: "fa-tags", title: "How Much Does SEO Cost?", href: wp("/seo-pricing/"), text: "Explore SEO packages, pricing factors, deliverables, and service options.", action: "View SEO Pricing" },
      { icon: "fa-link", title: "How Much Does Link Building Cost", href: wp("/link-building-pricing/"), text: "Explore link building packages that deliver measurable SEO results.", action: "View Link Building Pricing" },
      { icon: "fa-briefcase", title: "Careers", text: "Explore career opportunities and become part of our digital marketing team.", action: "View Careers" },
    ],
  },
  {
    name: "Partners", icon: "fa-handshake", title: "White-Label Partner Services", grid: "jtd-partners-grid",
    text: "Expand your agency services with flexible, confidential, and partner-focused support.",
    viewAll: "Become a Partner",
    cards: [
      { icon: "fa-layer-group", title: "White-Label Digital Marketing", text: "Expand your agency services with fulfillment delivered under your own brand.", action: "Explore Partnership" },
      { icon: "fa-magnifying-glass", title: "White-Label SEO", text: "Deliver managed SEO campaigns without hiring a complete in-house team.", action: "Explore Partnership" },
      { icon: "fa-link", title: "White-Label Link Building", text: "Provide editorial link acquisition and outreach services under your agency brand.", action: "Explore Partnership" },
      { icon: "fa-display", title: "White-Label Web Design", text: "Offer professional website design and development without adding internal staff.", action: "Explore Partnership" },
    ],
  },
];

const LABEL_CLASS = { Soon: "jtd-label-new", Latest: "jtd-label-latest", New: "jtd-label-new" } as const;

function CardBody({ c }: { c: Card }) {
  return (
    <div className="jtd-card-inner">
      <div className="jtd-card-icon">
        <i className={`fa-solid ${c.icon}`} />
      </div>
      <div className="jtd-card-title-row">
        <span className="jtd-card-title">{c.title}</span>
        {c.labels?.map((l) => (
          <span key={l} className={`jtd-label ${LABEL_CLASS[l]}`}>
            {l}
          </span>
        ))}
      </div>
      <p className="jtd-card-description">{c.text}</p>
      <span className="jtd-card-action">
        {c.action} <i className="fa-solid fa-arrow-right" />
      </span>
    </div>
  );
}

export default function SiteHeader() {
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const touch = window.matchMedia("(max-width: 1100px)");
    const onDoc = (e: MouseEvent) => {
      if (touch.matches && navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const reset = () => {
      setOpenMenu(null);
      setMobileOpen(false);
    };
    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onKey);
    touch.addEventListener("change", reset);
    return () => {
      document.removeEventListener("click", onDoc);
      document.removeEventListener("keydown", onKey);
      touch.removeEventListener("change", reset);
    };
  }, []);

  const onMainClick = (e: React.MouseEvent, name: string) => {
    if (!window.matchMedia("(max-width: 1100px)").matches) return; // desktop: hover + normal links
    e.preventDefault();
    setOpenMenu((cur) => (cur === name ? null : name));
  };

  return (
    <header className="site-header">
      <nav ref={navRef} className={`jtd-navigation${mobileOpen ? " jtd-mobile-open" : ""}`} aria-label="Main navigation">
        <div className="jtd-mobile-utility">
          <CallButton placement="header_mobile" className="jtd-mobile-phone" />
          <a className="jtd-mobile-top-proposal" href="#proposal">
            Get a Proposal
          </a>
        </div>

        <div className="jtd-nav-bar">
          <div className="jtd-nav-inner">
            <a className="jtd-logo" href={wp("/")}>
              <Image src="/brand/logo-green.png" alt="Jason Turtoga Digital" width={1600} height={310} priority />
            </a>

            <button
              className="jtd-mobile-toggle"
              type="button"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              onClick={(e) => {
                e.stopPropagation();
                setMobileOpen((o) => !o);
                setOpenMenu(null);
              }}
            >
              <i className={`fa-solid ${mobileOpen ? "fa-xmark" : "fa-bars"}`} />
            </button>

            <div className="jtd-nav-content">
              <ul className="jtd-main-menu">
                {MENUS.map((m) => {
                  const Main = m.href ? "a" : "div";
                  return (
                    <li key={m.name} className={`jtd-main-item jtd-has-dropdown${openMenu === m.name ? " jtd-dropdown-open" : ""}`}>
                      <Main className="jtd-main-link" href={m.href} onClick={(e: React.MouseEvent) => onMainClick(e, m.name)} tabIndex={0}>
                        <span>{m.name}</span>
                        <i className="fa-solid fa-chevron-down jtd-menu-arrow" />
                      </Main>
                      <div className="jtd-mega-dropdown">
                        <div className="jtd-mega-panel">
                          <div className="jtd-mega-header">
                            <div className="jtd-mega-header-content">
                              <div className="jtd-mega-header-icon">
                                <i className={`fa-solid ${m.icon}`} />
                              </div>
                              <div>
                                <span className="jtd-mega-header-title">{m.title}</span>
                                <p className="jtd-mega-header-text">{m.text}</p>
                              </div>
                            </div>
                            {m.viewAllHref ? (
                              <a className="jtd-view-all" href={m.viewAllHref}>
                                {m.viewAll} <i className="fa-solid fa-arrow-right" />
                              </a>
                            ) : (
                              <div className="jtd-view-all">
                                {m.viewAll} <i className="fa-solid fa-arrow-right" />
                              </div>
                            )}
                          </div>
                          <div className={`jtd-mega-grid ${m.grid ?? ""}`}>
                            {m.cards.map((c) =>
                              c.href ? (
                                <a key={c.title} className="jtd-mega-card" href={c.href}>
                                  <CardBody c={c} />
                                </a>
                              ) : (
                                <div key={c.title} className="jtd-mega-card">
                                  <CardBody c={c} />
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <a className="jtd-mobile-panel-proposal" href="#proposal" onClick={() => setMobileOpen(false)}>
                Get a Proposal
              </a>
            </div>

            <a className="jtd-proposal-button" href="#proposal">
              Get a Proposal
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
